"use client";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useColleges, usePrefetchCollege } from '../hooks/useColleges';
import { useCompareStore } from '../hooks/useCompareStore';
import { useSavedColleges } from '../hooks/useSavedColleges';
import { CollegeCard } from '../components/college/CollegeCard';
import { FilterSidebar } from '../components/college/FilterSidebar';
import { CompareBar } from '../components/college/CompareBar';
import { PaginationLoader } from '../components/college/PaginationLoader';
import { CollegeSkeleton } from '../components/ui/Skeleton';
import { Drawer } from '../components/ui/Drawer';
import { Toast } from '../components/ui/Toast';
import { deserializeFilters, serializeFilters } from '../utils/filters';
export const CollegesListingPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showFilterDrawer, setShowFilterDrawer] = useState(false);
    const [toast, setToast] = useState(null);
    const filterParams = useMemo(() => {
        return deserializeFilters(searchParams.toString());
    }, [searchParams]);
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useColleges(filterParams);
    const { addCollege, removeCollege, isSelected } = useCompareStore();
    const { isSaved, toggleSave } = useSavedColleges();
    const prefetchCollege = usePrefetchCollege();
    const allColleges = useMemo(() => {
        return data?.pages.flatMap((page) => page.data) || [];
    }, [data]);
    const handleApplyFilters = (newFilters) => {
        const queryString = serializeFilters(newFilters);
        router.push(queryString ? `/colleges?${queryString}` : '/colleges');
    };
    const handleCompareClick = (collegeId) => {
        const college = allColleges.find((c) => c.id === collegeId);
        if (!college)
            return;
        if (isSelected(collegeId)) {
            removeCollege(collegeId);
            setToast({ message: 'Removed from comparison', type: 'success' });
        }
        else {
            addCollege(college);
            setToast({ message: 'Added to comparison', type: 'success' });
        }
    };
    const handleNavigateToCompare = () => {
        router.push('/compare');
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 pb-32 md:pb-0", children: [_jsx(Drawer, { isOpen: showFilterDrawer, onClose: () => setShowFilterDrawer(false), title: "Filters", position: "bottom", children: _jsx(FilterSidebar, { onApplyFilters: handleApplyFilters, initialFilters: filterParams, onClose: () => setShowFilterDrawer(false) }) }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [_jsx("div", { className: "hidden lg:block", children: _jsx("div", { className: "sticky top-24", children: _jsx(FilterSidebar, { onApplyFilters: handleApplyFilters, initialFilters: filterParams }) }) }), _jsxs("div", { className: "lg:col-span-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-6 lg:hidden", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Colleges" }), _jsx("button", { onClick: () => setShowFilterDrawer(true), className: "p-2 border border-gray-300 rounded-lg hover:bg-gray-100", children: _jsx(Menu, { className: "w-5 h-5" }) })] }), _jsx("h1", { className: "hidden lg:block text-2xl font-bold text-gray-900 mb-6", children: "Browse Colleges" }), (filterParams.search ||
                                    filterParams.location ||
                                    filterParams.minFee ||
                                    filterParams.maxFee ||
                                    filterParams.rating) && (_jsxs("div", { className: "mb-6 flex flex-wrap gap-2", children: [filterParams.search && (_jsxs("div", { className: "inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm", children: ["Search: ", filterParams.search, _jsx("button", { onClick: () => handleApplyFilters({ ...filterParams, search: undefined, page: 1 }), className: "text-blue-600 hover:text-blue-900", children: _jsx(X, { className: "w-4 h-4" }) })] })), filterParams.location && (_jsxs("div", { className: "inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm", children: ["Location: ", filterParams.location, _jsx("button", { onClick: () => handleApplyFilters({
                                                        ...filterParams,
                                                        location: undefined,
                                                        page: 1,
                                                    }), className: "text-blue-600 hover:text-blue-900", children: _jsx(X, { className: "w-4 h-4" }) })] }))] })), data?.pages && (_jsxs("p", { className: "text-sm text-gray-600 mb-6", children: ["Showing ", allColleges.length, " of ", data.pages[0]?.totalCount || 0, " colleges"] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12", children: allColleges.map((college) => (_jsx(CollegeCard, { college: college, isSaved: isSaved(college.id), onSave: () => toggleSave(college.id), onCompare: () => handleCompareClick(college.id), onClick: () => router.push(`/college/${college.id}`), onHover: () => prefetchCollege(college.id) }, college.id))) }), isFetchingNextPage && (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [...Array(2)].map((_, i) => (_jsx(CollegeSkeleton, {}, i))) })), hasNextPage && (_jsx(PaginationLoader, { isLoading: isFetchingNextPage, hasMore: hasNextPage, onLoadMore: () => fetchNextPage() })), !isFetching && allColleges.length === 0 && (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-600", children: "No colleges found. Try adjusting your filters." }) }))] })] }) }), _jsx(CompareBar, { onNavigateToCompare: handleNavigateToCompare }), toast && (_jsx(Toast, { message: toast.message, type: toast.type, onClose: () => setToast(null) }))] }));
};
