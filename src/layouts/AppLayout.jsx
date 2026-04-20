import toast from "react-hot-toast";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { 
    LayoutDashboard, 
    Users, 
    Settings, 
    Bell, 
    Search,
    LogOut,
    Menu,
    Activity,
    Moon,
    Sun
} from "lucide-react";
import { useState } from "react";

export const AppLayout = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const displayName = user?.displayName || "User";
    const photoURL = user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0f172a&color=fff`;

    const location = useLocation();

    const navItems = [
        { label: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
        { label: "Analytics", path: "/analytics", icon: <Activity size={20} /> },
        { label: "Users", path: "/users", icon: <Users size={20} /> },
        { label: "Settings", path: "/settings", icon: <Settings size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-slate-900 flex transition-colors duration-300">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex w-64 flex-col bg-surface dark:bg-slate-800 border-r border-border dark:border-slate-700 h-screen sticky top-0 transition-colors duration-300">
                <div className="h-16 flex items-center px-6 border-b border-border dark:border-slate-700">
                    <span className="text-xl font-bold text-primary dark:text-white tracking-tight flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary dark:bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                            A
                        </div>
                        AcmeApp
                    </span>
                </div>
                
                <nav className="flex-1 py-4 px-3 space-y-1">
                    {navItems.map((item, i) => {
                        const isActive = location.pathname === item.path;
                        return (
                        <Link
                            key={i}
                            to={item.path}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                                isActive 
                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" 
                                    : "text-textMuted dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-white"
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    )})}
                </nav>

                <div className="p-4 border-t border-border dark:border-slate-700">
                    <button 
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-textMuted dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay (Simplified) */}
            {isSidebarOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-surface dark:bg-slate-800 border-b border-border dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <button 
                            className="md:hidden p-2 text-textMuted dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <Menu size={24} />
                        </button>
                        
                        {/* Search Bar */}
                        <div className="hidden sm:flex items-center relative">
                            <Search className="absolute left-3 text-textMuted dark:text-slate-400" size={18} />
                            <input 
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 border border-border dark:border-slate-700 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64 bg-gray-50/50 dark:bg-slate-900 dark:text-white transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        
                        <button 
                            onClick={toggleTheme}
                            className="p-2 text-textMuted dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-full transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button 
                            onClick={() => toast.success("System: No critical notifications to display.")}
                            className="relative p-2 text-textMuted dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-full transition-colors"
                        >
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-surface dark:border-slate-800"></span>
                        </button>
                        
                        <div className="h-8 w-[1px] bg-border dark:bg-slate-700 mx-1"></div>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-medium text-primary dark:text-white leading-none mb-1">{displayName}</p>
                                <p className="text-xs text-textMuted dark:text-slate-400 leading-none">Admin</p>
                            </div>
                            <img 
                                src={photoURL} 
                                alt={displayName}
                                referrerPolicy="no-referrer"
                                className="w-9 h-9 rounded-full border border-border dark:border-slate-600 cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-1 dark:hover:ring-offset-slate-800 transition-all"
                            />
                        </div>
                    </div>
                </header>

                {/* Page Content Viewport */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background dark:bg-slate-900 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};