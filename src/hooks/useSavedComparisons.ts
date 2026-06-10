"use client";

import { useCallback, useEffect, useState } from 'react';
const SAVED_COMPARISONS_KEY = 'savedComparisons';
export const useSavedComparisons = (userId) => {
    const [comparisons, setComparisons] = useState([]);
    useEffect(() => {
        const key = userId ? `${SAVED_COMPARISONS_KEY}_${userId}` : `${SAVED_COMPARISONS_KEY}_guest`;
        const saved = localStorage.getItem(key);
        setComparisons(saved ? JSON.parse(saved) : []);
    }, [userId]);
    const save = useCallback((name, collegeIds) => {
        const newComparison = {
            id: `comp_${Date.now()}`,
            name,
            collegeIds,
            createdAt: new Date().toISOString(),
        };
        setComparisons((prev) => {
            const updated = [...prev, newComparison];
            const key = userId
                ? `${SAVED_COMPARISONS_KEY}_${userId}`
                : `${SAVED_COMPARISONS_KEY}_guest`;
            localStorage.setItem(key, JSON.stringify(updated));
            return updated;
        });
        return newComparison;
    }, [userId]);
    const remove = useCallback((id) => {
        setComparisons((prev) => {
            const updated = prev.filter((c) => c.id !== id);
            const key = userId
                ? `${SAVED_COMPARISONS_KEY}_${userId}`
                : `${SAVED_COMPARISONS_KEY}_guest`;
            localStorage.setItem(key, JSON.stringify(updated));
            return updated;
        });
    }, [userId]);
    return { comparisons, save, remove };
};
