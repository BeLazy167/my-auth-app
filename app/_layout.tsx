import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { tokenCache } from "../utils/tokenCache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error(
        "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
}

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ClerkProvider
                tokenCache={tokenCache}
                publishableKey={publishableKey}
            >
                <ClerkLoaded>
                    <Slot />
                </ClerkLoaded>
            </ClerkProvider>
        </SafeAreaProvider>
    );
}
