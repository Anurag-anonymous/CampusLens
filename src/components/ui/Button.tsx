import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children?: ReactNode;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', size = 'md', isLoading = false, children, className, ...props }, ref) => {
    const baseStyles = 'font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantStyles = {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        ghost: 'text-gray-700 hover:bg-gray-100',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm rounded',
        md: 'px-4 py-2 text-base rounded-lg',
        lg: 'px-6 py-3 text-lg rounded-lg',
    };
    return (_jsx("button", { ref: ref, className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`, disabled: isLoading || props.disabled, ...props, children: isLoading ? (_jsxs("span", { className: "flex items-center gap-2", children: [_jsx("span", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }), "Loading..."] })) : (children) }));
});
Button.displayName = 'Button';
