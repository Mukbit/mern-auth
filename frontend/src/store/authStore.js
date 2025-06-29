import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name, recaptchaToken) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name, recaptchaToken });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            console.error("Signup Error:", error.response?.data || error.message);
            set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
            console.error("Logout Error:", error.response?.data || error.message);
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({
                user: response.data.user,
                isAuthenticated: false,
                isLoading: false
            });
            return response.data;
        } catch (error) {
            console.error("Verify Email Error:", error.response?.data || error.message);
            set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            console.error("Check Auth Error:", error.response?.data || error.message);
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            console.error("Forgot Password Error:", error.response?.data || error.message);
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error sending reset password email",
            });
            throw error;
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            console.error("Reset Password Error:", error.response?.data || error.message);
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error resetting password",
            });
            throw error;
        }
    },

    changePassword: async (currentPassword, newPassword) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/change-password`, { currentPassword, newPassword });
            console.log("Change Password Response:", response.data);
            // Log out the user after successful password change
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false, message: response.data.message });
            return response.data;
        } catch (error) {
            console.error("Change Password Error:", error.response?.data || error.message);
            set({
                isLoading: false,
                error: error.response?.data?.message || "Failed to change password. Please try again.",
            });
            throw error;
        }
    },
}));