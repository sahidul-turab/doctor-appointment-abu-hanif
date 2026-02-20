import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { LucideVideo, LucideCalendar, LucideClock, LucidePhone, LucideMail, LucideHistory, LucideArrowRight, LucideShieldCheck } from "lucide-react";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    if (session.user.role === "DOCTOR") {
        redirect("/doctor");
    }

    const appointments = await prisma.appointment.findMany({
        where: { patientId: session.user.id },
        include: { service: true },
        orderBy: { date: "desc" },
    });

    const confirmed = appointments.filter((a: any) => a.status === "CONFIRMED");

    return (
        <div className="min-h-screen pt-12">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white shadow-xl shadow-primary-500/20">
                                <LucideCalendar className="w-6 h-6" />
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white mt-1">Health Dashboard</h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back, <span className="text-slate-900 dark:text-white font-bold">{session?.user?.name || "Guest"}</span>. Stay updated with your consultations.</p>
                    </div>
                    <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="px-6 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl font-bold text-sm">Patient Portal</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center">
                                Active Appointments
                                <span className="ml-4 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-black uppercase tracking-widest leading-none">
                                    {confirmed.length}
                                </span>
                            </h2>
                        </div>

                        {appointments.length === 0 ? (
                            <div className="p-20 text-center glass rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <LucideCalendar className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No bookings yet</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">You haven't scheduled any medical consultations with Dr. Abu Hanif yet.</p>
                                <a href="/book" className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-xl font-black hover:bg-primary-700 transition-all shadow-lg hover:scale-105">
                                    Book Your First Visit <LucideArrowRight className="ml-2 w-4 h-4" />
                                </a>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {appointments.map((app: any) => (
                                    <div key={app.id} className="group glass p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-primary-500/50 transition-all card-shadow">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                            <div className="flex items-start space-x-6">
                                                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-colors">
                                                    <LucideHistory className="w-8 h-8 text-primary-500" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                                            {app.service.name}
                                                        </span>
                                                        <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${app.status === "CONFIRMED" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                                            app.status === "PENDING_PAYMENT" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                                                                "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                                                            }`}>
                                                            {app.status}
                                                        </div>
                                                    </div>
                                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-2">{format(app.date, "MMMM do, yyyy")}</h3>
                                                    <div className="flex items-center space-x-4 text-slate-500 dark:text-slate-400 text-sm font-bold">
                                                        <div className="flex items-center"><LucideClock className="w-4 h-4 mr-2 text-primary-500" /> {app.startTime} - {app.endTime}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {app.status === "CONFIRMED" && (
                                            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                                                <div className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-400">
                                                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-3">
                                                        <LucideVideo className="w-4 h-4 text-primary-600" />
                                                    </div>
                                                    {app.meetingLink ? "Your consultation link is active" : "Waiting for doctor to provide link"}
                                                </div>
                                                {app.meetingLink ? (
                                                    <a href={app.meetingLink} target="_blank" className="px-8 py-3 bg-[#1a73e8] text-white rounded-xl font-black hover:bg-[#1557b0] transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center">
                                                        <LucideVideo className="w-4 h-4 mr-2" />
                                                        Join Google Meet
                                                    </a>
                                                ) : (
                                                    <button disabled className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-xl font-black cursor-not-allowed uppercase tracking-widest text-xs">
                                                        Not Available
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-8">
                        <div className="p-10 bg-slate-900 dark:bg-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                <LucideShieldCheck className="w-24 h-24 text-white dark:text-slate-900" />
                            </div>
                            <h3 className="text-2xl font-black text-white dark:text-slate-900 mb-6 relative z-10">Care Center</h3>
                            <p className="text-slate-400 dark:text-slate-500 mb-10 leading-relaxed font-medium relative z-10">
                                Our support team is available 24/7 for technical assistance with your online consultations.
                            </p>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center space-x-5">
                                    <div className="w-12 h-12 bg-slate-800 dark:bg-slate-100 rounded-2xl flex items-center justify-center shadow-inner">
                                        <LucidePhone className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Hotline</div>
                                        <div className="text-white dark:text-slate-900 font-bold">+880 1234 567890</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-5">
                                    <div className="w-12 h-12 bg-slate-800 dark:bg-slate-100 rounded-2xl flex items-center justify-center shadow-inner">
                                        <LucideMail className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Email</div>
                                        <div className="text-white dark:text-slate-900 font-bold">care@clinic.com</div>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-12 py-4 bg-primary-600 text-white rounded-2xl font-black hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20">
                                Open Support Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
