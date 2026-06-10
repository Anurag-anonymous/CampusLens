"use client";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Scale } from 'lucide-react';
import { useCollege } from '../hooks/useColleges';
import { useCompareStore } from '../hooks/useCompareStore';
import { useSavedColleges } from '../hooks/useSavedColleges';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Rating } from '../components/ui/Rating';
import { Toast } from '../components/ui/Toast';
import { CollegeSkeleton } from '../components/ui/Skeleton';
import { formatCurrency, formatPackage } from '../utils/filters';
export const CollegeDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const collegeId = id ? parseInt(id) : undefined;
    const [toast, setToast] = useState(null);
    const { data: college, isLoading } = useCollege(collegeId);
    const { addCollege, removeCollege, isSelected } = useCompareStore();
    const { isSaved, toggleSave } = useSavedColleges();
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-4", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx(CollegeSkeleton, {}), _jsx("div", { className: "mt-8", children: _jsx(CollegeSkeleton, {}) })] }) }));
    }
    if (!college) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "College not found" }), _jsx(Button, { onClick: () => router.push('/colleges'), children: "Back to Colleges" })] }) }));
    }
    const handleCompare = () => {
        if (isSelected(college.id)) {
            removeCollege(college.id);
            setToast({ message: 'Removed from comparison', type: 'success' });
        }
        else {
            addCollege(college);
            setToast({ message: 'Added to comparison', type: 'success' });
        }
    };
    const overviewTab = {
        id: 'overview',
        label: 'Overview',
        content: (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx("h3", { className: "text-lg font-semibold", children: "About" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-gray-700", children: college.description }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Established" }), _jsx("p", { className: "text-lg font-semibold text-gray-900", children: college.established })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Location" }), _jsx("p", { className: "text-lg font-semibold text-gray-900", children: college.location })] })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx("h3", { className: "text-lg font-semibold", children: "Infrastructure" }) }), _jsx(CardContent, { children: _jsx("ul", { className: "grid grid-cols-2 gap-3", children: college.infrastructure.map((item) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("span", { className: "w-2 h-2 bg-primary rounded-full" }), _jsx("span", { className: "text-gray-700", children: item })] }, item))) }) })] })] })),
    };
    const coursesTab = {
        id: 'courses',
        label: 'Courses',
        content: (_jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-200", children: [_jsx("th", { className: "text-left py-3 px-4 font-semibold text-gray-900", children: "Course" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-gray-900", children: "Duration" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-gray-900", children: "Fees" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-gray-900", children: "Eligibility" })] }) }), _jsx("tbody", { children: college.courses.map((course) => (_jsxs("tr", { className: "border-b border-gray-100 hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4 text-gray-900", children: course.name }), _jsxs("td", { className: "py-3 px-4 text-gray-700", children: [course.duration, " years"] }), _jsx("td", { className: "py-3 px-4 text-gray-700", children: formatCurrency(course.fees) }), _jsx("td", { className: "py-3 px-4 text-gray-700", children: course.eligibility })] }, course.id))) })] }) }) }) })),
    };
    const placementsTab = {
        id: 'placements',
        label: 'Placements',
        content: (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { children: _jsxs(CardContent, { className: "grid grid-cols-2 md:grid-cols-4 gap-6 py-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Average Package" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900", children: ["\u20B9", college.placement.averagePackage] }), _jsx("p", { className: "text-xs text-gray-500", children: "LPA" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Highest Package" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900", children: ["\u20B9", college.placement.highestPackage] }), _jsx("p", { className: "text-xs text-gray-500", children: "LPA" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Placement %" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [college.placement.percentage, "%"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Rating" }), _jsx(Rating, { rating: college.rating, showLabel: true })] })] }) }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx("h3", { className: "text-lg font-semibold", children: "Top Recruiters" }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex flex-wrap gap-2", children: college.placement.topRecruiters.map((recruiter) => (_jsx("span", { className: "inline-block bg-blue-50 text-blue-900 px-4 py-2 rounded-lg text-sm font-medium", children: recruiter }, recruiter))) }) })] })] })),
    };
    const reviewsTab = {
        id: 'reviews',
        label: 'Reviews',
        content: (_jsx("div", { className: "space-y-4", children: college.reviews.map((review) => (_jsx(Card, { children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-900", children: review.userName }), _jsx("p", { className: "text-sm text-gray-600", children: new Date(review.date).toLocaleDateString() })] }), _jsx(Rating, { rating: review.rating, size: "sm", showLabel: false })] }), _jsx("p", { className: "text-gray-700", children: review.comment })] }) }, review.id))) })),
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 py-8", children: [_jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("button", { onClick: () => router.push('/colleges'), className: "flex items-center gap-2 text-primary hover:text-primary-dark mb-6 transition-colors", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Back to Colleges"] }), _jsx(Card, { className: "mb-8", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: college.name }), _jsx("p", { className: "text-lg text-gray-600 mb-4", children: college.location })] }), _jsx("div", { className: "text-right", children: _jsx(Rating, { rating: college.rating, showLabel: true }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 py-6 border-t border-b border-gray-200", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Annual Fees" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: formatCurrency(college.fees) })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Average Package" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: formatPackage(college.placement.averagePackage) })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Placement %" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [college.placement.percentage, "%"] })] })] }), _jsxs("div", { className: "flex gap-3 flex-wrap", children: [_jsxs(Button, { variant: "secondary", onClick: () => toggleSave(college.id), className: "flex items-center gap-2", children: [_jsx(Heart, { className: `w-5 h-5 ${isSaved(college.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}` }), isSaved(college.id) ? 'Saved' : 'Save'] }), _jsxs(Button, { variant: isSelected(college.id) ? 'danger' : 'primary', onClick: handleCompare, className: "flex items-center gap-2", children: [_jsx(Scale, { className: "w-5 h-5" }), isSelected(college.id) ? 'Remove from Compare' : 'Add to Compare'] })] })] }) }), _jsx(Tabs, { tabs: [overviewTab, coursesTab, placementsTab, reviewsTab] })] }), toast && (_jsx(Toast, { message: toast.message, type: toast.type, onClose: () => setToast(null) }))] }));
};
