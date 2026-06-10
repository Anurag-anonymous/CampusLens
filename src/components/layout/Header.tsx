"use client";

import { useState } from 'react';
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bookmark, LogOut, Menu, MessageSquare, Search, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export const Header = ({ onSearch }: { onSearch?: (query: string) => void }) => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navLinks = [
        { href: '/predictor', label: 'Predictor', icon: Sparkles },
        { href: '/discussions', label: 'Discussions', icon: MessageSquare },
        { href: '/colleges', label: 'Colleges', icon: Search },
    ];
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/colleges?search=${encodeURIComponent(searchQuery)}`);
            onSearch?.(searchQuery);
        }
    };
    return (_jsx("header", { className: "sticky top-0 z-30 bg-white border-b border-gray-200", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex items-center justify-between h-16 gap-4", children: [_jsxs(Link, { href: "/", className: "flex items-center gap-2 font-bold text-xl text-primary", children: [_jsx("div", { className: "w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white", children: "C" }), "CampusLens"] }), _jsx("form", { onSubmit: handleSearch, className: "hidden md:flex flex-1 max-w-sm mx-8", children: _jsxs("div", { className: "relative w-full", children: [_jsx("input", { type: "text", placeholder: "Search colleges, courses, locations...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" }), _jsx("button", { type: "submit", className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600", children: _jsx(Search, { className: "w-5 h-5" }) })] }) }), _jsx("nav", { className: "hidden lg:flex items-center gap-2", children: navLinks.map(({ href, label, icon: Icon }) => (_jsx(Link, { href: href, children: _jsxs(Button, { variant: "ghost", size: "sm", className: "flex items-center gap-2", children: [_jsx(Icon, { className: "w-4 h-4" }), label] }) }, href))) }), _jsx("div", { className: "hidden md:flex items-center gap-4", children: user ? (_jsxs(_Fragment, { children: [_jsx(Link, { href: "/saved", children: _jsxs(Button, { variant: "ghost", size: "md", className: "flex items-center gap-2", children: [_jsx(Bookmark, { className: "w-5 h-5" }), "Saved"] }) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-sm text-gray-700", children: user.email }), _jsxs(Button, { variant: "secondary", size: "sm", onClick: () => {
                                                    logout();
                                                    router.push('/');
                                                }, className: "flex items-center gap-1", children: [_jsx(LogOut, { className: "w-4 h-4" }), "Logout"] })] })] })) : (_jsx(_Fragment, { children: _jsx(Link, { href: "/auth", children: _jsx(Button, { variant: "secondary", size: "md", children: "Sign In" }) }) })) }), _jsx("button", { onClick: () => setMobileMenuOpen(!mobileMenuOpen), className: "md:hidden text-gray-700 hover:text-gray-900", children: _jsx(Menu, { className: "w-6 h-6" }) })] }), mobileMenuOpen && (_jsxs("div", { className: "md:hidden border-t border-gray-200 py-4 space-y-4", children: [_jsxs("form", { onSubmit: handleSearch, className: "flex", children: [_jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm" }), _jsx("button", { type: "submit", className: "ml-2 text-primary", children: _jsx(Search, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [navLinks.map(({ href, label, icon: Icon }) => (_jsx(Link, { href: href, children: _jsxs(Button, { variant: "ghost", className: "w-full text-left flex items-center gap-2", children: [_jsx(Icon, { className: "w-4 h-4" }), label] }) }, href))), user ? (_jsxs(_Fragment, { children: [_jsx(Link, { href: "/saved", children: _jsxs(Button, { variant: "ghost", className: "w-full text-left flex items-center gap-2", children: [_jsx(Bookmark, { className: "w-4 h-4" }), "Saved"] }) }), _jsxs(Button, { variant: "secondary", className: "w-full flex items-center gap-2", onClick: () => {
                                                logout();
                                                router.push('/');
                                            }, children: [_jsx(LogOut, { className: "w-4 h-4" }), "Logout"] })] })) : (_jsx(Link, { href: "/auth", children: _jsx(Button, { variant: "primary", className: "w-full", children: "Sign In" }) }))] })] }))] }) }));
};
