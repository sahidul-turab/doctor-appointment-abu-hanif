import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Providers } from "@/components/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserMenu from "@/components/UserMenu";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const metadata: Metadata = {
    title: "Dr. Abu Hanif | Professional Medical Consultations",
    description: "Book online or chamber consultations with Dr. Abu Hanif. Specialized in cardiology and general medicine.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Navbar session={session} />
                    <main className="relative">{children}</main>
                    <footer className="py-20 border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center">
                                        <span className="text-white dark:text-slate-900 font-bold text-sm">H</span>
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white">Dr. Abu Hanif Clinic</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">© 2026 Professional Medical Consultations. All rights reserved.</p>
                                <div className="flex space-x-6">
                                    <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors text-sm">Terms</a>
                                    <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors text-sm">Privacy</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </Providers>
            </body>
        </html>
    );
}
