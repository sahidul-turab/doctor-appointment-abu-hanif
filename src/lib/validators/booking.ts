import { z } from "zod";

export const BookingSchema = z.object({
    serviceId: z.string().min(1, "Service is required"),
    date: z.string().transform((str) => new Date(str)),
    startTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, "Invalid start time"),
    endTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, "Invalid end time"),
    problem: z.string().optional(),
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(11, "Phone number is too short"),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

export type BookingInput = z.infer<typeof BookingSchema>;
