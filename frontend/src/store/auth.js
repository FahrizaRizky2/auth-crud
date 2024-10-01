import { create } from "zustand";
import axios from "axios";


const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set)=> ({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    message:null,

    signup: async (email, name, password) => {
        set({ isLoading: true, error:null });
        try {
            const res = await axios.post(`${API_URL}/signup`,{email, name, password});
            set({ user: res.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: error.res.data.message || "Error signing up", isLoading: false });
            throw error;
            
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error:null });
        try {
            const res = await axios.post(`${API_URL}/verify-email`,{ code });
            set({ user: res.data.user, isAuthenticated: true, isLoading: false });
            return res.data;
        } catch (error) {
            set({ error: error.res.data.message || "Error verifying Email", isLoading: false });
            throw error;
        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error:null });
        try {
            const res = await axios.post(`${API_URL}/login`,{ email, password });
            set({ isAuthenticated: true,
                user: res.data.user,
                error: null,
                isLoading: false
             });
        } catch (error) {
            set({ error: error.res.data.message || "Error Login", isLoading: false });
            throw error;
        }
    },
    logout: async () => {
        set({ isLoading: true, error:null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ isAuthenticated: false,
                user: null,
                error: null,
                isLoading: false
             });
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },
    checkAuth : async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const res = await axios.get(`${API_URL}/check-auth`);
            set({ user: res.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },
    forgotpassword: async (email) => {
        set({ error: null });
        try {
            const res = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: res.data.message });
        } catch (error) {
            set({ error: error.res.data.message || "Error sending reset password" });
            throw error;
        }
    },
    resetpassword: async (password, token) => {
        set({ error: null });
        try {
            const res = await axios.post(`${API_URL}/reset-password/${token}`, { password});
            set({ message: res.data.message });
        } catch (error) {
            set({ error: error.res.data.message || "Error reset password" });
            throw error;
        }
    }
}));
