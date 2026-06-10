"use client";

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useQueryClient } from '@tanstack/react-query';
const SAVED_COLLEGES_KEY = 'savedColleges';
const GUEST_SAVED_KEY = 'guest_savedColleges';
export const useSavedColleges = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [savedIds, setSavedIds] = useState(new Set());
    // Load saved colleges on mount or when user changes
    useEffect(() => {
        const key = user ? `${SAVED_COLLEGES_KEY}_${user.id}` : GUEST_SAVED_KEY;
        const saved = localStorage.getItem(key);
        setSavedIds(new Set(saved ? JSON.parse(saved) : []));
    }, [user]);
    const toggleSave = useCallback((collegeId) => {
        setSavedIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(collegeId)) {
                newSet.delete(collegeId);
            }
            else {
                newSet.add(collegeId);
            }
            // Persist to localStorage
            const key = user ? `${SAVED_COLLEGES_KEY}_${user.id}` : GUEST_SAVED_KEY;
            localStorage.setItem(key, JSON.stringify(Array.from(newSet)));
            // Invalidate colleges query to update heart icons
            queryClient.invalidateQueries({ queryKey: ['colleges'] });
            return newSet;
        });
    }, [user, queryClient]);
    const isSaved = useCallback((collegeId) => savedIds.has(collegeId), [savedIds]);
    const getSavedIds = useCallback(() => Array.from(savedIds), [savedIds]);
    return { isSaved, toggleSave, getSavedIds, savedCount: savedIds.size };
};
