"use client";

import { useState } from "react";
import { LucideMenu, LucideX } from "lucide-react";
import UserMenu from "./UserMenu";
import { clsx } from "clsx";

export default function Navbar({ session }: { session: any }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { label: "Home", href: "/" },
        ...(session?.user?.role === "DOCTOR" ? [{ label: "Portal", href: "/doctor" }] : []),
        ...(session?.user?.role === "PATIENT" ? [{ label: "Dashboard", href: "/dashboard" }] : []),
        ...(session ? [] : [{ label: "Login", href: "/login" }]),
    ];

    return (
        <nav className="sticky top-0 z-50 glass border-b transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <a href="/" className="flex items-center space-x-3 group cursor-pointer">
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold text-xl">H</span>
                        </div>
                        <span className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">Dr. Abu Hanif</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors uppercase tracking-widest"
                            >
                                {link.label}
                            </a>
                        ))}
                        {session && <UserMenu user={session.user} />}
                        <a href="/book" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/25 active:scale-95">
                            Book Now
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                        {isOpen ? <LucideX className="w-6 h-6" /> : <LucideMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={clsx(
                "md:hidden fixed inset-x-0 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 transition-all duration-300 ease-in-out shadow-2xl",
                isOpen ? "top-20 opacity-100 pointer-events-auto" : "-top-96 opacity-0 pointer-events-none"
            )}>
                <div className="p-6 space-y-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm"
                        >
                            {link.label}
                        </a>
                    ))}
                    {session && (
                        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800">
                            <UserMenu user={session.user} />
                        </div>
                    )}
                    <a
                        href="/book"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center px-6 py-5 bg-primary-600 text-white rounded-2xl font-black text-lg shadow-xl"
                    >
                        Book Now
                    </a>
                </div>
            </div>
        </nav>
    );
}
