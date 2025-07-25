'use client';
import { useState } from 'react';
import { register as registerService } from '../services/authService';

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function register({ username, password }: { username: string; password: string }) {
        setLoading(true);
        setError(null);
        try {
            await registerService({ username, password });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { register, loading, error };
} 