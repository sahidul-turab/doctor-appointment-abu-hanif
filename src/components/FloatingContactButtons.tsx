"use client";

import { LucideMessageCircle, LucidePhone } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";

export default function FloatingContactButtons() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const phoneNumber = "8801673129528";
    const waMessage = `ডা. আবু হানিফ স্যারের অ্যাপয়েন্টমেন্ট নিতে নিচের নম্বরে ৫১০ টাকা বিকাশ করুন:

📱 বিকাশ নম্বর: ০১৬৭৩১২৯৫২৮

পেমেন্ট সম্পন্ন হলে একটি কনফার্মেশন মেসেজ পাঠান।
ডা. আবু হানিফ স্যার খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।`;

    const encodedMessage = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    const callUrl = `tel:+${phoneNumber}`;

    return (
        <div
            id="floating-contact-buttons"
            className="fixed right-4 md:right-8 z-[99999] flex flex-col items-end gap-3 md:gap-4"
            style={{
                bottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                pointerEvents: 'auto',
                display: 'flex',
                visibility: 'visible'
            }}
        >
            {/* WhatsApp Message Button (Top) */}
            <div className="group relative flex items-center justify-center">
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-[var(--card)] border border-[var(--border)] text-[var(--text)] text-sm font-semibold rounded-xl opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block shadow-2xl z-[100000]">
                    Message on WhatsApp
                </span>

                <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-[52px] h-[52px] md:w-[64px] md:h-[64px] bg-[#10b981] text-white rounded-full shadow-[0_12px_40px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
                    aria-label="Message Dr. Abu Hanif on WhatsApp"
                >
                    <LucideMessageCircle className="w-7 h-7 md:w-8 md:h-8 fill-current" />
                </a>
            </div>

            {/* Call Button (Bottom) */}
            <div className="group relative flex items-center justify-center">
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-[var(--card)] border border-[var(--border)] text-[var(--text)] text-sm font-semibold rounded-xl opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block shadow-2xl z-[100000]">
                    Call Dr. Abu Hanif
                </span>

                <a
                    href={callUrl}
                    className="flex items-center justify-center w-[52px] h-[52px] md:w-[64px] md:h-[64px] bg-white text-[#10b981] rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-[var(--border)] hover:scale-110 active:scale-95 transition-all duration-300"
                    aria-label="Call Dr. Abu Hanif"
                >
                    <LucidePhone className="w-6 h-6 md:w-7 md:h-7 fill-current" />
                </a>
            </div>
        </div>
    );
}
