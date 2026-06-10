"use client";

import type { ReactNode } from 'react';
import type { User } from '../types/college';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    error: string | null;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // Restore auth state from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('authUser');
        if (savedToken && savedUser && authService.verifyToken(savedToken)) {
            try {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
            }
            catch (err) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUser');
            }
        }
    }, []);
    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const { user: newUser, token: newToken } = await authService.login(email, password);
            setUser(newUser);
            setToken(newToken);
            localStorage.setItem('authToken', newToken);
            localStorage.setItem('authUser', JSON.stringify(newUser));
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed';
            setError(message);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const signup = useCallback(async (email, password, name) => {
        setIsLoading(true);
        setError(null);
        try {
            const { user: newUser, token: newToken } = await authService.signup({
                email,
                password,
                name,
            });
            setUser(newUser);
            setToken(newToken);
            localStorage.setItem('authToken', newToken);
            localStorage.setItem('authUser', JSON.stringify(newUser));
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Signup failed';
            setError(message);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        setError(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        authService.logout();
    }, []);
    return (_jsx(AuthContext.Provider, { value: {
            user,
            token,
            login,
            signup,
            logout,
            isLoading,
            error,
        }, children: children }));
};
