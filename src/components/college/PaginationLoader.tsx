"use client";

import type { ReactNode } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from '../ui/Skeleton';
interface PaginationLoaderProps {
    isLoading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    children?: ReactNode;
}
export const PaginationLoader = ({ isLoading, hasMore, onLoadMore, }: PaginationLoaderProps) => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        }, { threshold: 0.1 });
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);
    useEffect(() => {
        if (isInView && hasMore && !isLoading) {
            onLoadMore();
        }
    }, [isInView, hasMore, isLoading, onLoadMore]);
    if (!hasMore) {
        return (_jsx("div", { className: "text-center py-8 text-gray-500", children: "No more colleges to load" }));
    }
    return (_jsx("div", { ref: ref, className: "py-8", children: isLoading && (_jsxs("div", { className: "flex flex-col gap-4 max-w-sm mx-auto", children: [_jsx(Skeleton, { className: "h-64 w-full" }), _jsx(Skeleton, { className: "h-64 w-full" })] })) }));
};
