import { LogOut, LayoutTemplate } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="border-b border-border bg-surface sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2 text-primary">
                        <LayoutTemplate size={24} strokeWidth={2.5} />
                        <span className="font-semibold text-lg tracking-tight">
                            Acme Auth
                        </span>
                    </div>

                    {user && (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium text-textMuted hover:text-primary"
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Sign Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
