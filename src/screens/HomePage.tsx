"use client";

import { ArrowRight, BarChart3, Heart, MessageSquare, Search, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export const HomePage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Discover Your Perfect <span className="text-primary">College</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Compare 500+ colleges, explore courses, check placements, and make informed
                        decisions
                    </p>
                    <div className="flex gap-4 justify-center mb-12 flex-wrap">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => router.push('/colleges')}
                            className="flex items-center gap-2"
                        >
                            Explore Colleges
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => router.push('/predictor')}
                        >
                            Try Predictor
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-200">
                        <div>
                            <p className="text-4xl font-bold text-primary mb-2">500+</p>
                            <p className="text-gray-600">Colleges Listed</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-primary mb-2">1M+</p>
                            <p className="text-gray-600">Students Helped</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-primary mb-2">50+</p>
                            <p className="text-gray-600">Cities Covered</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card hover>
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Search className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Search</h3>
                                <p className="text-gray-600">
                                    Search and filter by location, fees, ratings, and more to find the perfect
                                    match
                                </p>
                            </CardContent>
                        </Card>
                        <Card hover>
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <BarChart3 className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Compare Colleges</h3>
                                <p className="text-gray-600">
                                    Side-by-side comparison of fees, placements, courses, and ratings
                                </p>
                            </CardContent>
                        </Card>
                        <Card hover>
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Predictor Tool</h3>
                                <p className="text-gray-600">
                                    Enter your exam rank and get recommended colleges from the dataset
                                </p>
                            </CardContent>
                        </Card>
                        <Card hover>
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <MessageSquare className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Q&A Discussions</h3>
                                <p className="text-gray-600">
                                    Ask questions, answer fellow students, and browse community advice
                                </p>
                            </CardContent>
                        </Card>
                        <Card hover>
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Heart className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Save Favorites</h3>
                                <p className="text-gray-600">
                                    Save colleges and comparisons for later review and easy access
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
                    <p className="text-lg opacity-90 mb-8">
                        Start browsing colleges, compare options, predict matches, and find your dream
                        college today
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => router.push('/colleges')}
                            className="flex items-center gap-2 mx-auto"
                        >
                            Browse All Colleges
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="lg" onClick={() => router.push('/discussions')}>
                            Visit Discussions
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};
