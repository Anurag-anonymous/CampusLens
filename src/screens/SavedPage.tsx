"use client";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Bookmark, AlertCircle } from 'lucide-react';
import { useSavedColleges } from '../hooks/useSavedColleges';
import { useCollegesByIds } from '../hooks/useColleges';
import { useCompareStore } from '../hooks/useCompareStore';
import { Button } from '../components/ui/Button';
import { CollegeCard } from '../components/college/CollegeCard';
import { CollegeSkeleton } from '../components/ui/Skeleton';
import { Tabs } from '../components/ui/Tabs';
import { Card, CardContent } from '../components/ui/Card';
import { useSavedComparisons } from '../hooks/useSavedComparisons';
import { useAuth } from '../hooks/useAuth';
export const SavedPage = () => {
    const router = useRouter();
    const { getSavedIds, toggleSave } = useSavedColleges();
    const { user } = useAuth();
    const { comparisons, remove } = useSavedComparisons(user?.id);
    const { clearAll } = useCompareStore();
    const savedIds = useMemo(() => getSavedIds(), [getSavedIds]);
    const { data: savedColleges, isLoading } = useCollegesByIds(savedIds.length > 0 ? savedIds : undefined);
    const handleLoadComparison = (collegeIds) => {
        clearAll();
        // This is a simplified approach - in a real app, you'd populate the store
        router.push(`/compare?ids=${collegeIds.join(',')}`);
    };
    const savedCollegesTab = {
        id: 'colleges',
        label: `Saved Colleges (${savedIds.length})`,
        content: (_jsx("div", { children: isLoading ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [...Array(4)].map((_, i) => (_jsx(CollegeSkeleton, {}, i))) })) : savedIds.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "py-12 text-center", children: [_jsx(Bookmark, { className: "w-12 h-12 text-gray-300 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600 mb-6", children: "No saved colleges yet" }), _jsx(Button, { onClick: () => router.push('/colleges'), children: "Browse Colleges" })] }) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: savedColleges?.map((college) => (_jsx(CollegeCard, { college: college, isSaved: true, onSave: () => toggleSave(college.id), onCompare: () => {
                        // Handle compare logic if needed
                    }, onClick: () => router.push(`/college/${college.id}`) }, college.id))) })) })),
    };
    const savedComparisonsTab = {
        id: 'comparisons',
        label: `Saved Comparisons (${comparisons.length})`,
        content: (_jsx("div", { children: comparisons.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "py-12 text-center", children: [_jsx(AlertCircle, { className: "w-12 h-12 text-gray-300 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600 mb-6", children: "No saved comparisons yet" }), _jsx(Button, { onClick: () => router.push('/colleges'), children: "Browse Colleges" })] }) })) : (_jsx("div", { className: "space-y-4", children: comparisons.map((comparison) => (_jsx(Card, { children: _jsxs(CardContent, { className: "py-4 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: comparison.name }), _jsxs("p", { className: "text-sm text-gray-600", children: [comparison.collegeIds.length, " colleges \u2022", ' ', new Date(comparison.createdAt).toLocaleDateString()] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "primary", size: "sm", onClick: () => handleLoadComparison(comparison.collegeIds), children: "View" }), _jsx(Button, { variant: "danger", size: "sm", onClick: () => remove(comparison.id), children: "Delete" })] })] }) }, comparison.id))) })) })),
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-8", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex items-center gap-3 mb-8", children: [_jsx(Bookmark, { className: "w-8 h-8 text-primary" }), _jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Saved Items" })] }), _jsx(Tabs, { tabs: [savedCollegesTab, savedComparisonsTab], defaultTab: "colleges" })] }) }));
};
