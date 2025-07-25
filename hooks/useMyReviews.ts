import { useState, useCallback } from 'react';
import { getMyReviews } from '../services/reviewService';

export function useMyReviews() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getMyReviews();
            setReviews(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { reviews, loading, error, fetchReviews };
} 