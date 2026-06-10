"use client";

import type { ReactNode } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
interface TabItem {
    id: string;
    label: string;
    content: ReactNode;
}
interface TabsProps {
    tabs: TabItem[];
    defaultTab?: string;
}
export const Tabs = ({ tabs, defaultTab }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
    return (_jsxs("div", { children: [_jsx("div", { className: "flex border-b border-gray-200 overflow-x-auto", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.id), className: `px-4 py-3 font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 hover:text-gray-900'}`, children: tab.label }, tab.id))) }), _jsx("div", { className: "mt-4", children: tabs.find((tab) => tab.id === activeTab)?.content })] }));
};
