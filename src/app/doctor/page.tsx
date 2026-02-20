import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { format, startOfToday } from "date-fns";
import { LucideUsers, LucideCalendar, LucideCreditCard, LucideSettings, LucideActivity, LucideLayoutDashboard, LucideWallet } from "lucide-react";
import DoctorAppointmentList from "@/components/DoctorAppointmentList";

export default async function DoctorDashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "DOCTOR") {
        redirect("/login");
    }

    const today = startOfToday();
    const appointments = await prisma.appointment.findMany({
        include: { patient: true, service: true, payment: true },
        orderBy: { startTime: "asc" },
    });

    const todayAppointments = appointments.filter((a: any) =>
        a.status !== "COMPLETED" && a.status !== "CANCELLED"
    );

    const stats = [
        { label: "Patients Today", value: todayAppointments.length, icon: LucideUsers, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
        { label: "Check Verification", value: appointments.filter((a: any) => a.status === "PENDING_VERIFICATION").length, icon: LucideWallet, color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20" },
        { label: "Revenue Estim.", value: `৳${appointments.filter((a: any) => a.status === "CONFIRMED").reduce((acc: number, a: any) => acc + a.service.fee, 0)}`, icon: LucideCreditCard, color: "text-rose-600 bg-rose-50 dark:bg-rose-900/20" },
    ];

    return (
        <div className="min-h-screen pt-12">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-slate-900 shadow-xl">
                                <LucideLayoutDashboard className="w-6 h-6" />
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white mt-1">Hospital Console</h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Monitoring clinic activity for <span className="text-primary-600 font-bold">{format(today, "MMMM do, yyyy")}</span></p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <a href="/doctor/availability" className="flex items-center px-6 py-3 glass rounded-xl text-sm font-black text-slate-700 dark:text-slate-300 hover:border-primary-500 transition-all">
                            <LucideSettings className="w-4 h-4 mr-2" />
                            Manage Availability
                        </a>
                        <div className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-sm shadow-xl">
                            Dr. Abu Hanif
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {stats.map((s, i) => (
                        <div key={i} className="group glass p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-primary-500/50 transition-all card-shadow">
                            <div className="flex items-center space-x-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${s.color}`}>
                                    <s.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</div>
                                    <div className="text-3xl font-black text-slate-900 dark:text-white">{s.value}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Patient Queue */}
                <div className="lg:col-span-3">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center">
                            Active Patient Queue
                            <span className="ml-4 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-black uppercase tracking-widest leading-none">
                                {todayAppointments.length} Today
                            </span>
                        </h2>
                        <div className="flex items-center space-x-2 text-primary-600 font-bold text-sm">
                            <LucideActivity className="w-4 h-4 animate-pulse" />
                            <span>Live Feed</span>
                        </div>
                    </div>
                    <DoctorAppointmentList appointments={todayAppointments} />
                </div>
            </div>
        </div>
    );
}
