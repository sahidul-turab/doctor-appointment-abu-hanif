import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import AvailabilityManager from "@/components/AvailabilityManager";

export default async function AvailabilityPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "DOCTOR") {
        redirect("/api/auth/signin");
    }

    const profile = await prisma.doctorProfile.findFirst({
        where: { userId: session.user.id },
        include: { availabilityRules: true, exceptions: true },
    });

    if (!profile) {
        return <div>Profile not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-900">Availability Management</h1>
                <p className="text-slate-500 mt-2">Set your weekly schedule and manage holiday exceptions.</p>
            </div>

            <AvailabilityManager profileId={profile.id} initialRules={profile.availabilityRules} initialExceptions={profile.exceptions} />
        </div>
    );
}
