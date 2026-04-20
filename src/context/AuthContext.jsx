import { createContext, useContext, useEffect, useState } from "react";
import { 
    onAuthStateChanged, 
    signInWithPopup, 
    signOut,
    setPersistence,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, provider, db } from "../firebase";
import toast from "react-hot-toast";
import { saveUserRecord, logActivity } from "../services/firestore";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser) {
                    // IMMEDIATELY unblock UI for Snappiness!
                    setUser(currentUser);
                    setLoading(false);
                    
                    // Fetch deep user model in the Background
                    (async () => {
                        try {
                            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                            if (userDoc.exists()) {
                                const data = userDoc.data();
                                const lastLogin = data.lastLogin?.toMillis() || Date.now();
                                const forceLogoutAt = data.forceLogoutAt?.toMillis() || 0;

                                if (forceLogoutAt > lastLogin) {
                                    await signOut(auth);
                                    setUser(null);
                                    toast.error("Your session was revoked.");
                                    return;
                                }

                                setUser({
                                     uid: currentUser.uid,
                                     email: currentUser.email,
                                     displayName: currentUser.displayName,
                                     photoURL: currentUser.photoURL,
                                     emailVerified: currentUser.emailVerified,
                                     metadata: currentUser.metadata,
                                     role: data.role || 'user',
                                     isSuspicious: data.isSuspicious
                                });
                            }
                        } catch (bgError) {
                            console.error("Background User Fetch Error:", bgError);
                        }
                    })();
                } else {
                    setUser(null);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Auth validation failed:", error);
                setUser(null);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const loginWithGoogle = async () => {
        try {
            console.log("Login started");
            await setPersistence(auth, browserLocalPersistence);
            const result = await signInWithPopup(auth, provider);
            console.log("Login success");
            
            toast.success(`Welcome, ${result.user.displayName}!`);
            
            // Background Firestore execution
            (async () => {
                try {
                    console.log("Firestore update started");
                    const isSuspicious = await saveUserRecord(result.user, "google.com");
                    if(isSuspicious) {
                        toast.error("New device detected! Flagging as suspicious.");
                    }
                    console.log("Firestore update complete");
                } catch (err) {
                    console.error("Firestore background update failed", err);
                }
            })();
            
            return result;
        } catch (error) {
            console.error("Login Error:", error);
            if (error.code === 'auth/popup-closed-by-user') {
                toast.error("Sign-in popup was closed before completion.");
            } else {
                toast.error("Failed to sign in with Google.");
            }
            throw error;
        }
    };

    const loginWithEmail = async (email, password) => {
        try {
            console.log("Login started");
            await setPersistence(auth, browserLocalPersistence);
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login success");
            
            if (!result.user.emailVerified) {
                toast.error("Please verify your email address. Check your inbox.");
            } else {
                toast.success("Successfully logged in!");
            }
            
            // Background update
            (async () => {
                try {
                    console.log("Firestore update started");
                    const isSuspicious = await saveUserRecord(result.user, "password");
                    if(isSuspicious) toast.error("New device detected!");
                    console.log("Firestore update complete");
                } catch (e) {
                    console.error(e);
                }
            })();
            
            return result;
        } catch (error) {
            console.error("Email Login Error:", error);
            if (error.code === 'auth/user-not-found') {
                toast.error("No account found");
            } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                toast.error("Invalid email or password");
            } else if (error.code === 'auth/operation-not-allowed') {
                toast.error("Email/Password login is not enabled. Please enable it in Firebase Console or use Google Sign-In.", { duration: 6000 });
            } else {
                toast.error("Something went wrong");
            }
            throw error;
        }
    };

    const signupWithEmail = async (name, email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name });
            result.user.displayName = name; 
            
            await sendEmailVerification(result.user);
            toast.success("Account created successfully");

            (async () => {
                try {
                    await saveUserRecord(result.user, "password");
                } catch(e) {}
            })();
            
            return result;
        } catch (error) {
            console.error("Email Signup Error:", error);
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email already registered");
            } else if (error.code === 'auth/operation-not-allowed') {
                toast.error("Email/Password login is not enabled. Please enable it in Firebase Console or use Google Sign-In.", { duration: 6000 });
            } else {
                toast.error("Something went wrong");
            }
            throw error;
        }
    };

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent. Check your inbox");
        } catch (error) {
            console.error("Password Reset Error:", error);
            if (error.code === 'auth/user-not-found') {
                toast.error("No account found");
            } else {
                toast.error("Something went wrong");
            }
            throw error;
        }
    };

    const logout = async () => {
        try {
            if(user) {
                // Fire and forget log activity to prevent Firebase Permission Rules from blocking sign-out
                logActivity(user.uid, 'LOGOUT', 'SYSTEM').catch(e => console.error("Ignoring log failure:", e));
            }
            await signOut(auth);
            toast.success("Successfully logged out!");
        } catch (error) {
            console.error("Logout Error:", error);
            toast.error("Failed to log out.");
            throw error;
        }
    };

    const value = {
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        resetPassword,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
