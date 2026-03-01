import type { Metadata } from "next";
import { Baloo_Da_2 } from "next/font/google";
import "./globals.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Providers } from "@/components/Providers";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";

const balooDa2 = Baloo_Da_2({
    subsets: ["bengali", "latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-baloo",
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const metadata: Metadata = {
    title: "Dr. Abu Hanif | Professional Medical Consultations",
    description: "Book online or chamber consultations with Dr. Abu Hanif. Specialized in cardiology and general medicine.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="bn" className="lang-bn" suppressHydrationWarning={true}>
            <body
                className={`${balooDa2.variable} font-sans blueprint-grid min-h-screen transition-colors duration-500 theme-dark`}
                suppressHydrationWarning={true}
            >
                <Providers>
                    <Navbar />
                    <main className="relative">{children}</main>
                    <Footer />
                </Providers>
                <FloatingContactButtons />
            </body>
        </html>
    );
}

