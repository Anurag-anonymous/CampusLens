import type { HTMLAttributes } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}
export const Skeleton = ({ className = '' }: SkeletonProps) => {
    return (_jsx("div", { className: `animate-pulse bg-gray-200 rounded ${className}` }));
};
export const CollegeSkeleton = () => {
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-md p-4 space-y-4", children: [_jsx(Skeleton, { className: "h-6 w-3/4" }), _jsx(Skeleton, { className: "h-4 w-1/2" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-5/6" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Skeleton, { className: "h-10 w-1/3" }), _jsx(Skeleton, { className: "h-10 w-1/3" })] })] }));
};
