"use client";

import { useState, useEffect } from "react";
import { LucideMenu, LucideX, LucidePhone, LucideCalendar, LucideLanguages, LucidePalette, LucideHeartPulse } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { language, toggleLanguage, setLanguage } = useLanguage();
    const { theme, toggleTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null;

    const toggleMenu = () => setIsOpen(!isOpen);

    const translations = {
        EN: {
            home: "Home",
            about: "Dr. Abu Hanif",
            booking: "Booking",
            expert: "Cardiologist (হৃদরোগ বিশেষজ্ঞ)",
            doctorName: "Dr. Abu Hanif",
            theme: theme === "light" ? "Dark Mode" : "Light Mode",
            dark: "Dark",
            light: "Light"
        },
        BN: {
            home: "হোম",
            about: "ডা. আবু হানিফ",
            booking: "বুকিং",
            expert: "Cardiologist (হৃদরোগ বিশেষজ্ঞ)",
            doctorName: "ডা. আবু হানিফ",
            theme: theme === "light" ? "ডার্ক মোড" : "লাইট মোড",
            dark: "ডার্ক",
            light: "লাইট"
        }
    };

    const t = translations[language];

    const navLinks = [
        { label: t.home, href: "#hero" },
        { label: t.about, href: "#about" },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const offset = 100; // Adjust for sticky header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    return (
        <nav className={clsx(
            "sticky top-0 z-[100] transition-all duration-300 w-full bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]",
            scrolled ? "py-3" : "py-6 md:bg-transparent md:border-none md:backdrop-blur-none"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <a href="#hero" onClick={(e) => scrollToSection(e, "#hero")} className="flex items-center space-x-3 md:space-x-5 group shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white transition-all shadow-2xl shadow-[var(--primary)]/30 group-hover:scale-105">
                            <LucideHeartPulse className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-lg md:text-2xl font-black tracking-tight text-[var(--text)] leading-none italic drop-shadow-sm whitespace-nowrap">{translations[language].doctorName || "Dr. Abu Hanif"}</span>
                            <div className="text-[9px] md:text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.15em] md:tracking-[0.3em] mt-1 md:mt-1.5 opacity-80 leading-tight">
                                <span className="hidden md:inline whitespace-nowrap">{t.expert}</span>
                                <div className="md:hidden flex flex-col">
                                    <span>Cardiologist</span>
                                    <span>হৃদরোগ বিশেষজ্ঞ</span>
                                </div>
                            </div>
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        <div className="flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--primary)] transition-all tracking-[0.06em] relative group/nav shrink-0"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[var(--primary)] transition-all group-hover/nav:w-full opacity-60" />
                                </a>
                            ))}
                        </div>

                        <div className="h-6 w-px bg-[var(--border)]" />

                        <div className="flex items-center space-x-5">
                            <div className="flex items-center space-x-2">
                                {/* Theme Toggle */}
                                <div className="flex items-center bg-[var(--card)] border border-[var(--border)] rounded-xl p-1 shadow-sm">
                                    <button
                                        onClick={() => setTheme("dark")}
                                        className={clsx(
                                            "px-3 py-1.5 rounded-lg text-[10px] font-black transition-all",
                                            theme === "dark" ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" : "text-[var(--text-muted)] hover:text-[var(--primary)]"
                                        )}
                                    >
                                        {t.dark}
                                    </button>
                                    <button
                                        onClick={() => setTheme("light")}
                                        className={clsx(
                                            "px-3 py-1.5 rounded-lg text-[10px] font-black transition-all",
                                            theme === "light" ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" : "text-[var(--text-muted)] hover:text-[var(--primary)]"
                                        )}
                                    >
                                        {t.light}
                                    </button>
                                </div>

                                {/* Language Toggle */}
                                <div className="flex items-center bg-[var(--card)] border border-[var(--border)] rounded-xl p-1 shadow-sm">
                                    <button
                                        onClick={() => setLanguage("BN")}
                                        className={clsx(
                                            "px-3 py-1.5 rounded-lg text-[10px] font-black transition-all",
                                            language === "BN" ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" : "text-[var(--text-muted)] hover:text-[var(--primary)]"
                                        )}
                                    >
                                        বাংলা
                                    </button>
                                    <button
                                        onClick={() => setLanguage("EN")}
                                        className={clsx(
                                            "px-3 py-1.5 rounded-lg text-[10px] font-black transition-all",
                                            language === "EN" ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" : "text-[var(--text-muted)] hover:text-[var(--primary)]"
                                        )}
                                    >
                                        EN
                                    </button>
                                </div>
                            </div>

                            <a href="#booking" onClick={(e) => scrollToSection(e, "#booking")} className="flex items-center px-6 py-2.5 bg-[var(--text)] text-[var(--bg)] rounded-xl text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-[var(--primary)] transition-all active:scale-95 shadow-xl shadow-black/5 shrink-0">
                                {t.booking}
                            </a>
                        </div>
                    </div>

                    {/* Mobile Header Menu Button */}
                    <div className="flex items-center md:hidden space-x-2">
                        {/* Booking CTA on Mobile Header */}
                        <a
                            href="#booking"
                            onClick={(e) => scrollToSection(e, "#booking")}
                            className="flex items-center px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-[var(--primary)]/20 active:scale-95 transition-all"
                        >
                            {t.booking}
                        </a>

                        <button
                            onClick={toggleMenu}
                            className="p-2.5 rounded-xl bg-[var(--card)] text-[var(--text)] border border-[var(--border)] active:scale-95 transition-all"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <LucideX className="w-6 h-6" /> : <LucideMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={clsx(
                "md:hidden absolute inset-x-0 bg-[var(--bg)] border-b border-[var(--border)] transition-all duration-300 shadow-2xl",
                isOpen ? "top-full opacity-100 visible" : "top-[150%] opacity-0 invisible"
            )}>
                <div className="p-8 space-y-8">
                    {/* Compact Mobile Toggles */}
                    <div className="flex flex-wrap items-center gap-4 border-b border-[var(--border)] pb-8">
                        {/* Theme Toggle Mobile */}
                        <div className="flex items-center bg-[var(--card)] border border-[var(--border)] rounded-xl p-1 shadow-sm flex-1">
                            <button
                                onClick={() => setTheme("dark")}
                                className={clsx(
                                    "flex-1 py-2 rounded-lg text-[11px] font-black transition-all",
                                    theme === "dark" ? "bg-[var(--primary)] text-white" : "text-[var(--text-muted)]"
                                )}
                            >
                                {t.dark}
                            </button>
                            <button
                                onClick={() => setTheme("light")}
                                className={clsx(
                                    "flex-1 py-2 rounded-lg text-[11px] font-black transition-all",
                                    theme === "light" ? "bg-[var(--primary)] text-white" : "text-[var(--text-muted)]"
                                )}
                            >
                                {t.light}
                            </button>
                        </div>

                        {/* Language Toggle Mobile */}
                        <div className="flex items-center bg-[var(--card)] border border-[var(--border)] rounded-xl p-1 shadow-sm flex-1">
                            <button
                                onClick={() => setLanguage("BN")}
                                className={clsx(
                                    "flex-1 py-2 rounded-lg text-[11px] font-black transition-all",
                                    language === "BN" ? "bg-[var(--primary)] text-white" : "text-[var(--text-muted)]"
                                )}
                            >
                                বাংলা
                            </button>
                            <button
                                onClick={() => setLanguage("EN")}
                                className={clsx(
                                    "flex-1 py-2 rounded-lg text-[11px] font-black transition-all",
                                    language === "EN" ? "bg-[var(--primary)] text-white" : "text-[var(--text-muted)]"
                                )}
                            >
                                EN
                            </button>
                        </div>
                    </div>
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="block text-[18px] font-semibold text-[var(--text)] tracking-tight leading-[1.6] hover:text-[var(--primary)] transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#booking"
                        onClick={(e) => scrollToSection(e, "#booking")}
                        className="block text-[18px] font-semibold text-[var(--text)] tracking-tight leading-[1.6] hover:text-[var(--primary)] transition-colors"
                    >
                        {t.booking}
                    </a>
                    <div className="pt-6 border-t border-[var(--border)] flex flex-col space-y-4">
                        <a
                            href="#booking"
                            onClick={(e) => scrollToSection(e, "#booking")}
                            className="w-full text-center py-5 bg-[var(--primary)] text-white rounded-2xl font-black text-lg shadow-xl"
                        >
                            {t.booking}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

