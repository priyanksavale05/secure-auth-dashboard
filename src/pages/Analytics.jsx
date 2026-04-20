import { Activity } from "lucide-react";

export const Analytics = () => {
    return (
        <div className="animate-fade-in max-w-7xl mx-auto flex flex-col items-center justify-center p-20 text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full mb-6">
                <Activity size={48} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-primary dark:text-white mb-2">Deep Analytics Engine</h1>
            <p className="text-textMuted dark:text-slate-400 max-w-md">
                The global analytics and telemetry processing platform is currently being aggregated. Please check back after the next database cycle.
            </p>
        </div>
    );
};
