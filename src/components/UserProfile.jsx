import { useState } from "react";
import { Key, ShieldCheck, Calendar, ShieldAlert } from "lucide-react";
import { Button } from "./Button";
import { revokeAllSessions } from "../services/firestore";
import toast from "react-hot-toast";

export const UserProfile = ({ user }) => {
    const [revoking, setRevoking] = useState(false);

    if (!user) return null;

    const displayName = user.displayName || "User";
    const email = user.email || "No email provided";
    const photoURL = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0f172a&color=fff`;

    const handleRevokeSessions = async () => {
        if (!confirm("Are you sure you want to log out of ALL devices? This will invalidate your active session entirely.")) return;
        
        setRevoking(true);
        try {
            await revokeAllSessions(user.uid);
            toast.success("Security Command: All sessions logically destroyed.");
        } catch (error) {
            toast.error("Failed to revoke sessions.");
        } finally {
            setRevoking(false);
        }
    };

    return (
        <div className="pro-card dark:bg-slate-800 dark:border-slate-700 p-6 border-t-4 border-t-primary dark:border-t-blue-500 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border dark:border-slate-700">
                <img 
                    src={photoURL} 
                    alt={displayName} 
                    className="w-16 h-16 rounded-full border border-border dark:border-slate-600 object-cover"
                    referrerPolicy="no-referrer"
                />
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-primary dark:text-white">{displayName}</h2>
                        {user.role === 'admin' && (
                            <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                Admin
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-textMuted dark:text-slate-400">{email}</p>
                </div>
            </div>
            
            <div className="space-y-4 mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted dark:text-slate-500 mb-2">Account Capabilities</h3>
                
                <div className="flex items-start gap-3">
                    <Key size={16} className="text-textMuted dark:text-slate-400 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-primary dark:text-gray-200">User Sequence ID</p>
                        <p className="text-xs text-textMuted dark:text-slate-400 font-mono bg-gray-100 dark:bg-slate-900 px-1 py-0.5 rounded mt-1 break-all">
                            {user.uid}
                        </p>
                    </div>
                </div>
                
                <div className="flex items-start gap-3">
                    <ShieldCheck size={16} className="text-textMuted dark:text-slate-400 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-primary dark:text-gray-200">Security Clearance</p>
                        <p className="text-xs text-textMuted dark:text-slate-400 flex items-center gap-1 mt-1">
                            <span className={`w-2 h-2 rounded-full ${user.emailVerified ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                            {user.emailVerified ? 'Verified Account' : 'Unverified (Restricted)'}
                        </p>
                    </div>
                </div>
                
                <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-textMuted dark:text-slate-400 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-primary dark:text-gray-200">Last Telemetry Login</p>
                        <p className="text-xs text-textMuted dark:text-slate-400 mt-1">
                            {new Date(user.metadata.lastSignInTime).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <Button 
                variant="danger" 
                onClick={handleRevokeSessions} 
                isLoading={revoking}
                className="w-full flex justify-center !py-2 text-sm"
            >
                <ShieldAlert size={16} />
                Logout from All Devices
            </Button>
        </div>
    );
};
