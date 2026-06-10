"use client";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCollegesByIds } from '../hooks/useColleges';
import { useCompareStore } from '../hooks/useCompareStore';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { useSavedComparisons } from '../hooks/useSavedComparisons';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency, formatPackage } from '../utils/filters';
import { CollegeSkeleton } from '../components/ui/Skeleton';
export const ComparePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { selectedColleges } = useCompareStore();
    const { user } = useAuth();
    const { save: saveComparison } = useSavedComparisons(user?.id);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [comparisonName, setComparisonName] = useState('');
    const [toast, setToast] = useState(null);
    const collegeIds = useMemo(() => {
        const idsParam = searchParams.get('ids');
        if (idsParam) {
            return idsParam
                .split(',')
                .map((id) => Number.parseInt(id.trim(), 10))
                .filter((id) => Number.isInteger(id));
        }
        return selectedColleges.map((c) => c.id);
    }, [searchParams, selectedColleges]);
    const { data: colleges, isLoading } = useCollegesByIds(collegeIds.length > 0 ? collegeIds : undefined);
    const handleSaveComparison = () => {
        if (!comparisonName.trim()) {
            setToast({ message: 'Please enter a name', type: 'error' });
            return;
        }
        if (!user) {
            setToast({ message: 'Please log in to save comparisons', type: 'error' });
            return;
        }
        saveComparison(comparisonName, collegeIds);
        setToast({ message: 'Comparison saved!', type: 'success' });
        setShowSaveModal(false);
        setComparisonName('');
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-4", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx(CollegeSkeleton, {}), _jsx("div", { className: "mt-8", children: _jsx(CollegeSkeleton, {}) })] }) }));
    }
    if (!colleges || colleges.length === 0) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "No colleges to compare" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Add at least 2 colleges to compare" }), _jsx(Button, { onClick: () => router.push('/colleges'), children: "Browse Colleges" })] }) }));
    }
    const comparisonRows = [
        { label: 'Annual Fees', key: 'fees', format: (v) => formatCurrency(v) },
        { label: 'Avg. Package', key: 'placement.averagePackage', format: (v) => formatPackage(v) },
        { label: 'Highest Package', key: 'placement.highestPackage', format: (v) => formatPackage(v) },
        { label: 'Placement %', key: 'placement.percentage', format: (v) => `${v}%` },
        { label: 'Rating', key: 'rating', format: (v) => v.toFixed(2) },
        { label: 'Location', key: 'location', format: (v) => v },
        { label: 'Established', key: 'established', format: (v) => v },
    ];
    const getValueByPath = (obj, path) => {
        return path.split('.').reduce((current, prop) => current?.[prop], obj);
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-8", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Compare Colleges" }), _jsxs("p", { className: "text-gray-600 mb-8", children: ["Side-by-side comparison of ", colleges.length, " colleges"] }), _jsxs("div", { className: "flex gap-3 mb-8 flex-wrap", children: [_jsx(Button, { variant: "primary", onClick: () => {
                                if (!user) {
                                    setToast({ message: 'Please log in to save comparisons', type: 'error' });
                                    return;
                                }
                                setShowSaveModal(true);
                            }, children: "Save This Comparison" }), _jsx(Button, { variant: "secondary", onClick: () => router.push('/colleges'), children: "Back to Colleges" })] }), _jsx(Card, { children: _jsx(CardContent, { className: "overflow-x-auto pt-6", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b-2 border-gray-300", children: [_jsx("th", { className: "text-left py-4 px-4 font-semibold text-gray-900 w-40", children: "Metric" }), colleges.map((college) => (_jsx("th", { className: "text-left py-4 px-4 font-semibold text-gray-900 min-w-60", children: college.name }, college.id)))] }) }), _jsx("tbody", { children: comparisonRows.map((row, idx) => (_jsxs("tr", { className: `border-b border-gray-200 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`, children: [_jsx("td", { className: "py-4 px-4 font-medium text-gray-900 bg-gray-100", children: row.label }), colleges.map((college) => {
                                                const value = getValueByPath(college, row.key);
                                                return (_jsx("td", { className: "py-4 px-4 text-gray-700", children: row.format(value) }, `${college.id}-${row.key}`));
                                            })] }, row.key))) })] }) }) }), _jsx(Modal, { isOpen: showSaveModal, onClose: () => setShowSaveModal(false), title: "Save Comparison", size: "md", children: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Give your comparison a name so you can find it later" }), _jsx(Input, { label: "Comparison Name", placeholder: "e.g., Top 3 Engineering Colleges", value: comparisonName, onChange: (e) => setComparisonName(e.target.value) }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { variant: "primary", onClick: handleSaveComparison, className: "flex-1", children: "Save" }), _jsx(Button, { variant: "secondary", onClick: () => setShowSaveModal(false), className: "flex-1", children: "Cancel" })] })] }) }), toast && (_jsx(Toast, { message: toast.message, type: toast.type, onClose: () => setToast(null) }))] }) }));
};
