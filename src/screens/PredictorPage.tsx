"use client";

import { useMemo, useState } from 'react';
import { ArrowRight, Sparkles, Target, ShieldCheck, AlertTriangle, School2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { CollegeSkeleton } from '../components/ui/Skeleton';
import { predictColleges } from '../utils/predictor';

const QUICK_EXAMS = ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'AEEE', 'WBJEE'];

export const PredictorPage = () => {
  const router = useRouter();
  const [exam, setExam] = useState('JEE Main');
  const [rank, setRank] = useState('5000');
  const [submitted, setSubmitted] = useState({ exam: 'JEE Main', rank: 5000 });

  const recommendations = useMemo(
    () => predictColleges(submitted.exam, submitted.rank),
    [submitted],
  );

  const summary = useMemo(
    () => ({
      safe: recommendations.filter((item) => item.matchLevel === 'Safe').length,
      target: recommendations.filter((item) => item.matchLevel === 'Target').length,
      reach: recommendations.filter((item) => item.matchLevel === 'Reach').length,
    }),
    [recommendations],
  );

  const handlePredict = () => {
    const parsedRank = Number.parseInt(rank, 10);
    if (!exam.trim() || Number.isNaN(parsedRank) || parsedRank <= 0) {
      return;
    }
    setSubmitted({ exam: exam.trim(), rank: parsedRank });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            <Sparkles className="h-4 w-4" />
            Predictor Tool
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Find colleges based on exam rank</h1>
          <p className="max-w-3xl text-gray-600">
            Enter your exam and rank to get a dataset-driven shortlist from the colleges already
            in CampusLens.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardContent className="space-y-5 pt-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Exam</label>
                <Input
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                  placeholder="e.g. JEE Main"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_EXAMS.map((option) => (
                  <Button
                    key={option}
                    variant={exam === option ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setExam(option)}
                    type="button"
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Rank</label>
                <Input
                  type="number"
                  min={1}
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="Enter your rank"
                />
              </div>
              <Button className="w-full" onClick={handlePredict}>
                Predict Colleges
              </Button>
              <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                We use the existing college dataset, exam eligibility, placement strength, rating,
                and fees to score each recommendation.
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8 lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Recommendation summary</h2>
                    <p className="text-sm text-gray-600">
                      Results for {submitted.exam} rank {submitted.rank.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => router.push('/colleges')}
                    className="flex items-center gap-2"
                  >
                    Browse All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-sm font-medium text-green-900">
                      <ShieldCheck className="h-4 w-4" />
                      Safe
                    </div>
                    <div className="text-2xl font-bold text-green-900">{summary.safe}</div>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-sm font-medium text-blue-900">
                      <Target className="h-4 w-4" />
                      Target
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{summary.target}</div>
                  </div>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-sm font-medium text-red-900">
                      <AlertTriangle className="h-4 w-4" />
                      Reach
                    </div>
                    <div className="text-2xl font-bold text-red-900">{summary.reach}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {recommendations.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <School2 className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                    <p className="text-gray-600">No matching colleges found for this exam.</p>
                    <p className="mt-2 text-sm text-gray-500">
                      Try a broader exam search like JEE Main or adjust the rank.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                recommendations.map((item) => (
                  <Card key={item.college.id}>
                    <CardContent className="space-y-4 pt-6">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.college.name}
                            </h3>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                item.matchLevel === 'Safe'
                                  ? 'bg-green-100 text-green-800'
                                  : item.matchLevel === 'Target'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {item.matchLevel}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{item.college.location}</p>
                        </div>

                        <div className="rounded-lg bg-gray-50 px-4 py-3 text-right">
                          <div className="text-xs uppercase tracking-wide text-gray-500">
                            Estimated closing rank
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {item.estimatedClosingRank.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500">Fees</p>
                          <p className="font-medium text-gray-900">
                            {item.college.fees.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500">Rating</p>
                          <p className="font-medium text-gray-900">{item.college.rating.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500">Placement</p>
                          <p className="font-medium text-gray-900">
                            {item.college.placement.percentage}%
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                        {item.reasons.map((reason) => (
                          <p key={reason}>• {reason}</p>
                        ))}
                      </div>

                      <Button
                        variant="secondary"
                        onClick={() => router.push(`/college/${item.college.id}`)}
                        className="w-full md:w-auto"
                      >
                        View College
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
