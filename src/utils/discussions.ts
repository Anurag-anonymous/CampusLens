import type { DiscussionThread } from '../types/college';

const now = () => new Date().toISOString();

export const DISCUSSIONS_STORAGE_KEY = 'campuslens_discussions';

export const seedDiscussions: DiscussionThread[] = [
  {
    id: 'thread_1',
    title: 'Which is better for CSE: IIT Delhi or IIT Bombay?',
    body: 'I have a strong JEE Advanced rank and I want to choose between these two colleges. What should I compare beyond placements?',
    authorName: 'Aman',
    createdAt: now(),
    tags: ['IIT', 'CSE', 'Placements'],
    views: 241,
    answers: [
      {
        id: 'answer_1',
        body: 'Look at branch culture, campus ecosystem, and where you want to work after graduation. Both are excellent, but IIT Bombay usually edges out for overall campus experience.',
        authorName: 'Priya',
        createdAt: now(),
        likes: 12,
      },
    ],
  },
  {
    id: 'thread_2',
    title: 'Is VIT worth it for Computer Science?',
    body: 'My rank is outside the top tier government colleges. I want to know whether VIT is a good fallback for CSE and placements.',
    authorName: 'Siddharth',
    createdAt: now(),
    tags: ['Private College', 'CSE', 'Placements'],
    views: 198,
    answers: [
      {
        id: 'answer_2',
        body: 'Yes, if you are okay with a higher fee structure. The CSE ecosystem is strong and placements are decent if you stay consistent.',
        authorName: 'Neha',
        createdAt: now(),
        likes: 8,
      },
      {
        id: 'answer_3',
        body: 'I would recommend checking hostel, exam pattern, and fee escalation before deciding. The campus network matters a lot too.',
        authorName: 'Rohit',
        createdAt: now(),
        likes: 5,
      },
    ],
  },
  {
    id: 'thread_3',
    title: 'How should I shortlist colleges with a rank around 8,000?',
    body: 'I am looking for realistic options with a good return on investment. Should I prioritize fees, placements, or location?',
    authorName: 'Meera',
    createdAt: now(),
    tags: ['Rank', 'Shortlisting', 'Advice'],
    views: 154,
    answers: [],
  },
];
