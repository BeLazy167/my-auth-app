import { Redirect, Slot } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
    const { isSignedIn } = useAuth();

    // If they're signed in, send them to the main app
    if (isSignedIn) {
        return <Redirect href="/(tabs)" />;
    }

    // Otherwise, show auth screens
    return <Slot />;
}
