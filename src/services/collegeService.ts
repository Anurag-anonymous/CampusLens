import { MOCK_COLLEGES } from '../utils/mockData';
class CollegeService {
    constructor() {
        Object.defineProperty(this, "delay", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 300
        }); // Simulate network delay
        // Axios instance could be created here if needed for real API
    }
    async simulateDelay() {
        return new Promise((resolve) => setTimeout(resolve, this.delay));
    }
    async fetchColleges(params) {
        await this.simulateDelay();
        let filtered = [...MOCK_COLLEGES];
        // Filter by search term
        if (params.search) {
            const searchLower = params.search.toLowerCase();
            filtered = filtered.filter((college) => college.name.toLowerCase().includes(searchLower) ||
                college.location.toLowerCase().includes(searchLower) ||
                college.courses.some((course) => course.name.toLowerCase().includes(searchLower)));
        }
        // Filter by location
        if (params.location) {
            filtered = filtered.filter((college) => college.location === params.location);
        }
        // Filter by fees
        if (params.minFee !== undefined) {
            filtered = filtered.filter((college) => college.fees >= params.minFee);
        }
        if (params.maxFee !== undefined) {
            filtered = filtered.filter((college) => college.fees <= params.maxFee);
        }
        // Filter by rating
        if (params.rating !== undefined) {
            filtered = filtered.filter((college) => college.rating >= params.rating);
        }
        // Sort by rating descending
        filtered.sort((a, b) => b.rating - a.rating);
        // Pagination
        const page = params.page || 1;
        const limit = params.limit || 12;
        const totalCount = filtered.length;
        const totalPages = Math.ceil(totalCount / limit);
        const start = (page - 1) * limit;
        const end = start + limit;
        const data = filtered.slice(start, end);
        return {
            data,
            totalCount,
            totalPages,
            currentPage: page,
        };
    }
    async fetchCollegeById(id) {
        await this.simulateDelay();
        const college = MOCK_COLLEGES.find((c) => c.id === id);
        if (!college) {
            throw new Error(`College with id ${id} not found`);
        }
        return college;
    }
    async fetchCollegesByIds(ids) {
        await this.simulateDelay();
        return MOCK_COLLEGES.filter((c) => ids.includes(c.id));
    }
}
export const collegeService = new CollegeService();
