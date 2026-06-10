"use client";

import type { College } from '../types/college';
import { create } from 'zustand';
const MAX_COLLEGES = 3;
interface CompareStore {
    selectedColleges: College[];
    addCollege: (college: College) => void;
    removeCollege: (collegeId: number) => void;
    clearAll: () => void;
    isSelected: (collegeId: number) => boolean;
}
export const useCompareStore = create<CompareStore>((set, get) => ({
    selectedColleges: [],
    addCollege: (college) => {
        set((state) => {
            if (state.selectedColleges.length >= MAX_COLLEGES) {
                return state;
            }
            if (state.selectedColleges.some((c) => c.id === college.id)) {
                return state;
            }
            return {
                selectedColleges: [...state.selectedColleges, college],
            };
        });
    },
    removeCollege: (collegeId) => {
        set((state) => ({
            selectedColleges: state.selectedColleges.filter((c) => c.id !== collegeId),
        }));
    },
    clearAll: () => {
        set({ selectedColleges: [] });
    },
    isSelected: (collegeId) => {
        return get().selectedColleges.some((c) => c.id === collegeId);
    },
}));
