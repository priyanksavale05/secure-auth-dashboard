import { useState } from "react";
import toast from "react-hot-toast";
import { LayoutTemplate } from "lucide-react";
import { Button } from "./Button";
import { GoogleButton } from "./GoogleButton";
import { useAuth } from "../context/AuthContext";

export const LoginCard = () => {
    const { loginWithGoogle, loginWithEmail, signupWithEmail, resetPassword } = useAuth();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) return toast.error("Email must not be empty");
        if (!password) return toast.error("Password must not be empty");
        if (isSignUp && !name) return toast.error("Full Name is required for signup");
        
        setIsLoggingIn(true);
        try {
            if (isSignUp) {
                await signupWithEmail(name, email, password);
            } else {
                await loginWithEmail(email, password);
            }
        } catch (error) {
            // Error managed by context toasts
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) return toast.error("Please enter your email address first");
        setIsLoggingIn(true);
        try {
            await resetPassword(email);
        } catch(e) {
            // Managed via toast
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleGoogleAuth = async () => {
        setIsLoggingIn(true);
        try {
            await loginWithGoogle();
        } catch (error) {
            // Managed via toast
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center p-6 sm:p-12 animate-fade-in relative dark:bg-slate-900 min-h-screen lg:min-h-0">
            {/* Mobile Logo Fallback */}
            <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2 text-primary dark:text-white">
                 <LayoutTemplate size={24} strokeWidth={2.5} />
                 <span className="font-semibold text-lg tracking-tight">Acme Auth</span>
            </div>

            <div className="w-full max-w-[440px] flex flex-col pt-8 lg:pt-0">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-primary dark:text-white mb-2">
                        {isSignUp ? "Sign Up" : "Welcome Back"}
                    </h2>
                    <p className="text-textMuted dark:text-slate-400">
                        {isSignUp 
                            ? "Create your account to get started." 
                            : "Sign in to your account"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                    {isSignUp && (
                        <div>
                            <label className="block text-sm font-medium text-text dark:text-gray-200 mb-1">Full Name</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-text dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                required={isSignUp}
                            />
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium text-text dark:text-gray-200 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-text dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-medium text-text dark:text-gray-200">Password</label>
                            {!isSignUp && (
                                <button type="button" onClick={handleForgotPassword} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                                    Forgot password?
                                </button>
                            )}
                        </div>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-slate-700 bg-white dark:bg-slate-800 text-text dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            required
                        />
                    </div>

                    <Button type="submit" isLoading={isLoggingIn} className="mt-2 text-white">
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                </form>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-border dark:bg-slate-700"></div>
                    <span className="text-sm text-textMuted dark:text-slate-400 font-medium uppercase tracking-wider">Or</span>
                    <div className="flex-1 h-px bg-border dark:bg-slate-700"></div>
                </div>

                <GoogleButton onClick={handleGoogleAuth} isLoading={isLoggingIn} />

                <p className="mt-8 text-center text-sm text-textMuted dark:text-slate-400">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button 
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    );
};
