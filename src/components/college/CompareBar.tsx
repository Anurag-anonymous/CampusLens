"use client";

import type { ReactNode } from 'react';
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCompareStore } from '../../hooks/useCompareStore';
interface CompareBarProps {
    onNavigateToCompare: () => void;
    children?: ReactNode;
}
export const CompareBar = ({ onNavigateToCompare }: CompareBarProps) => {
    const { selectedColleges, removeCollege, clearAll } = useCompareStore();
    if (selectedColleges.length === 0) {
        return null;
    }
    return (_jsx("div", { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsxs("span", { className: "font-medium text-gray-900", children: ["Comparing ", selectedColleges.length, " college", selectedColleges.length > 1 ? 's' : ''] }), _jsx("div", { className: "flex gap-2 flex-wrap", children: selectedColleges.map((college) => (_jsxs("div", { className: "inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg text-sm", children: [_jsx("span", { className: "text-gray-700 truncate max-w-xs", children: college.name }), _jsx("button", { onClick: () => removeCollege(college.id), className: "text-gray-500 hover:text-gray-700 transition-colors", children: _jsx(X, { className: "w-4 h-4" }) })] }, college.id))) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "secondary", size: "sm", onClick: clearAll, children: "Clear" }), _jsxs(Button, { variant: "primary", size: "sm", onClick: onNavigateToCompare, disabled: selectedColleges.length < 2, children: ["Compare (", selectedColleges.length, ")"] })] })] }) }) }));
};
