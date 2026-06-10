"use client";

import type { ReactNode } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
interface ToastProps {
    message: ReactNode;
    type?: 'success' | 'error' | 'info';
    onClose: () => void;
}
export const Toast = ({ message, type = 'info', onClose }: ToastProps) => {
    React.useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);
    const typeClasses = {
        success: 'bg-green-50 text-green-900 border-green-200',
        error: 'bg-red-50 text-red-900 border-red-200',
        info: 'bg-blue-50 text-blue-900 border-blue-200',
    };
    return (_jsx("div", { className: `fixed bottom-4 right-4 px-4 py-3 rounded-lg border ${typeClasses[type]} shadow-lg z-50 max-w-xs`, children: message }));
};
