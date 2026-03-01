"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LucideHeartPulse, LucideFacebook, LucideYoutube } from "lucide-react";

export default function Footer() {
    const { language } = useLanguage();

    const socialLinks = [
        {
            name: "Facebook",
            url: "https://www.facebook.com/profile.php?id=61555224581718",
            icon: LucideFacebook,
            hoverClass: "hover:text-[#1877F2] hover:border-[#1877F2]"
        },
        {
            name: "YouTube",
            url: "https://www.youtube.com/@abuhanifdr",
            icon: LucideYoutube,
            hoverClass: "hover:text-[#FF0000] hover:border-[#FF0000]"
        }
    ];

    const translations = {
        EN: {
            doctorName: "Dr. Abu Hanif",
            subtitle: "Cardiologist | NICVD, Dhaka",
            desc: "Committed to excellence in cardiovascular care through patient-centered, evidence-based practice.",
            linksTitle: "Quick Links",
            home: "Home",
            booking: "Booking",
            about: "Dr. Abu Hanif",
            interests: "Clinical Interests",
            legalTitle: "Legal & Trust",
            bmdc: "BMDC Reg: A-66955",
            privacy: "Privacy Policy",
            terms: "Terms of Care",
            declaration: "Medical Declaration",
            disclaimer: "Disclaimer: This website is for informational purposes only. In case of emergency, please contact your nearest hospital.",
            rights: "© 2026 Dr. Abu Hanif | All Rights Reserved"
        },
        BN: {
            doctorName: "ডা. আবু হানিফ",
            subtitle: "কার্ডিওলজিস্ট | এনআইসিভিডি, ঢাকা",
            desc: "রোগীকেন্দ্রিক ও প্রমাণভিত্তিক চিকিৎসার মাধ্যমে হৃদরোগ সেবায় উৎকর্ষ অর্জনে প্রতিশ্রুতিবদ্ধ।",
            linksTitle: "দ্রুত লিঙ্ক",
            home: "হোম",
            booking: "বুকিং",
            about: "ডা. আবু হানিফ",
            interests: "ক্লিনিক্যাল আগ্রহ",
            legalTitle: "আইনি ও ট্রাস্ট",
            bmdc: "বিএমডিসি রেজি: A-66955",
            privacy: "গোপনীয়তা নীতি",
            terms: "ব্যবহারের শর্তাবলী",
            declaration: "চিকিৎসা সংক্রান্ত ঘোষণা",
            disclaimer: "সতর্কবার্তা: এই ওয়েবসাইট শুধুমাত্র তথ্য প্রদানমূলক। জরুরি চিকিৎসার ক্ষেত্রে নিকটস্থ হাসপাতালে যোগাযোগ করুন।",
            rights: "© 2026 ডা. আবু হানিফ | সর্বস্বত্ব সংরক্ষিত"
        }
    };

    const t = translations[language];

    return (
        <footer className="py-16 md:py-24 border-t border-[var(--border)] bg-[var(--card)] px-4">
            <div className="max-w-7xl mx-auto">
                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16 md:mb-20">

                    {/* Column 1: Brand Section */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white shadow-lg">
                                <LucideHeartPulse className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-[var(--text)] tracking-tight leading-none italic">
                                    {t.doctorName}
                                </h3>
                                <p className="text-[9px] font-bold text-[var(--primary)] uppercase tracking-widest mt-1 opacity-80">
                                    {t.subtitle}
                                </p>
                            </div>
                        </div>
                        <p className="text-[var(--text-muted)] text-sm font-medium max-w-sm leading-relaxed mb-8">
                            {t.desc}
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-11 h-11 md:w-10 md:h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] transition-all cursor-pointer ${social.hoverClass} hover:scale-110 active:scale-95`}
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-6 flex flex-col items-start lg:items-start text-left ml-0 md:ml-0 lg:ml-auto">
                        <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] opacity-50">
                            {t.linksTitle}
                        </div>
                        <ul className="space-y-4">
                            <li><a href="#hero" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">{t.home}</a></li>
                            <li><a href="#booking" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">{t.booking}</a></li>
                            <li><a href="#about" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">{t.about}</a></li>
                            <li><a href="#about" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">{t.interests}</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal & Trust */}
                    <div className="space-y-6 flex flex-col items-start lg:items-start text-left lg:ml-auto">
                        <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] opacity-50">
                            {t.legalTitle}
                        </div>
                        <ul className="space-y-4">
                            <li className="text-sm font-semibold text-[var(--text-muted)]">{t.bmdc}</li>
                            <li><a href="#" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">{t.privacy}</a></li>
                            <li><a href="#" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">{t.terms}</a></li>
                            <li><a href="#" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">{t.declaration}</a></li>
                        </ul>
                        <p className="text-[var(--text-muted)] text-[11px] font-medium leading-relaxed opacity-40 max-w-[240px]">
                            {t.disclaimer}
                        </p>
                    </div>
                </div>

                {/* Bottom Copyright Strip */}
                <div className="pt-10 border-t border-[var(--border)] flex justify-center">
                    <p className="text-[var(--text-muted)] text-[11px] font-black tracking-widest opacity-60 uppercase">
                        {t.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
}
