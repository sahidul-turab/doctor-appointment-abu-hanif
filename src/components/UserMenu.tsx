"use client";

import { signOut } from "next-auth/react";
import { LucideLogOut, LucideUser } from "lucide-react";

export default function UserMenu({ user }: { user: any }) {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600">
                    <LucideUser className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{user.name}</span>
            </div>
            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl transition-all"
                title="Sign Out"
            >
                <LucideLogOut className="w-5 h-5" />
            </button>
        </div>
    );
}
