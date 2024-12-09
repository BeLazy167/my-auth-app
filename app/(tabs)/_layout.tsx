import { Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function TabLayout() {
    const { isSignedIn, isLoaded } = useAuth();

    // Wait for authentication to load
    if (!isLoaded) {
        return null;
    }

    // If user is not signed in, redirect to sign-in page
    if (!isSignedIn) {
        return <Redirect href="/sign-in" />;
    }

    return (
      
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: "Tab Two",
                }}
            />
        </Tabs>
    );
}
