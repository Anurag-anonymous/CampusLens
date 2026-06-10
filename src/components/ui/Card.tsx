import type { HTMLAttributes, ReactNode } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    children?: ReactNode;
}
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ hover = false, className, children, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: `bg-white rounded-lg shadow-md ${hover ? 'hover:shadow-lg transition-shadow duration-200' : ''} ${className || ''}`, ...props, children: children }));
});
Card.displayName = 'Card';
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, children, ...props }, ref) => (_jsx("div", { ref: ref, className: `p-6 border-b border-gray-200 ${className || ''}`, ...props, children: children })));
CardHeader.displayName = 'CardHeader';
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, children, ...props }, ref) => (_jsx("div", { ref: ref, className: `p-6 ${className || ''}`, ...props, children: children })));
CardContent.displayName = 'CardContent';
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, children, ...props }, ref) => (_jsx("div", { ref: ref, className: `px-6 py-4 border-t border-gray-200 flex gap-3 ${className || ''}`, ...props, children: children })));
CardFooter.displayName = 'CardFooter';
