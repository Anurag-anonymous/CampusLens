"use client";

import type { ReactNode } from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { X } from 'lucide-react';
interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    position?: 'left' | 'right' | 'bottom';
}
export const Drawer = ({ isOpen, onClose, title, children, position = 'bottom', }: DrawerProps) => {
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
    const positionClasses = {
        left: 'left-0 top-0 bottom-0 w-64 slide-in-left',
        right: 'right-0 top-0 bottom-0 w-64 slide-in-right',
        bottom: 'bottom-0 left-0 right-0 max-h-96 rounded-t-lg slide-in-bottom',
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity", onClick: onClose }), _jsxs("div", { className: `fixed z-50 bg-white shadow-lg ${positionClasses[position]} overflow-y-auto`, children: [title && (_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: title }), _jsx("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-700 transition-colors", children: _jsx(X, { className: "w-6 h-6" }) })] })), _jsx("div", { className: "p-4", children: children })] })] }));
};
