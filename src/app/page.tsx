"use client";

import { LucideShieldCheck, LucideClock, LucideMapPin, LucideVideo, LucidePhone, LucideMail, LucideAward, LucideActivity } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                            <div className="inline-flex items-center px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-bold mb-8 border border-primary-200 dark:border-primary-800">
                                <LucideAward className="w-4 h-4 mr-2" />
                                Specialist in Medical Sciences
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.95] mb-6 md:mb-8 tracking-tighter">
                                Excellence in <br className="hidden md:block" />
                                <span className="gradient-text">Human Care.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-8 md:mb-10 max-w-lg leading-relaxed font-medium">
                                Dedicating decades of clinical expertise to your health. Dr. Abu Hanif provides personalized medical consultations with a focus on precision, empathy, and long-term wellness.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <a href="/book" className="w-full sm:w-auto px-10 py-5 bg-primary-600 text-white rounded-2xl font-black hover:bg-primary-700 transform hover:-translate-y-1 transition-all shadow-2xl shadow-primary-500/30 text-center">
                                    Start Consultation
                                </a>
                                <div className="w-full sm:w-auto flex items-center justify-center space-x-4 px-6 py-4 glass rounded-2xl border border-slate-200 dark:border-slate-800">
                                    <div className="relative">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute inset-0" />
                                        <div className="w-3 h-3 bg-green-500 rounded-full relative" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Live: Accepting Patients</span>
                                </div>
                            </div>

                            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-100 dark:border-slate-800 pt-10">
                                <div>
                                    <div className="text-2xl font-black text-slate-900 dark:text-white">15+</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Years Experience</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-slate-900 dark:text-white">2k+</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Happy Patients</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-slate-900 dark:text-white">99%</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Success Rate</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
                            {/* Digital Visiting Card Container */}
                            <div className="relative z-10 w-full bg-slate-100 dark:bg-slate-900 rounded-[3rem] overflow-hidden border-[6px] border-white/20 dark:border-slate-800 shadow-[0_64px_96px_-16px_rgba(0,0,0,0.5)] group">
                                {/* Top Image Section (Half Height) */}
                                <div className="h-[50%] relative overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop"
                                        alt="Dr. Abu Hanif"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                                </div>

                                {/* Content Section (Visiting Card Style) */}
                                <div className="p-8 pb-10 flex flex-col items-center text-center">
                                    <div className="-mt-16 relative z-20 mb-6 group-hover:-translate-y-2 transition-transform duration-500">
                                        <div className="px-6 py-2 bg-primary-600 rounded-full shadow-2xl shadow-primary-500/40">
                                            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Consultant Physician</span>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">Dr. Abu Hanif</h3>
                                    <p className="text-sm font-black text-primary-600 dark:text-primary-500 uppercase tracking-widest mb-4">
                                        MBBS (MMC), BCS (Health), D-Card (BSMMU)
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 w-full">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Specialty</div>
                                            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Medicine & Cardiology</div>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Reg No</div>
                                            <div className="text-[11px] font-bold text-emerald-500">BMDC A-66955</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Card Accent */}
                            <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary-600/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-600/10 rounded-full blur-3xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Our Specialized Services</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Providing high-end medical solutions for every patient's needs.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: LucideVideo, title: "Telemedicine", desc: "Consult from your home with encrypted video calls and digital prescriptions.", color: "text-blue-500" },
                            { icon: LucideMapPin, title: "Clinic Visit", desc: "Visit our state-of-the-art chamber for thorough physical diagnostic checks.", color: "text-emerald-500" },
                            { icon: LucideClock, title: "Priority Care", desc: "Get priority emergency slots with minimal waiting time for acute cases.", color: "text-rose-500" }
                        ].map((s, idx) => (
                            <div key={idx} className="group p-10 glass rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-primary-500/50 transition-all hover:scale-[1.02] card-shadow">
                                <div className={`w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-8 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-colors`}>
                                    <s.icon className={`w-8 h-8 ${s.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{s.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{s.desc}</p>
                                <a href="/book" className="inline-flex items-center text-sm font-black text-primary-600 hover:text-primary-700">
                                    Book Slot <LucideArrowRight className="ml-2 w-4 h-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

function LucideArrowRight(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
    )
}
