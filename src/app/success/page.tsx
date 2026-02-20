import { LucideCheckCircle, LucideCalendar, LucideArrowRight } from "lucide-react";

export default function SuccessPage({ searchParams }: { searchParams: { id?: string } }) {
    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="max-w-md w-full px-6 text-center animate-in zoom-in-95 duration-700">
                <div className="w-24 h-24 bg-green-500 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-500/20">
                    <LucideCheckCircle className="w-12 h-12 text-white" />
                </div>

                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Payment Success!</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-12">
                    Your appointment has been confirmed. A receipt and consultation link will be sent to your email.
                </p>

                <div className="space-y-4">
                    <a
                        href="/dashboard"
                        className="flex items-center justify-center w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-xl"
                    >
                        Go to Dashboard <LucideCalendar className="ml-2 w-5 h-5" />
                    </a>
                    <a
                        href="/"
                        className="flex items-center justify-center w-full py-4 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold hover:bg-slate-50 transition-colors"
                    >
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
