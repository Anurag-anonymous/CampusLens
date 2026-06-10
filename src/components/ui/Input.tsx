import type { InputHTMLAttributes } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => {
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: label })), _jsx("input", { ref: ref, className: `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${error ? 'border-red-500' : 'border-gray-300'} ${className || ''}`, ...props }), error && _jsx("p", { className: "mt-1 text-sm text-red-500", children: error })] }));
});
Input.displayName = 'Input';
