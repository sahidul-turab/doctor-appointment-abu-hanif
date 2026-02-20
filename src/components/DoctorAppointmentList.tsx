"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
    LucideVideo,
    LucideCheck,
    LucideExternalLink,
    LucideMoreVertical,
    LucideUser,
    LucideClock,
    LucideMessageSquare,
    LucideWallet,
    LucideShieldCheck,
    LucideXCircle,
    LucideInfo,
    LucideVideoOff,
    LucideLink
} from "lucide-react";
import { updateMeetingLink, completeAppointment, verifyManualPayment } from "@/lib/actions/doctor";
import { clsx } from "clsx";

export default function DoctorAppointmentList({ appointments }: { appointments: any[] }) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [meetingUrl, setMeetingUrl] = useState("");
    const [verifyingId, setVerifyingId] = useState<string | null>(null);
    const [rejectionNotes, setRejectionNotes] = useState("");

    const handleUpdateLink = async (id: string) => {
        await updateMeetingLink(id, meetingUrl);
        setEditingId(null);
        setMeetingUrl("");
    };

    const handleVerification = async (id: string, action: "APPROVE" | "REJECT") => {
        await verifyManualPayment(id, action, action === "REJECT" ? rejectionNotes : "");
        setVerifyingId(null);
        setRejectionNotes("");
    };

    return (
        <div className="glass rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                        <tr>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient / Condition</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Schedule</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Payment Status</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center">
                                        <LucideUser className="w-12 h-12 text-slate-200 dark:text-slate-800 mb-4" />
                                        <p className="text-slate-400 dark:text-slate-600 font-bold italic">No appointments for the selected criteria.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            appointments.map((app) => (
                                <tr key={app.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-black text-xs shadow-inner">
                                                {app.patient.name?.charAt(0) || "P"}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 dark:text-white leading-none mb-1 text-base">{app.patient.name}</div>
                                                <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                                    <LucideMessageSquare className="w-3 h-3 mr-1 text-slate-400" />
                                                    {app.problem || "Routine Consultation"}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col items-center">
                                            <div className="text-sm font-black text-slate-900 dark:text-white flex items-center">
                                                <LucideClock className="w-3.5 h-3.5 mr-2 text-primary-500" />
                                                {app.startTime}
                                            </div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{format(app.date, "MMM do")}</div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col items-center">
                                            <div className={clsx(
                                                "inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2",
                                                app.status === "CONFIRMED" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                                    app.status === "PENDING_VERIFICATION" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse" :
                                                        app.status === "PENDING_PAYMENT" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                                                            "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                                            )}>
                                                {app.status}
                                            </div>
                                            {app.payment?.transactionId && (
                                                <div className="text-[9px] font-bold text-slate-400 font-mono">
                                                    {app.payment.method}: {app.payment.transactionId}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-end items-center space-x-4">
                                            {app.status === "PENDING_VERIFICATION" ? (
                                                verifyingId === app.id ? (
                                                    <div className="flex items-center space-x-2 animate-in slide-in-from-right-2">
                                                        <input
                                                            autoFocus
                                                            type="text"
                                                            placeholder="Rejection reason..."
                                                            className="px-4 py-2 text-xs font-bold bg-white dark:bg-slate-800 border-2 border-rose-200 dark:border-rose-900/50 rounded-xl outline-none w-40"
                                                            value={rejectionNotes}
                                                            onChange={(e) => setRejectionNotes(e.target.value)}
                                                        />
                                                        <button onClick={() => handleVerification(app.id, "REJECT")} className="p-2 bg-rose-600 text-white rounded-xl shadow-lg">
                                                            <LucideCheck className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => setVerifyingId(null)} className="p-2 text-slate-400">
                                                            <LucideXCircle className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-3">
                                                        <button
                                                            onClick={() => {
                                                                if (confirm(`Approve payment for ${app.patient.name}?`)) {
                                                                    handleVerification(app.id, "APPROVE");
                                                                }
                                                            }}
                                                            className="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-black shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all flex items-center"
                                                        >
                                                            <LucideShieldCheck className="w-3.5 h-3.5 mr-2" /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => setVerifyingId(app.id)}
                                                            className="px-4 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-black hover:bg-rose-100 transition-all"
                                                        >
                                                            Reject
                                                        </button>
                                                        <div className="group relative">
                                                            <LucideInfo className="w-4 h-4 text-slate-300 cursor-help" />
                                                            <div className="absolute bottom-full right-0 mb-2 w-48 p-4 bg-slate-900 text-white text-[10px] rounded-2xl hidden group-hover:block z-50 shadow-2xl">
                                                                <div className="font-black mb-1">Payment Info:</div>
                                                                <div>Method: {app.payment?.method}</div>
                                                                <div>Sender: {app.payment?.senderNumber}</div>
                                                                <div>TrxID: {app.payment?.transactionId}</div>
                                                                {app.payment?.notes && <div className="mt-2 text-slate-400 italic">"{app.payment.notes}"</div>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            ) : app.status === "CONFIRMED" ? (
                                                editingId === app.id ? (
                                                    <div className="flex items-center space-x-2 animate-in slide-in-from-right-2">
                                                        <input
                                                            autoFocus
                                                            type="text"
                                                            placeholder="Meeting URL"
                                                            className="px-4 py-2 text-xs font-bold bg-white dark:bg-slate-800 border-2 border-primary-200 rounded-xl outline-none w-48"
                                                            value={meetingUrl}
                                                            onChange={(e) => setMeetingUrl(e.target.value)}
                                                        />
                                                        <button onClick={() => handleUpdateLink(app.id)} className="p-2 bg-primary-600 text-white rounded-xl shadow-lg">
                                                            <LucideCheck className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex flex-col items-end mr-2">
                                                            {!app.meetingLink && (
                                                                <span className="text-[9px] font-black text-rose-500 uppercase tracking-tighter animate-pulse mb-1">Link Missing</span>
                                                            )}
                                                            <button
                                                                onClick={() => {
                                                                    setEditingId(app.id);
                                                                    setMeetingUrl(app.meetingLink || "");
                                                                }}
                                                                className={clsx(
                                                                    "flex items-center text-xs font-black transition-all py-2 px-4 rounded-xl shadow-sm border",
                                                                    app.meetingLink
                                                                        ? "text-slate-600 bg-white border-slate-200 hover:border-primary-500"
                                                                        : "text-primary-600 bg-primary-50 border-primary-200 hover:bg-primary-100 animate-bounce-subtle"
                                                                )}
                                                            >
                                                                <LucideLink className="w-3.5 h-3.5 mr-2" />
                                                                {app.meetingLink ? "Update Meet Link" : "Set Google Meet"}
                                                            </button>
                                                        </div>

                                                        {!app.meetingLink && (
                                                            <a
                                                                href="https://meet.google.com/new"
                                                                target="_blank"
                                                                className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg group relative"
                                                                title="Create new Google Meet"
                                                            >
                                                                <LucideVideo className="w-4 h-4" />
                                                                <span className="absolute bottom-full right-0 mb-2 invisible group-hover:visible bg-slate-900 text-[10px] py-1 px-3 rounded-lg whitespace-nowrap">Open Google Meet</span>
                                                            </a>
                                                        )}

                                                        <button
                                                            onClick={() => {
                                                                if (confirm("Mark this appointment as completed?")) {
                                                                    completeAppointment(app.id);
                                                                }
                                                            }}
                                                            className="text-[10px] font-black text-slate-400 hover:text-green-600 uppercase tracking-widest pl-2"
                                                        >
                                                            Complete
                                                        </button>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{app.status}</div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
