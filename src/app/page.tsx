"use client";

import {
    LucidePhone,
    LucideMessageCircle,
    LucideClock,
    LucideMapPin,
    LucideArrowRight,
    LucideCheckCircle2,
    LucideHeartPulse,
    LucideShieldCheck,
    LucideBuilding2,
    LucideSearchCheck,
    LucideAward,
    LucideStethoscope
} from "lucide-react";
import { useState, useEffect } from "react";
import { getWhatsAppUrl, WHATSAPP_MESSAGE_TEMPLATE } from "@/lib/whatsapp";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { FloatingPlus, MedicalDoodle, PortraitDoodle } from "@/components/Doodles";

export default function SimpleHomePage() {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const whatsappUrl = getWhatsAppUrl(undefined, WHATSAPP_MESSAGE_TEMPLATE);
    const phoneNumber = "01673129528"; // Updated display number

    if (!mounted) return null;

    const t = {
        EN: {
            doctorName: "Dr. Abu Hanif",
            specialization: "Medicine & Cardiology Specialist",
            degrees: [
                "MBBS (MMC), D-Card (BMU)",
                "FCPS (Cardiology – Part-I)"
            ],
            heroPromise: "Expert care for your heart and general health. 15+ years of experience in helping patients lead healthier lives.",
            primaryDegrees: [
                "MBBS (MMC) • D-Card (BMU – Former PG Hospital)",
                "FCPS (Cardiology – Part-I)"
            ],
            profCredentials: [
                "BCS (Health)",
                "Medical Officer – National Institute of Cardiovascular Diseases (NICVD), Dhaka"
            ],
            bookWhatsApp: "Consult the Doctor Online",
            aboutTitle: "Dr. Abu Hanif",
            aboutSubtitle: "Cardiologist | NICVD, Dhaka",
            aboutParagraphs: [
                "I am a dedicated and career-oriented physician with an MBBS degree from Mymensingh Medical College. I completed my Postgraduate Degree in Cardiology (D-Card) from Dhaka Medical College, accredited by Bangladesh Medical University (BMU).",
                "Currently, I am pursuing FCPS (Cardiology) training and serving as a Medical Officer at the National Institute of Cardiovascular Diseases (NICVD), Dhaka. My clinical focus includes comprehensive cardiovascular patient management, acute cardiac care, and evidence-based cardiology practice."
            ],
            clinicalInterestsHeading: "Clinical Interests",
            interests: [
                "Comprehensive cardiovascular patient management",
                "Acute Cardiac Care",
                "Preventive Cardiology",
                "Evidence-Based Practice"
            ],
            highlightsTitle: "Profile Highlights",
            highlights: [
                { label: "Qualifications", value: "MBBS (MMC), D-Card (BMU)" },
                { label: "Current Role", value: "Medical Officer, NICVD" },
                { label: "Training", value: "FCPS (Cardiology) – In Progress" },
                { label: "Focus Areas", value: "Acute Cardiac Care • Preventive Cardiology" }
            ],
            closingQuote: "“Committed to excellence in cardiovascular care through patient-centered, evidence-based practice.”"
        },
        BN: {
            doctorName: "ডা. আবু হানিফ",
            specialization: "মেডিসিন ও কার্ডিওলজি বিশেষজ্ঞ",
            degrees: [
                "এমবিবিএস (এমএমসি), ডি-কার্ড (বিএমইউ)",
                "এফসিপিএস (কার্ডিওলজি – পার্ট-I)"
            ],
            heroPromise: "১৫+ বছরের অভিজ্ঞতায় হৃদরোগ ও সাধারণ স্বাস্থ্যসেবায় দক্ষ চিকিৎসা প্রদান। রোগীদের সুস্থ, নিরাপদ ও স্বাভাবিক জীবনে ফিরিয়ে আনাই আমার অঙ্গীকার।",
            primaryDegrees: [
                "এমবিবিএস (এমএমসি) • ডি-কার্ড (বিএমইউ – সাবেক পিজি হাসপাতাল)",
                "এফসিপিএস (কার্ডিওলজি – পার্ট-I)"
            ],
            profCredentials: [
                "বিসিএস (স্বাস্থ্য)",
                "মেডিকেল অফিসার – ন্যাশনাল ইনস্টিটিউট অব কার্ডিওভাসকুলার ডিজিজেস (এনআইসিভিডি), ঢাকা"
            ],
            bookWhatsApp: "অনলাইনে ডাক্তারের পরামর্শ পেতে ক্লিক করুন",
            aboutTitle: "ডা. আবু হানিফ",
            aboutSubtitle: "কার্ডিওলজিস্ট | এনআইসিভিডি, ঢাকা",
            aboutParagraphs: [
<<<<<<< HEAD
                "আমি একজন নিবেদিতপ্রাণ ও পেশাগতভাবে প্রতিশ্রুতিবদ্ধ চিকিৎসক। ময়মনসিংহ মেডিকেল কলেজ থেকে এমবিবিএস সম্পন্ন করার মাধ্যমে আমার চিকিৎসা জীবনের সূচনা। পরবর্তীতে ঢাকা মেডিকেল কলেজ থেকে ডি-কার্ড (কার্ডিওলজি) ডিগ্রি অর্জন করি, যা বাংলাদেশ মেডিকেল ইউনিভার্সিটি কর্তৃক স্বীকৃত।",
=======
                "আমি একজন নিবেদিতপ্রাণ ও পেশাগতভাবে প্রতিশ্রুতিবদ্ধ চিকিৎসক। ময়মনসিংহ মেডিকেল কলেজ থেকে এমবিবিএস সম্পন্ন করার মাধ্যমে আমার চিকিৎসা জীবনের সূচনা। পরবর্তীতে ঢাকার ডি-কার্ড (কার্ডিওলজি) ডিগ্রি অর্জন করি, যা বাংলাদেশ মেডিকেল ইউনিভার্সিটি কর্তৃক স্বীকৃত।",
>>>>>>> 15ea6a395bd0f3577045108d121461294c6b1ed8
                "বর্তমানে আমি এফসিপিএস (কার্ডিওলজি) প্রশিক্ষণে নিয়োজিত এবং এনআইসিভিডি, ঢাকায় মেডিকেল অফিসার হিসেবে দায়িত্ব পালন করছি। আমার ক্লিনিক্যাল ফোকাস হলো কার্ডিওভাসকুলার রোগীর ব্যবস্থাপনা, তীব্র হৃদরোগ চিকিৎসা এবং প্রমাণভিত্তিক কার্ডিওলজি চর্চা।"
            ],
            clinicalInterestsHeading: "ক্লিনিক্যাল আগ্রহ",
            interests: [
                "সমন্বিত হৃদরোগ ব্যবস্থাপনা",
                "তীব্র হৃদরোগ চিকিৎসা (Acute Cardiac Care)",
                "প্রতিরোধমূলক কার্ডিওলজি",
                "প্রমাণভিত্তিক (Evidence-Based) চিকিৎসা চর্চা"
            ],
            highlightsTitle: "প্রোফাইল হাইলাইটস",
            highlights: [
                { label: "শিক্ষাগত যোগ্যতা", value: "এমবিবিএস (এমএমসি), ডি-কার্ড (বিএমইউ)" },
                { label: "বর্তমান দায়িত্ব", value: "মেডিকেল অফিসার, এনআইসিভিডি" },
                { label: "প্রশিক্ষণ", value: "এফসিপিএস (কার্ডিওলজি) – চলমান" },
                { label: "ফোকাস এরিয়া", value: "তীব্র হৃদরোগ চিকিৎসা • প্রতিরোধমূলক কার্ডিওলজি" }
            ],
            closingQuote: "“রোগীকেন্দ্রিক ও প্রমাণভিত্তিক চিকিৎসার মাধ্যমে হৃদরোগ সেবায় উৎকর্ষ অর্জনে প্রতিশ্রুতিবদ্ধ।”"
        }
    };

    const content = language === "BN" ? t.BN : t.EN;

    return (
        <div className="min-h-screen bg-[var(--bg)] font-sans pb-12 transition-colors duration-500">
            {/* Portfolio / Identity Section */}
            <section id="hero" className="relative overflow-hidden bg-[var(--card)]/50 pt-16 pb-12 border-b border-[var(--border)] isolate">
                <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    {/* Portrait Side */}
                    <div className="relative flex justify-center items-center group order-2 md:order-1 scale-90 md:scale-100">
                        <PortraitDoodle />
                        <FloatingPlus className="top-0 left-0 text-[var(--primary)]" delay={0.5} />
                        <FloatingPlus className="bottom-20 -right-4 text-emerald-500" delay={1.2} />
                        <MedicalDoodle icon={LucideStethoscope} className="-top-12 right-12 text-[var(--primary)] rotate-12" delay={2} />

                        <div className="relative z-10 w-full max-w-[320px] aspect-[4/5] bg-[var(--card)] rounded-[3rem] overflow-hidden border border-[var(--border)] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                            <img
                                src="/doctor-portrait.png"
                                alt="Dr. Abu Hanif"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-4 left-4 right-4 p-4 bg-[var(--card)]/90 backdrop-blur-xl rounded-2xl border border-[var(--border)] shadow-lg text-center">
                                <h3 className="text-lg font-black text-[var(--text)] leading-tight">{content.doctorName}</h3>
                                <div className="text-[10px] md:text-[9px] font-black text-[var(--primary)] uppercase tracking-wider mt-1 leading-tight flex flex-col">
                                    {content.degrees.map((line: string, i: number) => (
                                        <span key={i}>{line}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="text-center md:text-left order-1 md:order-2">

                        <h1 className="text-3xl font-black text-[var(--text)] mb-2 leading-tight tracking-tight">{content.doctorName}</h1>
                        <p className="text-[var(--primary)] font-bold mb-4 uppercase tracking-wide text-sm">{content.specialization}</p>

                        {/* Redesigned Credentials Block */}
                        <div className="mb-8 space-y-4 text-center md:text-left">
                            {/* Primary Degrees */}
                            <div className="space-y-1 text-sm font-semibold text-[var(--text)] leading-relaxed">
                                {content.primaryDegrees.map((degree, i) => (
                                    <p key={i}>{degree}</p>
                                ))}
                            </div>

                            {/* Subtle Divider */}
                            <div className="w-12 h-px bg-[var(--text)] opacity-20 mx-auto md:mx-0" />

                            {/* Professional Credentials */}
                            <div className="space-y-1 text-xs font-medium text-[var(--text)]/80 leading-relaxed">
                                {content.profCredentials.map((credential, i) => (
                                    <p key={i}>{credential}</p>
                                ))}
                            </div>
                        </div>

                        <p className="text-[var(--text-muted)] text-base leading-relaxed mb-6 font-medium">
                            {content.heroPromise}
                        </p>


                    </div>
                </div>
            </section>

            {/* Main CTA */}
            <section id="booking" className="px-4 py-12">
                <div className="max-w-md mx-auto">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-4 w-full min-h-[5.5rem] px-8 py-5 bg-emerald-500 text-white rounded-[2.5rem] font-black text-[17px] md:text-xl text-center leading-[1.4] shadow-2xl shadow-emerald-500/25 hover:bg-emerald-600 active:scale-[0.98] transition-all mb-6 isolate overflow-hidden"
                    >
                        <LucideMessageCircle className="w-7 h-7 flex-shrink-0" />
                        <span className="flex-1">{content.bookWhatsApp}</span>
                    </a>

                </div>
            </section>

            {/* World-Class Consultant Profile: About Section */}
            <section id="about" className="px-4 py-24 animate-in fade-in duration-1000">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-[var(--card)]/80 via-[var(--card)]/40 to-transparent backdrop-blur-2xl p-8 md:p-16 rounded-[4rem] border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                        {/* Elegant Left Accent Line */}
                        <div className="absolute left-0 top-12 bottom-12 w-[1.5px] bg-gradient-to-b from-transparent via-[var(--primary)]/40 to-transparent" />

                        <div className="relative z-10 grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
                            {/* Left Column: Main Narrative (3/5 width) */}
                            <div className="lg:col-span-3 space-y-10">
                                <div>
                                    <h2 className="text-3xl font-black text-[var(--text)] mb-3 tracking-tight">{content.aboutTitle}</h2>
                                    <p className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-[0.4em] opacity-60">{content.aboutSubtitle}</p>
                                </div>

                                <div className="space-y-8 text-[var(--text)]/90 text-base md:text-lg leading-[1.8] font-medium text-left">
                                    {content.aboutParagraphs.map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>

                                <div className="space-y-6 pt-4">
                                    <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">{content.clinicalInterestsHeading}</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {content.interests.map((interest, i) => (
                                            <span key={i} className="px-5 py-2.5 bg-white/5 border border-white/10 text-[var(--text)]/80 text-[11px] font-bold tracking-wide rounded-2xl hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-all duration-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Profile Highlights (2/5 width) */}
                            <div className="lg:col-span-2">
                                <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 space-y-10 relative isolate">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/[0.02] to-transparent rounded-[3rem] -z-10" />

                                    <h3 className="text-sm font-black text-[var(--text)] uppercase tracking-widest border-b border-white/5 pb-6">{content.highlightsTitle}</h3>

                                    <div className="space-y-8">
                                        {[
                                            { icon: LucideAward, data: content.highlights[0] },
                                            { icon: LucideBuilding2, data: content.highlights[1] },
                                            { icon: LucideStethoscope, data: content.highlights[2] },
                                            { icon: LucideHeartPulse, data: content.highlights[3] }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-5 group/item">
                                                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[var(--primary)] group-hover/item:scale-110 transition-transform duration-500">
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest opacity-50">{item.data.label}</div>
                                                    <div className="text-sm font-bold text-[var(--text)]/90 leading-tight">{item.data.value}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Ethics Footer */}
                        <div className="mt-20 pt-10 border-t border-white/5 flex justify-center text-center">
                            <p className="max-w-2xl text-[10px] md:text-[11px] font-medium italic text-[var(--text-muted)] opacity-50 leading-relaxed tracking-wide">
                                {content.closingQuote}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
