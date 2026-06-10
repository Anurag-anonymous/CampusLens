"use client";

import type { ReactNode } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { X } from 'lucide-react';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg';
}
export const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    if (!isOpen)
        return null;
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: `bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full mx-4 max-h-screen overflow-y-auto`, children: [title && (_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: title }), _jsx("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-700 transition-colors", children: _jsx(X, { className: "w-6 h-6" }) })] })), _jsx("div", { className: "p-6", children: children })] }) }));
};
