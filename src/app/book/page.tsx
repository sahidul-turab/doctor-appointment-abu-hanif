import BookingFlow from "@/components/BookingFlow";
import prisma from "@/lib/prisma";

export default async function BookPage() {
    let services: any[] = [];
    try {
        services = await prisma.service.findMany({
            where: { isActive: true },
            select: { id: true, name: true, fee: true, duration: true }
        });
    } catch (error) {
        console.error("Prisma error in BookPage:", error);
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                        Book Your <span className="gradient-text">Consultation</span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        Secure your slot in just a few clicks. Choose your service and a convenient time to meet with Dr. Abu Hanif.
                    </p>
                </div>

                <div className="glass rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl">
                    <BookingFlow services={services} />
                </div>
            </div>
        </div>
    );
}
