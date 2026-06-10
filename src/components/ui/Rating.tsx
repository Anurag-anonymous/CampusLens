import type { ReactNode } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Star } from 'lucide-react';
interface RatingProps {
    rating: number;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    children?: ReactNode;
}
export const Rating = ({ rating, size = 'md', showLabel = true }: RatingProps) => {
    const sizeMap = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex gap-1", children: [...Array(5)].map((_, i) => {
                    const isFilled = i < fullStars;
                    const isHalf = i === fullStars && hasHalfStar;
                    return (_jsxs("div", { className: "relative", children: [_jsx(Star, { className: `${sizeMap[size]} ${isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}` }), isHalf && (_jsx("div", { className: "absolute top-0 left-0 overflow-hidden w-1/2", children: _jsx(Star, { className: `${sizeMap[size]} fill-yellow-400 text-yellow-400` }) }))] }, i));
                }) }), showLabel && _jsx("span", { className: "text-sm font-medium text-gray-700", children: rating.toFixed(1) })] }));
};
