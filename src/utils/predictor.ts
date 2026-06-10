import { MOCK_COLLEGES, getFeeRange } from './mockData';
import type { College, PredictorRecommendation } from '../types/college';

const EXAM_KEYWORDS: Record<string, string[]> = {
  'jee main': ['jee main', 'jee mains'],
  'jee advanced': ['jee advanced'],
  bitsat: ['bitsat'],
  viteee: ['viteee'],
  aeee: ['aeee'],
  snat: ['snat'],
  wbjee: ['wbjee'],
  tnea: ['tnea'],
  lpunest: ['lpu nest', 'lpunest'],
  nit: ['jee main'],
  iiit: ['jee main', 'iiitg'],
  cet: ['cet'],
  iit: ['iit','jee advanced'],
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const normalize = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');

const getExamTokens = (exam: string) => {
  const normalized = normalize(exam);
  const mapped = EXAM_KEYWORDS[normalized];
  if (mapped) return mapped;
  return normalized.split(/[\/,&+ ]+/).filter(Boolean);
};

const matchesExam = (college: College, exam: string) => {
  const tokens = getExamTokens(exam);
  if (tokens.length === 0) return true;

  return college.courses.some((course) => {
    const eligibility = course.eligibility.toLowerCase();
    return tokens.some((token) => eligibility.includes(token.toLowerCase()));
  });
};

const getTierFromRank = (rank: number) => {
  if (rank <= 1000) return 3;
  if (rank <= 5000) return 2;
  return 1;
};

const getTierFromRating = (rating: number) => {
  if (rating >= 4.6) return 3;
  if (rating >= 4.1) return 2;
  return 1;
};

const getTierFromPlacement = (placement: number) => {
  if (placement >= 95) return 3;
  if (placement >= 88) return 2;
  return 1;
};

const getTierFromFees = (fees: number) => {
  if (fees <= 150000) return 3;
  if (fees <= 500000) return 2;
  return 1;
};

const getCollegeTier = (college: College) => {
  const ratingTier = getTierFromRating(college.rating);
  const placementTier = getTierFromPlacement(college.placement.percentage);
  const feeTier = getTierFromFees(college.fees);
  return Math.round((ratingTier + placementTier + feeTier) / 3);
};

const getClosingRank = (college: College) => {
  const { min, max } = getFeeRange();
  const feeSpread = max === min ? 1 : max - min;
  const affordability = 1 - (college.fees - min) / feeSpread;
  const competitiveness =
    college.rating * 18 + college.placement.percentage * 0.9 + affordability * 25;
  return clamp(Math.round(22000 - competitiveness * 220), 600, 50000);
};

const buildReasons = (college: College, exam: string, rank: number) => {
  const reasons = [
    `${college.rating.toFixed(1)} rating with ${college.placement.percentage}% placements`,
    `Average package of ${college.placement.averagePackage.toFixed(1)} LPA`,
    `${college.fees.toLocaleString('en-IN')} annual fees`,
  ];

  const examTokens = getExamTokens(exam);
  if (examTokens.some((token) => college.courses.some((course) => course.eligibility.toLowerCase().includes(token)))) {
    reasons.unshift(`Matches ${exam} eligibility`);
  }

  if (rank <= 5000) {
    reasons.unshift(`Strong fit for a rank around ${rank.toLocaleString('en-IN')}`);
  } else {
    reasons.unshift(`Accessible option for a rank around ${rank.toLocaleString('en-IN')}`);
  }

  return reasons.slice(0, 3);
};

export const predictColleges = (exam: string, rank: number): PredictorRecommendation[] => {
  const candidateTier = getTierFromRank(rank);

  return MOCK_COLLEGES.map((college) => {
    const examMatch = matchesExam(college, exam);
    const collegeTier = getCollegeTier(college);
    const tierGap = candidateTier - collegeTier;
    const closingRank = getClosingRank(college);

    const matchLevel: PredictorRecommendation['matchLevel'] =
      tierGap >= 1 ? 'Safe' : tierGap === 0 ? 'Target' : 'Reach';

    const score =
      (examMatch ? 60 : 20) +
      college.rating * 8 +
      college.placement.percentage * 0.15 +
      collegeTier * 6 -
      Math.abs(rank - closingRank) / 1500;

    return {
      college,
      score: Number(score.toFixed(2)),
      matchLevel: examMatch ? matchLevel : 'Reach',
      estimatedClosingRank: closingRank,
      reasons: buildReasons(college, exam, rank),
    };
  })
    .filter((item) => matchesExam(item.college, exam))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
};

export const getPredictorSummary = (exam: string, rank: number) => {
  const recommendations = predictColleges(exam, rank);
  const safe = recommendations.filter((item) => item.matchLevel === 'Safe').length;
  const target = recommendations.filter((item) => item.matchLevel === 'Target').length;
  const reach = recommendations.filter((item) => item.matchLevel === 'Reach').length;

  return {
    recommendations,
    counts: { safe, target, reach },
  };
};
