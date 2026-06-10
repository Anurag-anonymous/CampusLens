"use client";

import { useEffect, useMemo, useState } from 'react';
import { MessageSquare, Send, Search, Eye, ThumbsUp, PlusCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useDiscussions } from '../hooks/useDiscussions';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const splitTags = (value: string) =>
  value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 5);

export const DiscussionsPage = () => {
  const { user } = useAuth();
  const { threads, isReady, askQuestion, answerQuestion, likeAnswer, bumpViews, stats } =
    useDiscussions();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [question, setQuestion] = useState({ title: '', body: '', authorName: user?.name || '', tags: '' });
  const [answerDraft, setAnswerDraft] = useState({ body: '', authorName: user?.name || '' });

  useEffect(() => {
    if (!selectedThreadId && threads.length > 0) {
      setSelectedThreadId(threads[0].id);
    }
  }, [threads, selectedThreadId]);

  const filteredThreads = useMemo(() => {
    const query = search.trim().toLowerCase();
    const base = threads.filter((thread) => {
      if (!query) return true;
      const searchable = `${thread.title} ${thread.body} ${thread.tags.join(' ')}`.toLowerCase();
      return searchable.includes(query);
    });

    return [...base].sort((a, b) => {
      if (sortBy === 'popular') {
        return b.views + b.answers.length * 5 - (a.views + a.answers.length * 5);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [threads, search, sortBy]);

  const selectedThread = useMemo(() => {
    return filteredThreads.find((thread) => thread.id === selectedThreadId) || filteredThreads[0];
  }, [filteredThreads, selectedThreadId]);

  useEffect(() => {
    if (selectedThread?.id) {
      bumpViews(selectedThread.id);
    }
  }, [selectedThread?.id, bumpViews]);

  const handleAskQuestion = () => {
    if (!question.title.trim() || !question.body.trim() || !question.authorName.trim()) {
      return;
    }

    const created = askQuestion({
      title: question.title,
      body: question.body,
      authorName: question.authorName,
      tags: splitTags(question.tags),
    });

    setSelectedThreadId(created.id);
    setQuestion({ title: '', body: '', authorName: user?.name || '', tags: '' });
  };

  const handleAnswer = () => {
    if (!selectedThread || !answerDraft.body.trim() || !answerDraft.authorName.trim()) {
      return;
    }

    answerQuestion(selectedThread.id, {
      body: answerDraft.body,
      authorName: answerDraft.authorName,
    });
    setAnswerDraft((current) => ({ ...current, body: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
            <MessageSquare className="h-4 w-4" />
            Q&A / Discussion
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Ask, answer, and browse discussions</h1>
          <p className="max-w-3xl text-gray-600">
            Use the board to ask questions about colleges, answer fellow students, and browse
            shared advice.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500">Threads</p>
              <p className="text-3xl font-bold text-gray-900">{stats.threadCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500">Answers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.answerCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="text-3xl font-bold text-gray-900">{user?.name || 'Guest'}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-1">
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-gray-900">Ask a question</h2>
                </div>
                <Input
                  value={question.title}
                  onChange={(e) => setQuestion((current) => ({ ...current, title: e.target.value }))}
                  placeholder="Question title"
                />
                <textarea
                  value={question.body}
                  onChange={(e) => setQuestion((current) => ({ ...current, body: e.target.value }))}
                  placeholder="Describe your question"
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Input
                  value={question.authorName}
                  onChange={(e) =>
                    setQuestion((current) => ({ ...current, authorName: e.target.value }))
                  }
                  placeholder="Your name"
                />
                <Input
                  value={question.tags}
                  onChange={(e) => setQuestion((current) => ({ ...current, tags: e.target.value }))}
                  placeholder="Tags, comma separated"
                />
                <Button onClick={handleAskQuestion} className="w-full">
                  Post Question
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-gray-900">Browse discussions</h2>
                </div>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search questions, answers, or tags"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={sortBy === 'recent' ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setSortBy('recent')}
                  >
                    Recent
                  </Button>
                  <Button
                    type="button"
                    variant={sortBy === 'popular' ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setSortBy('popular')}
                  >
                    Popular
                  </Button>
                </div>

                <div className="space-y-3">
                  {isReady && filteredThreads.map((thread) => (
                    <button
                      key={thread.id}
                      onClick={() => setSelectedThreadId(thread.id)}
                      className={`w-full rounded-lg border p-4 text-left transition-colors ${
                        selectedThread?.id === thread.id
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-gray-900">{thread.title}</h3>
                        <span className="text-xs text-gray-500">{thread.answers.length} answers</span>
                      </div>
                      <p className="line-clamp-2 text-sm text-gray-600">{thread.body}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {thread.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                  {isReady && filteredThreads.length === 0 && (
                    <p className="py-8 text-center text-sm text-gray-500">No discussions found.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedThread ? (
              <Card>
                <CardContent className="space-y-6 pt-6">
                  <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedThread.title}</h2>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {selectedThread.answers.length} answers
                      </span>
                    </div>
                    <p className="text-gray-600">{selectedThread.body}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span>By {selectedThread.authorName}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {selectedThread.views} views
                      </span>
                      <span>{new Date(selectedThread.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedThread.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Answers</h3>
                    {selectedThread.answers.length === 0 ? (
                      <div className="rounded-lg bg-gray-50 p-6 text-sm text-gray-600">
                        No answers yet. Be the first to help out.
                      </div>
                    ) : (
                      selectedThread.answers.map((answer) => (
                        <div key={answer.id} className="rounded-lg border border-gray-200 p-4">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <div className="text-sm font-medium text-gray-900">{answer.authorName}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(answer.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{answer.body}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => likeAnswer(selectedThread.id, answer.id)}
                              className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              Helpful {answer.likes > 0 ? `(${answer.likes})` : ''}
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                    <h3 className="text-lg font-semibold text-gray-900">Write an answer</h3>
                    <textarea
                      value={answerDraft.body}
                      onChange={(e) =>
                        setAnswerDraft((current) => ({ ...current, body: e.target.value }))
                      }
                      placeholder="Share your advice"
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Input
                      value={answerDraft.authorName}
                      onChange={(e) =>
                        setAnswerDraft((current) => ({ ...current, authorName: e.target.value }))
                      }
                      placeholder="Your name"
                    />
                    <Button onClick={handleAnswer} className="inline-flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Post Answer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                  <h2 className="text-xl font-semibold text-gray-900">No discussion selected</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Pick a thread from the list or ask a new question.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
