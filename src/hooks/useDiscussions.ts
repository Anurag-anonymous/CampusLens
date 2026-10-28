"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { DiscussionAnswer, DiscussionThread } from '../types/college';
import { DISCUSSIONS_STORAGE_KEY, seedDiscussions } from '../utils/discussions';

const createId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const safeParse = (value: string | null) => {
  if (!value) return null;
  try {
    return JSON.parse(value) as DiscussionThread[];
  } catch {
    return null;
  }
};

export const useDiscussions = () => {
  const [threads, setThreads] = useState<DiscussionThread[]>([]);
  const [isReady, setIsReady] = useState(false);
  const threadsRef = useRef(threads);
  threadsRef.current = threads;

  useEffect(() => {
    const saved = safeParse(localStorage.getItem(DISCUSSIONS_STORAGE_KEY));
    if (saved && Array.isArray(saved)) {
      setThreads(saved);
    } else {
      setThreads(seedDiscussions);
      localStorage.setItem(DISCUSSIONS_STORAGE_KEY, JSON.stringify(seedDiscussions));
    }
    setIsReady(true);
  }, []);

  const persist = useCallback((nextThreads: DiscussionThread[]) => {
    setThreads(nextThreads);
    localStorage.setItem(DISCUSSIONS_STORAGE_KEY, JSON.stringify(nextThreads));
  }, []);

  const askQuestion = useCallback(
    (payload: { title: string; body: string; authorName: string; tags: string[] }) => {
      const newThread: DiscussionThread = {
        id: createId('thread'),
        title: payload.title.trim(),
        body: payload.body.trim(),
        authorName: payload.authorName.trim(),
        createdAt: new Date().toISOString(),
        tags: payload.tags.filter(Boolean),
        answers: [],
        views: 0,
      };

      persist([newThread, ...threads]);
      return newThread;
    },
    [persist, threads],
  );

  const answerQuestion = useCallback(
    (threadId: string, payload: { body: string; authorName: string }) => {
      const answer: DiscussionAnswer = {
        id: createId('answer'),
        body: payload.body.trim(),
        authorName: payload.authorName.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
      };

      const nextThreads = threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              answers: [...thread.answers, answer],
            }
          : thread,
      );

      persist(nextThreads);
      return answer;
    },
    [persist, threads],
  );

  const likeAnswer = useCallback(
    (threadId: string, answerId: string) => {
      const nextThreads = threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              answers: thread.answers.map((answer) =>
                answer.id === answerId ? { ...answer, likes: answer.likes + 1 } : answer,
              ),
            }
          : thread,
      );

      persist(nextThreads);
    },
    [persist, threads],
  );

  const bumpViews = useCallback(
    (threadId: string) => {
      const nextThreads = threadsRef.current.map((thread) =>
        thread.id === threadId ? { ...thread, views: thread.views + 1 } : thread,
      );
      persist(nextThreads);
    },
    [persist],
  );

  const stats = useMemo(
    () => ({
      threadCount: threads.length,
      answerCount: threads.reduce((count, thread) => count + thread.answers.length, 0),
    }),
    [threads],
  );

  return {
    threads,
    isReady,
    askQuestion,
    answerQuestion,
    likeAnswer,
    bumpViews,
    stats,
  };
};
