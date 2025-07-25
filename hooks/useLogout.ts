import { useState } from 'react';
import { logout as logoutService } from '../services/authService';

export function useLogout() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function logout() {
        setLoading(true);
        setError(null);
        try {
            await logoutService();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { logout, loading, error };
} 