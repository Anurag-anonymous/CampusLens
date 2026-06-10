"use client";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Toast } from '../components/ui/Toast';
export const AuthPage = () => {
    const router = useRouter();
    const { login, signup, isLoading } = useAuth();
    const [mode, setMode] = useState('login');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });
    const [toast, setToast] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setToast({ message: 'Email and password are required', type: 'error' });
            return;
        }
        try {
            if (mode === 'login') {
                await login(formData.email, formData.password);
                setToast({ message: 'Login successful!', type: 'success' });
            }
            else {
                if (!formData.name) {
                    setToast({ message: 'Name is required', type: 'error' });
                    return;
                }
                await signup(formData.email, formData.password, formData.name);
                setToast({ message: 'Signup successful!', type: 'success' });
            }
            setTimeout(() => {
                router.push('/colleges');
            }, 1500);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'An error occurred';
            setToast({ message, type: 'error' });
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center px-4 py-12", children: [_jsx(Card, { className: "w-full max-w-md", children: _jsxs(CardContent, { className: "pt-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold mx-auto mb-4", children: "C" }), _jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "CampusLens" }), _jsx("p", { className: "text-gray-600", children: mode === 'login' ? 'Sign in to your account' : 'Create a new account' })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [mode === 'signup' && (_jsx(Input, { label: "Full Name", name: "name", type: "text", placeholder: "John Doe", value: formData.name, onChange: handleInputChange })), _jsx(Input, { label: "Email", name: "email", type: "email", placeholder: "you@example.com", value: formData.email, onChange: handleInputChange }), _jsx(Input, { label: "Password", name: "password", type: "password", placeholder: mode === 'login' ? 'Your password' : 'At least 6 characters', value: formData.password, onChange: handleInputChange }), _jsx(Button, { type: "submit", variant: "primary", size: "lg", isLoading: isLoading, className: "w-full", children: mode === 'login' ? 'Sign In' : 'Sign Up' })] }), _jsx("div", { className: "mt-6 pt-6 border-t border-gray-200 text-center", children: _jsxs("p", { className: "text-gray-600 text-sm mb-3", children: [mode === 'login'
                                        ? "Don't have an account? "
                                        : 'Already have an account? ', _jsx("button", { type: "button", onClick: () => {
                                            setMode(mode === 'login' ? 'signup' : 'login');
                                            setFormData({ email: '', password: '', name: '' });
                                        }, className: "text-primary hover:text-primary-dark font-semibold transition-colors", children: mode === 'login' ? 'Sign Up' : 'Sign In' })] }) }), _jsxs("div", { className: "mt-6 p-4 bg-blue-50 rounded-lg text-xs text-blue-900", children: [_jsx("p", { className: "font-semibold mb-2", children: "Demo Account:" }), _jsx("p", { children: "Any email and password will work for demo purposes." })] })] }) }), toast && (_jsx(Toast, { message: toast.message, type: toast.type, onClose: () => setToast(null) }))] }));
};
