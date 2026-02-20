import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function resetDoctorPassword() {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.user.update({
        where: { email: "doctor@example.com" },
        data: { password: hashedPassword }
    });
    return { success: true };
}
