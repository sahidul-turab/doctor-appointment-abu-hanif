"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LucideHeartPulse } from "lucide-react";

export default function Footer() {
    const { language } = useLanguage();

    const translations = {
        EN: {
            desc: "Providing premium medical consultations with a focus on cardiovascular health and advanced internal medicine diagnostics.",
            links: "Quick Links",
            clinic: "Digital Clinic",
            book: "Book Session",
            portal: "Patient Portal",
            compliance: "Compliance",
            bmdc: "BMDC Reg: A-66955",
            privacy: "Privacy Policy",
            terms: "Terms of Care",
            rights: "© 2026 DR. ABU HANIF MEDICAL CLINIC. ALL RIGHTS RESERVED.",
            trusted: "TRUSTED CARE",
            about: "About"
        },
        BN: {
            desc: "আমরা হৃদরোগ এবং ইন্টারনাল মেডিসিনের উন্নত চিকিৎসা সেবা প্রদানের মাধ্যমে রোগীদের স্বাস্থ্য সুরক্ষায় প্রতিশ্রুতিবদ্ধ।",
            links: "দ্রুত লিঙ্ক",
            clinic: "ডিজিটাল ক্লিনিক",
            book: "সিরিয়াল নিন",
            portal: "পেশেন্ট পোর্টাল",
            compliance: "রেজিস্ট্রেশন ও নীতিমালা",
            bmdc: "বিএমডিসি রেজি: A-66955",
            privacy: "গোপনীয়তা নীতি",
            terms: "ব্যবহারের শর্তাবলী",
            rights: "© 2026 ডা. আবু হানিফ মেডিকেল ক্লিনিক। সর্বস্বত্ব সংরক্ষিত।",
            trusted: "আস্থাশীল সেবা",
            about: "সম্পর্কে"
        }
    };

    const t = translations[language];

    return (
        <footer className="py-24 border-t border-[var(--border)] bg-[var(--card)] px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-2">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white shadow-xl">
                                <LucideHeartPulse className="w-6 h-6" />
                            </div>
                            <span className="font-black text-2xl text-[var(--text)] tracking-tighter italic">
                                {language === "EN" ? "Dr. Abu Hanif" : "ডা. আবু হানিফ"}
                            </span>
                        </div>
                        <p className="text-[var(--text-muted)] font-medium max-w-sm leading-relaxed mb-8">
                            {t.desc}
                        </p>
                        <div className="flex space-x-4">
                            <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all cursor-pointer">
                                <span className="font-black text-xs">FB</span>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all cursor-pointer">
                                <span className="font-black text-xs">LI</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">{t.links}</div>
                        <ul className="space-y-4">
                            <li><a href="#hero" className="text-sm font-bold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">{t.clinic}</a></li>
                            <li><a href="#booking" className="text-sm font-bold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">{t.book}</a></li>
                            <li><a href="#about" className="text-sm font-bold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">{translations[language].about || "About"}</a></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">{t.compliance}</div>
                        <ul className="space-y-4">
                            <li className="text-sm font-bold text-[var(--text-muted)]">{t.bmdc}</li>
                            <li className="text-sm font-bold text-[var(--text-muted)]">{t.privacy}</li>
                            <li className="text-sm font-bold text-[var(--text-muted)]">{t.terms}</li>
                        </ul>
                    </div>
                </div>
                <div className="pt-12 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[var(--text-muted)] text-[11px] font-black uppercase tracking-widest opacity-60">
                        {t.rights}
                    </p>
                    <div className="flex items-center space-x-2 grayscale opacity-30">
                        <div className="h-4 w-px bg-[var(--border)] mx-2" />
                        <span className="text-[10px] font-black italic text-[var(--text)]">{t.trusted}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
