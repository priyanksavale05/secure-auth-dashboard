import { AlertTriangle } from "lucide-react";

export const SuspiciousBanner = ({ isSuspicious }) => {
    if (!isSuspicious) return null;
    
    return (
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-8 rounded-r-md">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                        Suspicious Login Detected
                    </h3>
                    <div className="mt-1 text-sm text-red-700 dark:text-red-200">
                        <p>We noticed a login from an unrecognized device or browser. If this wasn't you, please revoke all sessions immediately to secure your account.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
