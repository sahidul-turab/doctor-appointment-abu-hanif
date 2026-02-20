"use server";

import prisma from "@/lib/prisma";
import { AppointmentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { TelemedicineProvider } from "@/lib/telemedicine";
import { NotificationProvider } from "@/lib/notifications";
import { format } from "date-fns";

export async function updateMeetingLink(id: string, link: string) {
    const appointment = await prisma.appointment.update({
        where: { id },
        data: { meetingLink: link },
        include: { patient: true }
    });

    // Audit Log
    await prisma.auditLog.create({
        data: {
            appointmentId: id,
            action: "MEETING_LINK_PROVIDED",
            details: { link },
        },
    });

    // Notify Patient
    if (appointment.patient.email) {
        await NotificationProvider.sendEmail(
            appointment.patient.email,
            "Consultation Link Ready - Dr. Abu Hanif",
            `<p>Your consultation link for today is ready: <a href="${link}">${link}</a></p>`
        );
    }

    revalidatePath("/doctor");
    revalidatePath("/dashboard");
    return { success: true };
}

export async function generateAndSendMeetingLink(id: string) {
    const link = TelemedicineProvider.generateJitsiRoom(id);
    return await updateMeetingLink(id, link);
}

export async function verifyManualPayment(id: string, action: "APPROVE" | "REJECT", notes?: string) {
    const appointment = await prisma.appointment.findUnique({
        where: { id },
        include: { payment: true, patient: true, service: true }
    });

    if (!appointment || !appointment.payment) {
        throw new Error("Appointment not found");
    }

    if (action === "APPROVE") {
        await prisma.$transaction(async (tx) => {
            await tx.payment.update({
                where: { id: appointment.payment!.id },
                data: {
                    status: "PAID",
                    verifiedAt: new Date(),
                    // notes: notes // optional: store verification notes
                },
            });

            await tx.appointment.update({
                where: { id },
                data: { status: "CONFIRMED" },
            });

            // Audit
            await tx.auditLog.create({
                data: {
                    appointmentId: id,
                    action: "PAYMENT_APPROVED",
                    details: { notes },
                },
            });
        });

        // Notify Patient
        if (appointment.patient.email) {
            await NotificationProvider.sendEmail(
                appointment.patient.email,
                "Appointment Confirmed - Dr. Abu Hanif",
                `<p>Hello ${appointment.patient.name}, your payment has been verified. Your appointment for ${format(appointment.date, "MMMM do")} at ${appointment.startTime} is now <strong>CONFIRMED</strong>.</p>`
            );
        }
    } else {
        await prisma.$transaction(async (tx) => {
            await tx.payment.update({
                where: { id: appointment.payment!.id },
                data: {
                    status: "REJECTED",
                    notes: notes ? `Rejected: ${notes}` : "Payment rejected",
                },
            });

            await tx.appointment.update({
                where: { id },
                data: { status: "PENDING_PAYMENT" },
            });

            // Audit
            await tx.auditLog.create({
                data: {
                    appointmentId: id,
                    action: "PAYMENT_REJECTED",
                    details: { notes },
                },
            });
        });

        // Notify Patient
        if (appointment.patient.email) {
            await NotificationProvider.sendEmail(
                appointment.patient.email,
                "Payment Rejected - Action Required",
                `<p>Hello ${appointment.patient.name}, your payment verification failed. Reason: ${notes || "Invalid transaction details"}. Please resubmit your payment info in the dashboard.</p>`
            );
        }
    }

    revalidatePath("/doctor");
    revalidatePath("/dashboard");
    return { success: true };
}

export async function completeAppointment(id: string) {
    await prisma.appointment.update({
        where: { id },
        data: { status: "COMPLETED" },
    });

    revalidatePath("/doctor");
    return { success: true };
}
