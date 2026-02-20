import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { calculateSlots } from "@/lib/slot-calculator";
import { parseISO, startOfDay } from "date-fns";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const serviceId = searchParams.get("serviceId");
    const dateStr = searchParams.get("date");

    if (!serviceId || !dateStr) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const date = startOfDay(parseISO(dateStr));

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

    const doctorProfile = await prisma.doctorProfile.findFirst({
        include: {
            availabilityRules: true,
            exceptions: true,
        },
    });

    if (!doctorProfile) return NextResponse.json({ error: "Doctor profile not found" }, { status: 404 });

    const existingAppointments = await prisma.appointment.findMany({
        where: {
            date: date,
            status: { in: ["CONFIRMED", "PENDING_PAYMENT"] },
        },
        select: { startTime: true, endTime: true },
    });

    const slots = calculateSlots(
        date,
        doctorProfile.availabilityRules,
        doctorProfile.exceptions,
        existingAppointments,
        service.duration
    );

    return NextResponse.json(slots);
}
