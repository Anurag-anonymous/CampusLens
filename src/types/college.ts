export interface College {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  description: string;
  established: number;
  infrastructure: string[];
  courses: Course[];
  placement: Placement;
  reviews: Review[];
  image?: string;
}

export interface Course {
  id: string;
  name: string;
  duration: number;
  fees: number;
  eligibility: string;
}

export interface Placement {
  averagePackage: number;
  highestPackage: number;
  percentage: number;
  topRecruiters: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ComparisonSet {
  id: string;
  name: string;
  collegeIds: number[];
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface FilterParams {
  search?: string;
  location?: string;
  minFee?: number;
  maxFee?: number;
  rating?: number;
  page?: number;
  limit?: number;
}

export interface PredictorRecommendation {
  college: College;
  score: number;
  matchLevel: 'Safe' | 'Target' | 'Reach';
  estimatedClosingRank: number;
  reasons: string[];
}

export interface DiscussionAnswer {
  id: string;
  body: string;
  authorName: string;
  createdAt: string;
  likes: number;
}

export interface DiscussionThread {
  id: string;
  title: string;
  body: string;
  authorName: string;
  createdAt: string;
  tags: string[];
  answers: DiscussionAnswer[];
  views: number;
}
