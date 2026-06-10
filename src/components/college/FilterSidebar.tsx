"use client";

import type { FilterParams } from '../../types/college';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, Controller } from 'react-hook-form';
import { Filter, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { getUniqueLocations, getFeeRange } from '../../utils/mockData';
interface FilterSidebarProps {
    onApplyFilters: (filters: FilterParams) => void;
    initialFilters?: FilterParams;
    onClose?: () => void;
}
export const FilterSidebar = ({ onApplyFilters, initialFilters = {}, onClose, }: FilterSidebarProps) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: initialFilters,
    });
    const locations = getUniqueLocations();
    const { min: minFeeRange, max: maxFeeRange } = getFeeRange();
    const onSubmit = (data) => {
        onApplyFilters(data);
        onClose?.();
    };
    const handleReset = () => {
        reset({});
        onApplyFilters({});
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Filter, { className: "w-5 h-5" }), _jsx("h2", { className: "text-lg font-semibold", children: "Filters" })] }), onClose && (_jsx("button", { type: "button", onClick: onClose, className: "text-gray-500 hover:text-gray-700", children: _jsx(X, { className: "w-5 h-5" }) }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Search" }), _jsx(Controller, { name: "search", control: control, render: ({ field }) => (_jsx(Input, { ...field, placeholder: "College name, location, course...", value: field.value || '' })) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Location" }), _jsx(Controller, { name: "location", control: control, render: ({ field }) => (_jsxs("select", { ...field, value: field.value || '', className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary", children: [_jsx("option", { value: "", children: "All Locations" }), locations.map((loc) => (_jsx("option", { value: loc, children: loc }, loc)))] })) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Annual Fees" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs text-gray-600", children: "Min (\u20B9)" }), _jsx(Controller, { name: "minFee", control: control, render: ({ field }) => (_jsx(Input, { ...field, type: "number", placeholder: minFeeRange.toString(), value: field.value || '', onChange: (e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined) })) })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs text-gray-600", children: "Max (\u20B9)" }), _jsx(Controller, { name: "maxFee", control: control, render: ({ field }) => (_jsx(Input, { ...field, type: "number", placeholder: maxFeeRange.toString(), value: field.value || '', onChange: (e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined) })) })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Min Rating" }), _jsx(Controller, { name: "rating", control: control, render: ({ field }) => (_jsx(Input, { ...field, type: "number", min: "0", max: "5", step: "0.5", placeholder: "0", value: field.value || '', onChange: (e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined) })) })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx(Button, { type: "submit", variant: "primary", size: "md", className: "flex-1", children: "Apply Filters" }), _jsx(Button, { type: "button", variant: "secondary", size: "md", onClick: handleReset, className: "flex-1", children: "Reset" })] })] }));
};
