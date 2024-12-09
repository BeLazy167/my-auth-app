import { useState } from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

export default function SignInScreen() {
    const router = useRouter();
    const { signIn, setActive } = useSignIn();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignIn() {
        if (!signIn) return;
        try {
            const result = await signIn.create({ identifier: email, password });
            if (result.status === "complete" && setActive) {
                await setActive({ session: result.createdSessionId });
                router.replace("/(tabs)");
            }
        } catch (err: any) {
            alert("Invalid email or password");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
                <Text style={styles.link}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
        color: "#1a1a1a",
    },
    input: {
        borderWidth: 1,
        borderColor: "#e1e1e1",
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: "#f5f5f5",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    link: {
        color: "#007AFF",
        textAlign: "center",
        marginTop: 16,
        fontSize: 15,
    },
});
