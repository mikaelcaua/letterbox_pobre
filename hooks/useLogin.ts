import { useState } from 'react';
import { login as loginService } from '../services/authService';

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function login({ username, password }: { username: string; password: string }) {
        setLoading(true);
        setError(null);
        try {
            await loginService({ username, password });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { login, loading, error };
} 