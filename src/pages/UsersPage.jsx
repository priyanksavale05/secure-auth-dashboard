import { Users } from "lucide-react";

export const UsersPage = () => {
    return (
        <div className="animate-fade-in max-w-7xl mx-auto flex flex-col items-center justify-center p-20 text-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-6">
                <Users size={48} className="text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-primary dark:text-white mb-2">User Directory Shell</h1>
            <p className="text-textMuted dark:text-slate-400 max-w-md">
                This module connects directly to the Auth provider user mapping. This enterprise user management directory will be fully active soon.
            </p>
        </div>
    );
};
