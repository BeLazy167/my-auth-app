import { useState } from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { updateUserProfile } from "@/utils/firebase";
import { useFirebaseUser } from "@/utils/useFirebaseUser";

export default function SignUpScreen() {
    const { signUp, setActive } = useSignUp();
    const { signIn: signInToFirebase } = useFirebaseUser();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [pending, setPending] = useState(false);

    async function handleSignUp() {
        try {
            await signUp?.create({ username, emailAddress: email, password });
            await signUp?.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            setPending(true);
        } catch (err) {
            alert("Error creating account");
        }
    }

    async function handleVerify() {
        if (!signUp || !setActive) return;
        try {
            const result = await signUp.attemptEmailAddressVerification({
                code,
            });
            if (result?.status === "complete") {
                await signInToFirebase();
                await updateUserProfile({
                    userId: result.createdUserId!,
                    username,
                    email,
                    profileImage: "",
                });
                await setActive({ session: result.createdSessionId });
                router.replace("/(tabs)");
            }
        } catch (err) {
            alert("Invalid verification code");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {pending ? "Check your email" : "Create Account"}
            </Text>
            {!pending ? (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Verification Code"
                        value={code}
                        onChangeText={setCode}
                        keyboardType="number-pad"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleVerify}
                    >
                        <Text style={styles.buttonText}>Verify Email</Text>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
                <Text style={styles.link}>
                    Already have an account? Sign in
                </Text>
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
