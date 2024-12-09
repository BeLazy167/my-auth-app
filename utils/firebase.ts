// Firebase initialization will go here
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

type UserProfile = {
    userId: string;
    username: string;
    email: string;
    profileImage: string;
};

// Prevent multiple Firebase initializations
export const app = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApps()[0];
export const db = getFirestore(app);

// User profile management functions
export async function updateUserProfile(userProfile: UserProfile) {
    const userRef = doc(db, "users", userProfile.userId);
    await setDoc(userRef, userProfile, { merge: true });
}

export async function getUserProfile(
    userId: string
): Promise<UserProfile | null> {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
}
