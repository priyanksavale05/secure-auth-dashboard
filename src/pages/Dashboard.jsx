import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Users, MousePointerClick, Clock, ShieldCheck, Activity } from "lucide-react";
import { UserProfile } from "../components/UserProfile";
import { SuspiciousBanner } from "../components/SuspiciousBanner";
import { Loader } from "../components/Loader";
import { db } from "../firebase";
import { collection, query, where, getDocs, getCountFromServer, orderBy, limit } from "firebase/firestore";

export const Dashboard = () => {
    const { user } = useAuth();
    const [loadingData, setLoadingData] = useState(true);
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, activeLogs: 0, score: "100%" });

    useEffect(() => {
        const fetchDashboardData = async () => {
             if (!user) return;
             setLoadingData(true);
             try {
                 if (user.role === "admin") {
                     // GLOBAL ADMIN VIEW
                     const usersSnap = await getCountFromServer(collection(db, "users"));
                     const logsSnap = await getDocs(query(collection(db, "logs"), orderBy("timestamp", "desc"), limit(10)));
                     
                     setStats({ 
                         totalUsers: usersSnap.data().count, 
                         activeLogs: logsSnap.size,
                         score: "100%" 
                     });
                     setLogs(logsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
                 } else {
                     // PERSONAL USER VIEW
                     const logsSnap = await getDocs(query(
                         collection(db, "logs"), 
                         where("uid", "==", user.uid)
                     ));
                     
                     let userLogs = logsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
                     userLogs.sort((a,b) => (b.timestamp?.toMillis() || Date.now()) - (a.timestamp?.toMillis() || Date.now()));
                     userLogs = userLogs.slice(0, 10);
                     
                     setStats({ 
                         totalUsers: 1, // Self
                         activeLogs: userLogs.length,
                         score: user.isSuspicious ? "0%" : "100%" 
                     });
                     setLogs(userLogs);
                 }
             } catch(error) { 
                 console.error("Dashboard Fetch Error", error);
                 setStats({ totalUsers: "Error", activeLogs: "Error", score: "Error" });
                 toast.error("Database Locked: " + error.message, { duration: 6000 });
             } finally {
                 setLoadingData(false);
             }
        };

        fetchDashboardData();
    }, [user]);

    const metrics = [
        { title: user?.role === 'admin' ? "Total Global Users" : "Registered Accounts", value: stats.totalUsers, change: user?.role === 'admin' ? "+12%" : "N/A", trend: "up", icon: <Users size={20} className="text-blue-600 dark:text-blue-400" />, bg: "bg-blue-100 dark:bg-blue-900/30" },
        { title: "Monitored Events", value: stats.activeLogs, change: "+New", trend: "up", icon: <MousePointerClick size={20} className="text-green-600 dark:text-green-400" />, bg: "bg-green-100 dark:bg-green-900/30" },
        { title: "Avg Session Time", value: "8m 42s", change: "-2%", trend: "down", icon: <Clock size={20} className="text-purple-600 dark:text-purple-400" />, bg: "bg-purple-100 dark:bg-purple-900/30" },
        { title: "Security Score", value: stats.score, change: stats.score === "100%" ? "Optimal" : "Alert", trend: stats.score === "100%" ? "neutral" : "down", icon: <ShieldCheck size={20} className={stats.score === "100%" ? "text-indigo-600 dark:text-indigo-400" : "text-red-600 dark:text-red-400"} />, bg: stats.score === "100%" ? "bg-indigo-100 dark:bg-indigo-900/30" : "bg-red-100 dark:bg-red-900/30" },
    ];

    if (loadingData) {
        return <div className="h-full w-full flex items-center justify-center p-20"><Loader size={40} className="text-primary dark:text-white" /></div>;
    }

    return (
        <div className="animate-fade-in max-w-7xl mx-auto">
            
            <SuspiciousBanner isSuspicious={user?.isSuspicious} />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-primary dark:text-white mb-1 transition-colors">
                    {user?.role === 'admin' ? "Global Administrative Dashboard" : "Personal Security Dashboard"}
                </h1>
                <p className="text-sm text-textMuted dark:text-slate-400">Welcome back, {user?.displayName || "User"}. Here is your live telemetry.</p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {metrics.map((metric, idx) => (
                    <div key={idx} className="pro-card dark:bg-slate-800 dark:border-slate-700 p-5 shadow-sm transition-colors duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${metric.bg}`}>
                                {metric.icon}
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                metric.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                metric.trend === 'down' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300'
                            }`}>
                                {metric.change}
                            </span>
                        </div>
                        <h3 className="text-sm font-medium text-textMuted dark:text-slate-400 mb-1">{metric.title}</h3>
                        <p className="text-2xl font-bold text-primary dark:text-white">{metric.value}</p>
                    </div>
                ))}
            </div>

            {/* Main Content Modules */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* UserProfile Modular Component */}
                <div className="col-span-1">
                    <UserProfile user={user} />
                </div>

                <div className="col-span-1 xl:col-span-2 space-y-6 flex flex-col">
                    <div className="pro-card dark:bg-slate-800 dark:border-slate-700 p-6 flex-1 shadow-sm transition-colors duration-300">
                        <div className="flex items-center justify-between mb-4 border-b border-border dark:border-slate-700 pb-4">
                            <h3 className="text-lg font-semibold text-primary dark:text-white flex items-center gap-2">
                                <Activity size={18} className="text-textMuted dark:text-slate-400" />
                                Live Security Telemetry
                            </h3>
                        </div>
                        
                        <div className="overflow-x-auto">
                            {logs.length === 0 ? (
                                <p className="text-sm text-textMuted dark:text-slate-400 py-4 text-center">No telemetry data recorded yet.</p>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-textMuted dark:text-slate-400 bg-gray-50 dark:bg-slate-900/50 border-y border-border dark:border-slate-700">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Event Vector</th>
                                            {user?.role === 'admin' && <th className="px-4 py-3 font-medium">Target ID</th>}
                                            <th className="px-4 py-3 font-medium">Device Footprint</th>
                                            <th className="px-4 py-3 font-medium">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs.map((log) => (
                                            <tr key={log.id} className="border-b border-border dark:border-slate-700">
                                                <td className="px-4 py-3 flex items-center gap-2 dark:text-gray-200">
                                                    <div className={`w-2 h-2 rounded-full pt-1 ${
                                                        log.event === 'LOGIN' ? 'bg-green-500' : 
                                                        log.event === 'LOGOUT' ? 'bg-gray-500' :
                                                        log.event === 'ALL_SESSIONS_REVOKED' ? 'bg-red-500' : 'bg-blue-500'
                                                    }`}></div>
                                                    {log.event} ({log.provider})
                                                </td>
                                                {user?.role === 'admin' && (
                                                    <td className="px-4 py-3 text-textMuted dark:text-slate-400 truncate max-w-[100px]">
                                                        {log.uid}
                                                    </td>
                                                )}
                                                <td className="px-4 py-3 text-textMuted dark:text-slate-400 truncate max-w-[200px]" title={log.device}>
                                                    {log.device}
                                                </td>
                                                <td className="px-4 py-3 text-textMuted dark:text-slate-400">
                                                    {log.timestamp ? new Date(log.timestamp.toMillis()).toLocaleString() : "Just now"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
