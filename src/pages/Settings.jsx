import { Settings as SettingsIcon } from "lucide-react";

export const Settings = () => {
    return (
        <div className="animate-fade-in max-w-7xl mx-auto flex flex-col items-center justify-center p-20 text-center">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-full mb-6">
                <SettingsIcon size={48} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-primary dark:text-white mb-2">Platform Configuration</h1>
            <p className="text-textMuted dark:text-slate-400 max-w-md">
                Your environment variables and organizational access parameters are structurally sound. Dynamic settings modifications are locked during this session.
            </p>
        </div>
    );
};
