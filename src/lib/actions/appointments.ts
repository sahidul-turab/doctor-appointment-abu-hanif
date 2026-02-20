"use server";

import prisma from "@/lib/prisma";
import { BookingInput, BookingSchema } from "@/lib/validators/booking";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function createAppointment(data: BookingInput & { appointmentId?: string }) {
    const validatedData = BookingSchema.parse(data);

    return await prisma.$transaction(async (tx: any) => {
        if (data.appointmentId) {
            // Check if appointment exists
            const existingApp = await tx.appointment.findUnique({
                where: { id: data.appointmentId }
            });

            if (existingApp) {
                // Update existing appointment instead of creating new
                const updated = await tx.appointment.update({
                    where: { id: data.appointmentId },
                    data: {
                        serviceId: validatedData.serviceId,
                        date: validatedData.date,
                        startTime: validatedData.startTime,
                        endTime: validatedData.endTime,
                        problem: validatedData.problem,
                    }
                });
                return { success: true, appointmentId: updated.id };
            }
        }
        const existing = await tx.appointment.findFirst({
            where: {
                date: validatedData.date,
                startTime: validatedData.startTime,
                status: {
                    in: ["CONFIRMED", "PENDING_PAYMENT", "PENDING_VERIFICATION"] as any[],
                },
            },
        });

        if (existing) {
            throw new Error("This slot is already booked or pending verification");
        }

        let user = await tx.user.findUnique({
            where: { email: validatedData.email.trim().toLowerCase() },
        });

        if (!user) {
            const tempPassword = validatedData.password || Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(tempPassword, 10);
            user = await tx.user.create({
                data: {
                    email: validatedData.email.trim().toLowerCase(),
                    name: validatedData.name,
                    phone: validatedData.phone,
                    password: hashedPassword,
                    role: "PATIENT",
                },
            });
        } else if (user.role === "PATIENT" && validatedData.password) {
            // Update password for existing patient to ensure they can login with what they just set
            const hashedPassword = await bcrypt.hash(validatedData.password, 10);
            user = await tx.user.update({
                where: { id: user.id },
                data: { password: hashedPassword }
            });
        }

        const appointment = await tx.appointment.create({
            data: {
                patientId: user.id,
                serviceId: validatedData.serviceId,
                date: validatedData.date,
                startTime: validatedData.startTime,
                endTime: validatedData.endTime,
                problem: validatedData.problem,
                status: "PENDING_PAYMENT" as any,
            },
        });

        const service = await tx.service.findUnique({
            where: { id: validatedData.serviceId },
        });

        if (!service) throw new Error("Service not found");

        await tx.payment.create({
            data: {
                appointmentId: appointment.id,
                amount: service.fee,
                method: "BKASH" as any,
                status: "INITIATED" as any,
            },
        });

        revalidatePath("/dashboard");
        revalidatePath("/doctor");

        return { success: true, appointmentId: appointment.id };
    });
}

export async function submitManualPaymentDetails(data: {
    appointmentId: string;
    method: any;
    senderNumber: string;
    transactionId: string;
    notes?: string;
}) {
    return await prisma.$transaction(async (tx: any) => {
        const appointment = await tx.appointment.findUnique({
            where: { id: data.appointmentId },
            include: { payment: true },
        });

        if (!appointment || !appointment.payment) {
            throw new Error("Appointment or payment record not found");
        }

        // Create payment attempt history
        await tx.paymentAttempt.create({
            data: {
                paymentId: appointment.payment.id,
                method: data.method,
                transactionId: data.transactionId,
                senderNumber: data.senderNumber,
                notes: data.notes,
                status: "PENDING_VERIFICATION" as any,
            },
        });

        // Update payment record
        await tx.payment.update({
            where: { id: appointment.payment.id },
            data: {
                method: data.method,
                senderNumber: data.senderNumber,
                transactionId: data.transactionId,
                notes: data.notes,
                status: "PENDING_VERIFICATION" as any,
            },
        });

        // Update appointment status
        await tx.appointment.update({
            where: { id: data.appointmentId },
            data: { status: "PENDING_VERIFICATION" as any },
        });

        // Audit Log
        await tx.auditLog.create({
            data: {
                appointmentId: data.appointmentId,
                action: "PAYMENT_SUBMITTED",
                details: { method: data.method, transactionId: data.transactionId },
            },
        });

        revalidatePath("/dashboard");
        revalidatePath("/doctor");

        return { success: true };
    });
}

export async function updateAppointmentStatus(id: string, status: any) {
    const appointment = await prisma.appointment.update({
        where: { id },
        data: { status },
    });

    // Audit Log
    await prisma.auditLog.create({
        data: {
            appointmentId: id,
            action: "STATUS_CHANGE",
            details: { from: "N/A", to: status },
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/doctor");
    return appointment;
}
