"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAvailabilityRules(doctorProfileId: string, rules: { dayOfWeek: number; startTime: string; endTime: string }[]) {
    // Delete existing rules and create new ones for simplicity in this version
    await prisma.$transaction([
        prisma.availabilityRule.deleteMany({
            where: { doctorProfileId },
        }),
        prisma.availabilityRule.createMany({
            data: rules.map(r => ({ ...r, doctorProfileId })),
        }),
    ]);

    revalidatePath("/doctor/availability");
    revalidatePath("/api/slots"); // Slots will change
    return { success: true };
}

export async function addException(doctorProfileId: string, data: { date: Date; isAvailable: boolean; startTime?: string; endTime?: string }) {
    await prisma.availabilityException.create({
        data: {
            ...data,
            doctorProfileId,
        },
    });

    revalidatePath("/doctor/availability");
    revalidatePath("/api/slots");
    return { success: true };
}

export async function deleteException(id: string) {
    await prisma.availabilityException.delete({
        where: { id },
    });

    revalidatePath("/doctor/availability");
    revalidatePath("/api/slots");
    return { success: true };
}
