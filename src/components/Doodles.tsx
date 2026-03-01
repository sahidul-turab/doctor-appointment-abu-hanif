"use client";

import { LucidePlus, LucideStethoscope, LucideHeart, LucideBriefcaseMedical, LucideActivity } from "lucide-react";
import { clsx } from "clsx";

export const DotGrid = ({ className }: { className?: string }) => (
    <div className={clsx("grid grid-cols-5 gap-2 opacity-20", className)}>
        {[...Array(10)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-current rounded-full" />
        ))}
    </div>
);

export const FloatingPlus = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
    <div className={clsx("absolute animate-bounce opacity-20", className)} style={{ animationDelay: `${delay}s` }}>
        <LucidePlus className="w-6 h-6" />
    </div>
);

export const MedicalDoodle = ({ icon: Icon, className, delay = 0 }: { icon: any, className?: string, delay?: number }) => (
    <div className={clsx("absolute opacity-10 animate-pulse", className)} style={{ animationDelay: `${delay}s` }}>
        <Icon className="w-12 h-12" />
    </div>
);

export const PortraitDoodle = () => (
    <div className="absolute inset-0 -z-10 animate-in fade-in zoom-in duration-1000 delay-300">
        <svg viewBox="0 0 500 500" className="w-full h-full opacity-40 fill-none stroke-[var(--primary)] stroke-[2] stroke-dasharray-[10_10]">
            <path
                d="M450,250 Q450,400 300,450 Q150,500 50,350 Q-50,200 100,100 Q250,0 400,100 Q450,150 450,250"
                className="animate-[spin_60s_linear_infinite]"
                style={{ transformOrigin: 'center' }}
            />
        </svg>
    </div>
);
