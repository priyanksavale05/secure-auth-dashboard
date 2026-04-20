import { db } from "../firebase";
import { 
    collection, 
    doc, 
    setDoc, 
    addDoc, 
    getDoc, 
    updateDoc, 
    serverTimestamp, 
    query, 
    where, 
    orderBy, 
    limit, 
    getDocs 
} from "firebase/firestore";

// Get basic device/browser string
export const getDeviceInfo = () => {
    return navigator.userAgent || "Unknown Device";
};

// 1. Log Events
export const logActivity = async (uid, eventType, providerName) => {
    try {
        await addDoc(collection(db, "logs"), {
            uid,
            event: eventType, // 'LOGIN', 'LOGOUT', 'SESSION_CREATED'
            provider: providerName,
            device: getDeviceInfo(),
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
};

// 2. Suspicious Login Check
export const detectSuspiciousLogin = async (uid, currentDevice) => {
    try {
        // Query the last 2 logins
        const q = query(
            collection(db, "logs"), 
            where("uid", "==", uid), 
            where("event", "==", "LOGIN"),
            orderBy("timestamp", "desc"), 
            limit(2)
        );
        const snapshot = await getDocs(q);
        const logs = snapshot.docs.map(doc => doc.data());
        
        // If there's an older layout, compare devices
        if (logs.length > 1) {
            const previousDevice = logs[1].device;
            if (previousDevice !== currentDevice) {
                // Device mismatch, suspicious!
                return true; 
            }
        }
        return false;
    } catch (error) {
        console.error("Suspicious check failed:", error);
        return false;
    }
};

// 3. Update User Session data
export const saveUserRecord = async (user, provider) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const currentDevice = getDeviceInfo();

    let isSuspicious = false;

    if (!userSnap.exists()) {
        const userData = {
            uid: user.uid,
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'U')}&background=0f172a&color=fff`,
            role: "user", // Default Role
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            deviceInfo: currentDevice
        };
        await setDoc(userRef, userData);
        await logActivity(user.uid, 'SESSION_CREATED', provider);
    } else {
        // Evaluate logic for suspicious device on subsequent logins
        isSuspicious = await detectSuspiciousLogin(user.uid, currentDevice);

        await setDoc(userRef, { 
            lastLogin: serverTimestamp(),
            deviceInfo: currentDevice,
            isSuspicious: isSuspicious // Cache suspicious state to document
        }, { merge: true });
    }

    await logActivity(user.uid, 'LOGIN', provider);
    return isSuspicious;
};

// 4. Invalidate Sessions Globally
export const revokeAllSessions = async (uid) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            forceLogoutAt: serverTimestamp()
        });
        await logActivity(uid, 'ALL_SESSIONS_REVOKED', 'SYSTEM');
    } catch (error) {
        console.error("Failed to revoke sessions:", error);
        throw error;
    }
};
