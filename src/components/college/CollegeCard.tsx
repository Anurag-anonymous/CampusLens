import type { College } from '../../types/college';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { Heart, Scale } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Rating } from '../ui/Rating';
import { formatCurrency } from '../../utils/filters';
interface CollegeCardProps {
    college: College;
    isSaved?: boolean;
    onSave?: (id: number) => void;
    onCompare?: (id: number) => void;
    onClick?: () => void;
    onHover?: () => void;
}
export const CollegeCard = memo<CollegeCardProps>(({ college, isSaved = false, onSave, onCompare, onClick, onHover }) => {
    return (_jsxs(Card, { hover: true, onClick: onClick, onMouseEnter: onHover, className: "cursor-pointer overflow-hidden", children: [_jsxs(CardContent, { className: "pt-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 line-clamp-2", children: college.name }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: college.location })] }), _jsx("div", { className: "text-right", children: _jsx(Rating, { rating: college.rating, size: "sm", showLabel: true }) })] }), _jsxs("div", { className: "space-y-2 mt-4", children: [_jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Annual Fees" }), _jsx("span", { className: "font-semibold text-gray-900", children: formatCurrency(college.fees) })] }), _jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Avg. Package" }), _jsxs("span", { className: "font-semibold text-gray-900", children: ["\u20B9", college.placement.averagePackage, " LPA"] })] }), _jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Placement %" }), _jsxs("span", { className: "font-semibold text-gray-900", children: [college.placement.percentage, "%"] })] })] })] }), _jsxs(CardFooter, { className: "justify-between", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                            e.stopPropagation();
                            onSave?.(college.id);
                        }, className: "flex items-center gap-1", children: _jsx(Heart, { className: `w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}` }) }), _jsxs(Button, { variant: "secondary", size: "sm", onClick: (e) => {
                            e.stopPropagation();
                            onCompare?.(college.id);
                        }, className: "flex items-center gap-1", children: [_jsx(Scale, { className: "w-4 h-4" }), "Compare"] })] })] }));
});
CollegeCard.displayName = 'CollegeCard';
