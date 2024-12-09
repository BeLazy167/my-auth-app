// Secure token storage logic will go here

import * as SecureStore from "expo-secure-store";

export const tokenCache = {
    async getToken(key: string) {
        try {
            const item = await SecureStore.getItemAsync(key);
            // A little logging to help with debugging
            if (item) {
                console.log(`${key} was used 🔐`);
            } else {
                console.log("No values stored under key: " + key);
            }
            return item;
        } catch (error) {
            console.error("SecureStore get item error: ", error);
            // If something goes wrong, better clear that token
            await SecureStore.deleteItemAsync(key);
            return null;
        }
    },

    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (err) {
            // Silent fail but you might want to log this in production
            return;
        }
    },
};
