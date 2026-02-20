"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function seedInitialData() {
    // Check if doctor exists
    const existingDoctor = await prisma.user.findFirst({
        where: { role: "DOCTOR" },
    });

    if (existingDoctor) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await prisma.user.update({
            where: { id: existingDoctor.id },
            data: { password: hashedPassword }
        });
        return { message: "Doctor password reset to admin123" };
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const doctor = await prisma.user.create({
        data: {
            name: "Dr. Abu Hanif",
            email: "doctor@example.com",
            password: hashedPassword,
            role: "DOCTOR",
            doctorProfile: {
                create: {
                    specialties: ["General Physician", "Cardiology"],
                    fees: 500,
                    location: "Dhaka, Bangladesh",
                    bio: "Experienced specialist in internal medicine.",
                    availabilityRules: {
                        createMany: {
                            data: [
                                { dayOfWeek: 0, startTime: "19:00", endTime: "22:00" }, // Sun
                                { dayOfWeek: 1, startTime: "19:00", endTime: "22:00" }, // Mon
                                { dayOfWeek: 2, startTime: "19:00", endTime: "22:00" }, // Tue
                                { dayOfWeek: 3, startTime: "19:00", endTime: "22:00" }, // Wed
                                { dayOfWeek: 4, startTime: "19:00", endTime: "22:00" }, // Thu
                            ],
                        },
                    },
                },
            },
        },
    });

    await prisma.service.createMany({
        data: [
            { name: "Online Consultation", fee: 500, duration: 30 },
            { name: "Chamber Visit", fee: 1000, duration: 30 },
            { name: "Follow-up", fee: 300, duration: 30 },
        ],
    });

    return { success: true, message: "Initial data seeded" };
}
