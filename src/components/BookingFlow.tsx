"use client";

import { useState, useEffect } from "react";
import { format, addDays, isSameDay } from "date-fns";
import {
    LucideChevronRight,
    LucideChevronLeft,
    LucideCalendar,
    LucideClock,
    LucideUser,
    LucideWallet,
    LucideArrowRight,
    LucideCheckCircle2,
    LucideCopy,
    LucideInfo,
    LucideShieldCheck
} from "lucide-react";
import { createAppointment, submitManualPaymentDetails } from "@/lib/actions/appointments";
import { clsx } from "clsx";
import { PAYMENT_METHODS } from "@/lib/payment-config";

export default function BookingFlow({ services }: { services: any[] }) {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [slots, setSlots] = useState<any[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [patientInfo, setPatientInfo] = useState({ name: "", email: "", phone: "", problem: "", password: "" });
    const [appointmentId, setAppointmentId] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // Manual Payment State
    const [paymentMethod, setPaymentMethod] = useState<keyof typeof PAYMENT_METHODS>("BKASH");
    const [senderNumber, setSenderNumber] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [paymentNotes, setPaymentNotes] = useState("");
    const [bookingFinished, setBookingFinished] = useState(false);

    // Set initial date on mount to avoid hydration mismatch
    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    // Fetch slots
    useEffect(() => {
        if (selectedService && selectedDate) {
            const fetchSlots = async () => {
                setLoadingSlots(true);
                try {
                    const formattedDate = format(selectedDate, "yyyy-MM-dd");
                    const res = await fetch(`/api/slots?serviceId=${selectedService.id}&date=${formattedDate}`);
                    const data = await res.json();
                    setSlots(data);
                } catch (error) {
                    console.error("Failed to fetch slots", error);
                } finally {
                    setLoadingSlots(false);
                }
            };
            fetchSlots();
        }
    }, [selectedService, selectedDate]);

    const handleBookingInit = async () => {
        if (!selectedService || !selectedSlot || !patientInfo.name || !patientInfo.email || !selectedDate) return;

        // Calculate endTime
        const [hours, minutes] = selectedSlot.split(":").map(Number);
        const start = new Date(selectedDate);
        start.setHours(hours, minutes, 0, 0);
        const end = new Date(start.getTime() + selectedService.duration * 60000);
        const endTimeStr = format(end, "HH:mm");

        setSubmitting(true);
        try {
            const result = await createAppointment({
                serviceId: selectedService.id,
                date: format(selectedDate, "yyyy-MM-dd") as any,
                startTime: selectedSlot,
                endTime: endTimeStr,
                name: patientInfo.name,
                email: patientInfo.email,
                phone: patientInfo.phone,
                problem: patientInfo.problem,
                password: patientInfo.password,
                appointmentId: appointmentId || undefined,
            } as any);

            if (result.success && result.appointmentId) {
                setAppointmentId(result.appointmentId);
                setStep(4); // Move to payment instructions
            }
        } catch (error: any) {
            alert("Booking failed: " + (error.message || "Unknown error"));
        } finally {
            setSubmitting(false);
        }
    };

    const handleManualPaymentSubmit = async () => {
        if (!appointmentId || !senderNumber || !transactionId) return;

        setSubmitting(true);
        try {
            const result = await submitManualPaymentDetails({
                appointmentId,
                method: paymentMethod as any,
                senderNumber,
                transactionId,
                notes: paymentNotes,
            });

            if (result.success) {
                setBookingFinished(true);
            }
        } catch (error: any) {
            alert("Submission failed: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    if (bookingFinished) {
        return (
            <div className="p-16 text-center animate-in zoom-in-95 duration-700">
                <div className="w-24 h-24 bg-green-500 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-500/20">
                    <LucideCheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Booking Submitted!</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-md mx-auto">
                    Your appointment is currently <b>Pending Verification</b>. You can now log in to the portal using your email and the password you just set to track progress.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="/dashboard" className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black shadow-xl">
                        Go to Portal
                    </a>
                    <a href="/" className="px-10 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-bold">
                        Return Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row h-full min-h-[700px]">
            {/* DEBUG: BookingFlow is rendering */}
            <div className="hidden">RENDER_OK</div>
            {/* Sidebar / Progress Bar */}
            <div className="w-full md:w-80 bg-slate-900 p-6 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800 overflow-hidden">
                <div>
                    <h2 className="hidden md:block text-white font-black text-2xl mb-12">Booking <br /><span className="text-primary-500">Journey</span></h2>

                    {/* Progress Steps: Horizontal on mobile, vertical on desktop */}
                    <div className="flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-start gap-4 md:gap-10 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {/* Sidebar Progress - Now Interactive */}
                        {[
                            { id: 1, label: "Specialty", icon: LucideCalendar },
                            { id: 2, label: "Time Slot", icon: LucideClock },
                            { id: 3, label: "Details", icon: LucideUser },
                            { id: 4, label: "Payment", icon: LucideWallet },
                        ].map((s) => {
                            const isClickable = (s.id === 1) ||
                                (s.id === 2 && selectedService) ||
                                (s.id === 3 && selectedService && selectedSlot) ||
                                (s.id === 4 && appointmentId);

                            return (
                                <button
                                    key={s.id}
                                    onClick={() => isClickable && setStep(s.id)}
                                    disabled={!isClickable}
                                    className={clsx(
                                        "flex items-center space-x-3 md:space-x-4 transition-all duration-500 flex-shrink-0 text-left group",
                                        step >= s.id ? "opacity-100 md:translate-x-2" : "opacity-30",
                                        isClickable && "md:hover:translate-x-3"
                                    )}
                                >
                                    <div className={clsx(
                                        "w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border-2 transition-all",
                                        step === s.id ? "bg-primary-600 border-primary-600 text-white animate-pulse shadow-lg shadow-primary-500/50" :
                                            step > s.id ? "bg-green-500 border-green-500 text-white" : "border-slate-700 text-slate-500",
                                        isClickable && step !== s.id && "bg-slate-800 border-slate-700 group-hover:border-primary-500"
                                    )}>
                                        {step > s.id ? <LucideCheckCircle2 className="w-4 h-4 md:w-5 md:h-5" /> : <s.icon className="w-4 h-4 md:w-5 md:h-5" />}
                                    </div>
                                    <div className="hidden sm:block md:block">
                                        <div className="text-[8px] md:text-[10px] text-slate-500 font-black uppercase tracking-widest">{`Step 0${s.id}`}</div>
                                        <div className="text-white font-bold text-xs md:text-base whitespace-nowrap">{s.label}</div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="hidden md:block mt-20 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                    <p className="text-xs text-slate-400 font-bold leading-relaxed flex items-start">
                        <LucideShieldCheck className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                        Locked in with Dr. Abu Hanif. Secure and encrypted medical portal.
                    </p>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 md:p-16 bg-white dark:bg-slate-950 overflow-y-auto">
                {step === 1 && (
                    <div className="">
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Choose Medical Service</h3>
                        {services.length === 0 ? (
                            <div className="p-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <p className="text-slate-500 font-bold italic">No medical services available. Please contact support.</p>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 gap-6">
                                {services.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => { setSelectedService(s); nextStep(); }}
                                        className={clsx(
                                            "flex flex-col items-start p-8 rounded-[2.5rem] border-2 text-left transition-all hover:scale-[1.02]",
                                            selectedService?.id === s.id
                                                ? "border-primary-600 bg-primary-50/50 dark:bg-primary-900/10"
                                                : "border-slate-100 dark:border-slate-800 hover:border-primary-300 bg-slate-50 dark:bg-slate-900/50"
                                        )}
                                    >
                                        <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-700">
                                            <LucideWallet className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <div className="font-black text-xl text-slate-900 dark:text-white mb-2">{s.name}</div>
                                        <div className="text-2xl font-black text-primary-600 mb-2">৳{s.fee}</div>
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Duration: {s.duration} mins</div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {step === 2 && (
                    <div className="">
                        <button onClick={prevStep} className="mb-8 flex items-center text-sm font-bold text-slate-400 hover:text-primary-600 font-black tracking-widest uppercase">
                            <LucideChevronLeft className="w-4 h-4 mr-1" /> Back
                        </button>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Select Date & Time</h3>
                        <div className="flex space-x-3 pb-8 overflow-x-auto no-scrollbar mb-12 border-b border-slate-100 dark:border-slate-800">
                            {[...Array(14)].map((_, i) => {
                                const date = addDays(new Date(), i);
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedDate(date)}
                                        className={clsx(
                                            "flex-shrink-0 w-20 py-5 rounded-2xl border-2 transition-all flex flex-col items-center",
                                            selectedDate && isSameDay(selectedDate, date)
                                                ? "bg-primary-600 border-primary-600 text-white shadow-xl shadow-primary-500/30 ring-4 ring-primary-100 dark:ring-primary-900/20"
                                                : "border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary-200"
                                        )}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{format(date, "EEE")}</span>
                                        <span className="text-xl font-black">{format(date, "d")}</span>
                                    </button>
                                );
                            })}
                        </div>
                        {!selectedDate ? (
                            <div className="p-20 text-center"><p className="text-slate-400 animate-pulse font-black uppercase tracking-widest">Initializing Calendar...</p></div>
                        ) : loadingSlots ? (
                            <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div></div>
                        ) : slots.length === 0 ? (
                            <div className="p-16 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <p className="text-slate-500 font-bold italic">No availability for this date. Check another day!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {slots.map((slot) => (
                                    <button
                                        key={slot.startTime}
                                        disabled={!slot.isAvailable}
                                        onClick={() => { setSelectedSlot(slot.startTime); nextStep(); }}
                                        className={clsx(
                                            "py-4 rounded-xl border-2 font-black text-sm transition-all",
                                            selectedSlot === slot.startTime
                                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xl"
                                                : slot.isAvailable
                                                    ? "border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-400 hover:text-primary-600"
                                                    : "border-slate-50 dark:border-slate-900 text-slate-300 dark:text-slate-700 cursor-not-allowed bg-slate-50/50 dark:bg-slate-900/30"
                                        )}
                                    >
                                        {format(new Date(`2000-01-01T${slot.startTime}:00`), "hh:mm a")}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {step === 3 && (
                    <div className="max-w-xl">
                        <button onClick={prevStep} className="mb-8 flex items-center text-sm font-bold text-slate-400 hover:text-primary-600 font-black tracking-widest uppercase">
                            <LucideChevronLeft className="w-4 h-4 mr-1" /> Back
                        </button>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Patient Information</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">Almost there! We just need some basic info.</p>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Full Legal Name</label>
                                <input
                                    type="text"
                                    autoFocus
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/20 focus:border-primary-600 outline-none font-bold text-slate-900 dark:text-white transition-all"
                                    value={patientInfo.name}
                                    onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-600 outline-none font-bold text-slate-900 dark:text-white transition-all"
                                        value={patientInfo.email}
                                        onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Phone</label>
                                    <input
                                        type="tel"
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-600 outline-none font-bold text-slate-900 dark:text-white transition-all"
                                        value={patientInfo.phone}
                                        onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Set Portal Password (for future logins)</label>
                                <input
                                    type="password"
                                    placeholder="Minimum 6 characters"
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-600 outline-none font-bold text-slate-900 dark:text-white transition-all"
                                    value={patientInfo.password}
                                    onChange={(e) => setPatientInfo({ ...patientInfo, password: e.target.value })}
                                />
                                <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest italic">This allows you to track your appointment in the dashboard.</p>
                            </div>
                            <button
                                onClick={handleBookingInit}
                                disabled={submitting || !patientInfo.name || !patientInfo.email}
                                className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg hover:scale-[1.02] shadow-2xl transition-all disabled:opacity-50 mt-4 flex items-center justify-center"
                            >
                                {submitting ? "Processing..." : "Continue to Payment"} <LucideArrowRight className="ml-2 w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="max-w-2xl">
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Final Step: Manual Payment</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 font-bold">Please follow the instructions below to confirm your slot.</p>

                        {/* Payment Method Tabs */}
                        <div className="flex space-x-2 mb-8 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl">
                            {Object.entries(PAYMENT_METHODS).map(([key, method]) => (
                                <button
                                    key={key}
                                    onClick={() => setPaymentMethod(key as any)}
                                    className={clsx(
                                        "flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                        paymentMethod === key
                                            ? "bg-white dark:bg-slate-800 text-primary-600 shadow-md ring-1 ring-slate-200 dark:ring-slate-700"
                                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                    )}
                                >
                                    {method.name}
                                </button>
                            ))}
                        </div>

                        {/* Instruction Panel */}
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 p-8 md:p-10 mb-10 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-10 opacity-5">
                                <LucideWallet className="w-40 h-40" />
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
                                <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Send Exactly</div>
                                    <div className="text-4xl font-black text-primary-600">৳{selectedService?.fee}</div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                        {paymentMethod === "BANK_TRANSFER" ? "Account Details" : `${PAYMENT_METHODS[paymentMethod].name} Number`}
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl font-black text-slate-900 dark:text-white">
                                            {paymentMethod === "BANK_TRANSFER" ? PAYMENT_METHODS.BANK_TRANSFER.accountNumber : (PAYMENT_METHODS[paymentMethod] as any).number}
                                        </span>
                                        <button
                                            onClick={() => copyToClipboard(paymentMethod === "BANK_TRANSFER" ? PAYMENT_METHODS.BANK_TRANSFER.accountNumber : (PAYMENT_METHODS[paymentMethod] as any).number)}
                                            className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:text-primary-600 transition-colors"
                                        >
                                            <LucideCopy className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {paymentMethod === "BANK_TRANSFER" && (
                                <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bank Name</div>
                                        <div className="font-bold text-slate-900 dark:text-white">{PAYMENT_METHODS.BANK_TRANSFER.bankName}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Branch</div>
                                        <div className="font-bold text-slate-900 dark:text-white">{PAYMENT_METHODS.BANK_TRANSFER.branch}</div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                                    <LucideInfo className="w-4 h-4" />
                                    <span>Instructions</span>
                                </div>
                                {(PAYMENT_METHODS[paymentMethod] as any).instructions.map((inst: any, i: number) => (
                                    <div key={i} className="flex items-start space-x-4">
                                        <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-[10px] font-black shrink-0 mt-0.5">
                                            {i + 1}
                                        </div>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{inst}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submission Form */}
                        <div className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
                                        {paymentMethod === "BANK_TRANSFER" ? "Your Phone Number" : "Sender Mobile Number"}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="01XXXXXXXXX"
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-600 outline-none font-bold text-slate-900 dark:text-white transition-all underline-offset-4"
                                        value={senderNumber}
                                        onChange={(e) => setSenderNumber(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
                                        {paymentMethod === "BANK_TRANSFER" ? "Bank Trx ID / Ref" : "Transaction ID (TrxID)"}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="8XJKSD92"
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-600 outline-none font-bold text-slate-900 dark:text-white transition-all underline-offset-4"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleManualPaymentSubmit}
                                disabled={submitting || !senderNumber || !transactionId}
                                className="w-full py-6 bg-primary-600 text-white rounded-[2rem] font-black text-xl hover:bg-primary-700 shadow-2xl shadow-primary-500/30 transition-all disabled:opacity-50 flex items-center justify-center"
                            >
                                {submitting ? "Verifying Reference..." : "I Have Completed Payment"}
                            </button>

                            <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
                                Verification takes typically 1-2 hours during clinic time.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
