"use client";

import { useState } from "react";
import { LucideCalendar, LucidePlus, LucideTrash2, LucideCheckCircle, LucideX, LucideClock, LucideAlertCircle } from "lucide-react";
import { format } from "date-fns";
import { updateAvailabilityRules, addException, deleteException } from "@/lib/actions/availability";
import { clsx } from "clsx";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AvailabilityManager({ profileId, initialRules, initialExceptions }: any) {
    const [rules, setRules] = useState(initialRules || []);
    const [exceptions, setExceptions] = useState(initialExceptions || []);
    const [loading, setLoading] = useState(false);

    // UI State for adding exception
    const [showAddException, setShowAddException] = useState(false);
    const [newExDate, setNewExDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [newExType, setNewExType] = useState<"BLOCKED" | "AVAILABLE">("BLOCKED");

    const handleSaveRules = async () => {
        setLoading(true);
        try {
            await updateAvailabilityRules(profileId, rules.map((r: any) => ({
                dayOfWeek: r.dayOfWeek,
                startTime: r.startTime,
                endTime: r.endTime
            })));
            alert("Weekly schedule updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to save rules.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddRange = (dayIdx: number) => {
        const newRules = [...rules];
        newRules.push({
            dayOfWeek: dayIdx,
            startTime: "09:00",
            endTime: "11:00"
        });
        setRules(newRules);
    };

    const handleRemoveRange = (ruleId?: string, idxInState?: number) => {
        if (idxInState !== undefined) {
            const newRules = [...rules];
            newRules.splice(idxInState, 1);
            setRules(newRules);
        }
    };

    const handleUpdateRange = (idxInState: number, field: string, value: string) => {
        const newRules = [...rules];
        newRules[idxInState][field] = value;
        setRules(newRules);
    };

    const handleAddException = async () => {
        const startTime = (document.getElementById("ex-start") as HTMLInputElement)?.value;
        const endTime = (document.getElementById("ex-end") as HTMLInputElement)?.value;

        setLoading(true);
        try {
            const data = {
                date: new Date(newExDate),
                isAvailable: newExType === "AVAILABLE",
                startTime: newExType === "AVAILABLE" ? startTime : undefined,
                endTime: newExType === "AVAILABLE" ? endTime : undefined
            };
            await addException(profileId, data);
            window.location.reload();
        } catch (error) {
            alert("Failed to add exception.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid lg:grid-cols-5 gap-6 md:gap-8 items-start">
            {/* Weekly Rules - Left Side (3 cols) */}
            <div className="lg:col-span-3 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
                    <div className="p-6 md:p-10 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50/50 dark:bg-slate-800/30 gap-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">Weekly Schedule</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Set your standard clinical hours</p>
                        </div>
                        <button
                            onClick={handleSaveRules}
                            disabled={loading}
                            className="w-full sm:w-auto px-8 py-4 md:py-3 bg-primary-600 text-white rounded-2xl font-black text-sm hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all disabled:opacity-50 active:scale-95"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                    <div className="p-6 md:p-10 space-y-8">
                        {DAYS.map((day, idx) => {
                            const dayRules = rules
                                .map((r: any, ruleIdx: number) => ({ ...r, stateIdx: ruleIdx }))
                                .filter((r: any) => r.dayOfWeek === idx);

                            return (
                                <div key={day} className="group">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 pb-8 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                                        <div className="w-full md:w-32 pt-2">
                                            <span className="text-lg font-black text-slate-900 dark:text-white">{day}</span>
                                            {dayRules.length === 0 && (
                                                <span className="block text-[10px] font-black text-rose-500 uppercase tracking-tighter mt-1 italic">Off Day</span>
                                            )}
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            {dayRules.map((rule: any) => (
                                                <div key={`${idx}-${rule.stateIdx}`} className="flex flex-wrap sm:flex-nowrap items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                                    <div className="relative flex-1 min-w-[120px] group/input">
                                                        <LucideClock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-primary-500 transition-colors pointer-events-none" />
                                                        <input
                                                            type="time"
                                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-black text-slate-900 dark:text-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                                                            value={rule.startTime}
                                                            onChange={(e) => handleUpdateRange(rule.stateIdx, "startTime", e.target.value)}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-black text-slate-300 uppercase tracking-widest px-2">to</span>
                                                    <div className="relative flex-1 min-w-[120px] group/input">
                                                        <LucideClock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-primary-500 transition-colors pointer-events-none" />
                                                        <input
                                                            type="time"
                                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-black text-slate-900 dark:text-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                                                            value={rule.endTime}
                                                            onChange={(e) => handleUpdateRange(rule.stateIdx, "endTime", e.target.value)}
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveRange(rule.id, rule.stateIdx)}
                                                        className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                                                        title="Remove segment"
                                                    >
                                                        <LucideTrash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ))}

                                            <button
                                                onClick={() => handleAddRange(idx)}
                                                className="flex items-center py-3 px-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black text-slate-400 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all uppercase tracking-widest group/btn"
                                            >
                                                <LucidePlus className="w-4 h-4 mr-2 group-hover/btn:scale-125 transition-transform" />
                                                Add Time Segment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Exceptions - Right Side (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">Special Dates</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Holidays & Partial Shifts</p>
                        </div>
                        <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/30 rounded-2xl flex items-center justify-center text-rose-500">
                            <LucideCalendar className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="p-8 space-y-4">
                        {exceptions.length === 0 && !showAddException && (
                            <div className="py-12 text-center">
                                <LucideCalendar className="w-12 h-12 text-slate-100 dark:text-slate-800 mx-auto mb-4" />
                                <p className="text-sm font-bold text-slate-400 italic">No exceptions scheduled.</p>
                            </div>
                        )}

                        {exceptions.map((ex: any) => {
                            const isAvailable = ex.isAvailable;
                            return (
                                <div key={ex.id} className={clsx(
                                    "flex items-center justify-between p-5 rounded-3xl border transition-all",
                                    isAvailable
                                        ? "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-900/30"
                                        : "bg-rose-50/50 dark:bg-rose-950/10 border-rose-100 dark:border-rose-900/30"
                                )}>
                                    <div className="flex items-center space-x-4">
                                        <div className={clsx(
                                            "w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center border shadow-sm",
                                            isAvailable ? "text-emerald-600 border-emerald-100" : "text-rose-600 border-rose-100"
                                        )}>
                                            <span className="text-[10px] font-black uppercase leading-none mb-0.5">{format(new Date(ex.date), "MMM")}</span>
                                            <span className="text-lg font-black leading-none">{format(new Date(ex.date), "dd")}</span>
                                        </div>
                                        <div>
                                            <div className="font-black text-slate-900 dark:text-white">{format(new Date(ex.date), "EEEE, yyyy")}</div>
                                            <div className={clsx(
                                                "flex items-center text-[10px] font-black uppercase tracking-tighter mt-0.5",
                                                isAvailable ? "text-emerald-500" : "text-rose-500"
                                            )}>
                                                <LucideAlertCircle className="w-3 h-3 mr-1" />
                                                {isAvailable
                                                    ? ex.startTime && ex.endTime
                                                        ? `Available: ${ex.startTime} - ${ex.endTime}`
                                                        : "Available"
                                                    : "Not Available (Full Day)"}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            if (confirm("Remove this entry?")) {
                                                await deleteException(ex.id);
                                                setExceptions(exceptions.filter((e: any) => e.id !== ex.id));
                                            }
                                        }}
                                        className="p-3 text-slate-300 hover:text-rose-500 transition-all"
                                    >
                                        <LucideTrash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            );
                        })}

                        {showAddException ? (
                            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border-2 border-primary-100 dark:border-primary-900/30 space-y-6 animate-in zoom-in-95 duration-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-black text-primary-600 uppercase tracking-widest">Add New Rule</span>
                                    <button onClick={() => setShowAddException(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><LucideX className="w-5 h-5" /></button>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Select Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-black text-slate-900 dark:text-white outline-none focus:border-primary-500"
                                        value={newExDate}
                                        onChange={(e) => setNewExDate(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Status</label>
                                    <select
                                        className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-black text-slate-900 dark:text-white outline-none focus:border-primary-500 appearance-none"
                                        value={newExType}
                                        onChange={(e: any) => setNewExType(e.target.value)}
                                    >
                                        <option value="BLOCKED">Fully Blocked (Away)</option>
                                        <option value="AVAILABLE">Custom Hours (Partial)</option>
                                    </select>
                                </div>

                                {newExType === "AVAILABLE" && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Start</label>
                                            <input
                                                type="time"
                                                className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-black text-slate-900 dark:text-white"
                                                id="ex-start"
                                                defaultValue="09:00"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">End</label>
                                            <input
                                                type="time"
                                                className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-black text-slate-900 dark:text-white"
                                                id="ex-end"
                                                defaultValue="13:00"
                                            />
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={handleAddException}
                                    disabled={loading}
                                    className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50"
                                >
                                    {loading ? "Adding..." : "Add Entry"}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAddException(true)}
                                className="w-full py-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] text-slate-400 font-black hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all flex items-center justify-center uppercase tracking-widest text-[10px] group/btnex"
                            >
                                <LucidePlus className="w-5 h-5 mr-3 group-hover/btnex:scale-125 transition-transform" />
                                Add Holiday / Blocking Date
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-8 bg-primary-50 dark:bg-primary-950/20 rounded-[2rem] border border-primary-100 dark:border-primary-900/30">
                    <div className="flex items-start space-x-4">
                        <LucideAlertCircle className="w-6 h-6 text-primary-600 mt-1" />
                        <div>
                            <h3 className="text-sm font-black text-primary-900 dark:text-primary-100 uppercase tracking-tight">Pro Tip</h3>
                            <p className="text-xs font-medium text-primary-700 dark:text-primary-400 mt-1 leading-relaxed">
                                Use "Special Dates" to block out whole days for vacations or medical conferences without affecting your weekly routine.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
