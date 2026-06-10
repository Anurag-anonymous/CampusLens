"use client";

import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { collegeService } from '../services/collegeService';
export const useColleges = (params) => {
    return useInfiniteQuery({
        queryKey: ['colleges', params],
        queryFn: ({ pageParam = 1 }) => collegeService.fetchColleges({
            ...params,
            page: typeof pageParam === 'number' ? pageParam : 1,
            limit: 12,
        }),
        getNextPageParam: (lastPage) => lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined,
        initialPageParam: 1,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};
export const useCollege = (id) => {
    return useQuery({
        queryKey: ['college', id],
        queryFn: () => collegeService.fetchCollegeById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
export const useCollegesByIds = (ids) => {
    return useQuery({
        queryKey: ['colleges', { ids }],
        queryFn: () => collegeService.fetchCollegesByIds(ids),
        enabled: !!ids && ids.length > 0,
        staleTime: 1000 * 60 * 5,
    });
};
export const usePrefetchCollege = () => {
    const queryClient = useQueryClient();
    return (id) => {
        queryClient.prefetchQuery({
            queryKey: ['college', id],
            queryFn: () => collegeService.fetchCollegeById(id),
            staleTime: 1000 * 60 * 5,
        });
    };
};
