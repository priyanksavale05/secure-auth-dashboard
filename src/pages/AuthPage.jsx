import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CheckCircle2 } from "lucide-react";
import { LoginCard } from "../components/LoginCard";

export const AuthPage = () => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen w-full flex bg-background dark:bg-slate-900 transition-colors duration-300">
            
            {/* LEFT PANEL - Branding / Info */}
            <div className="hidden lg:flex w-1/2 bg-[#0a0f1c] flex-col justify-between p-12 text-white relative overflow-hidden transition-colors duration-300">
                {/* Dynamic SaaS Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-black to-black z-0"></div>
                <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                {/* Decorative Glowing Elements */}
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] rounded flex items-center justify-center font-bold text-xl tracking-tighter">
                        A
                    </div>
                    <span className="font-bold text-2xl tracking-tight">AcmeSec</span>
                </div>

                <div className="relative z-10 max-w-lg mt-auto mb-20 animate-slide-up">
                    <div className="inline-block px-3 py-1 bg-blue-900/30 border border-blue-500/30 text-blue-400 rounded-full text-xs font-semibold tracking-wider mb-6">
                        ENTERPRISE IDENTITY PLATFORM
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-[1.15] tracking-tight">
                        Secure your infrastructure with<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Context-Aware AI.</span>
                    </h1>
                    <p className="text-lg text-slate-400 mb-8 max-w-md leading-relaxed">
                        Deploy zero-trust architecture globally. Monitor real-time telemetry, detect suspicious devices, and manage access hierarchies instantly.
                    </p>
                    
                    <div className="space-y-5">
                        <div className="flex items-start gap-4 text-slate-300">
                            <div className="mt-1 bg-blue-900/50 p-1 rounded-full"><CheckCircle2 className="text-blue-400" size={16} /></div>
                            <div>
                                <h3 className="font-semibold text-white">Algorithmic Device Tracking</h3>
                                <p className="text-sm text-slate-500 mt-1">Automatically flags anomalous authentication vectors.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 text-slate-300">
                            <div className="mt-1 bg-indigo-900/50 p-1 rounded-full"><CheckCircle2 className="text-indigo-400" size={16} /></div>
                            <div>
                                <h3 className="font-semibold text-white">Global Session Governance</h3>
                                <p className="text-sm text-slate-500 mt-1">Instantly sever cryptographic tokens across all borders.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-slate-600 font-medium tracking-wide">
                    &copy; {new Date().getFullYear()} AcmeSec Systems Corporation
                </div>
            </div>

            {/* RIGHT PANEL - Login Card */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <LoginCard />
            </div>
            
        </div>
    );
};
