"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "EN" | "BN";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("BN");
    const [mounted, setMounted] = useState(false);

    // Persist language preference
    useEffect(() => {
        setMounted(true);
        const savedLang = localStorage.getItem("preferred-language") as Language;
        if (savedLang && (savedLang === "EN" || savedLang === "BN")) {
            setLanguageState(savedLang);
        } else {
            // Check if browser language is Bangla, though default is already BN
            if (typeof navigator !== "undefined" && navigator.language.startsWith("bn")) {
                setLanguageState("BN");
            }
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        if (language === "BN") {
            document.documentElement.classList.add("lang-bn");
            document.documentElement.setAttribute("lang", "bn");
        } else {
            document.documentElement.classList.remove("lang-bn");
            document.documentElement.setAttribute("lang", "en");
        }
    }, [language, mounted]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("preferred-language", lang);
    };

    const toggleLanguage = () => {
        const nextLang = language === "EN" ? "BN" : "EN";
        setLanguage(nextLang);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
