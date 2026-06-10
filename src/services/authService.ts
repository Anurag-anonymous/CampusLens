class AuthService {
    constructor() {
        Object.defineProperty(this, "delay", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 300
        });
    }
    async simulateDelay() {
        return new Promise((resolve) => setTimeout(resolve, this.delay));
    }
    async login(email, password) {
        await this.simulateDelay();
        // Mock validation
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const user = {
            id: `user_${Date.now()}`,
            email,
            name: email.split('@')[0],
        };
        const token = btoa(JSON.stringify({ userId: user.id, email, timestamp: Date.now() }));
        return { user, token };
    }
    async signup(credentials) {
        await this.simulateDelay();
        const { email, password, name } = credentials;
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        const user = {
            id: `user_${Date.now()}`,
            email,
            name: name || email.split('@')[0],
        };
        const token = btoa(JSON.stringify({ userId: user.id, email, timestamp: Date.now() }));
        return { user, token };
    }
    logout() {
        // Clear auth state if needed
    }
    verifyToken(token) {
        try {
            const decoded = JSON.parse(atob(token));
            return !!decoded.userId;
        }
        catch {
            return false;
        }
    }
}
export const authService = new AuthService();
