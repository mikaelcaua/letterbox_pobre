import { useState } from 'react';
import { createReview as createReviewService } from '../services/reviewService';

export function useCreateReview() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function createReview({ movieName, rating, comment }: { movieName: string; rating: number; comment?: string }) {
        setLoading(true);
        setError(null);
        try {
            await createReviewService({ movieName, rating, comment });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { createReview, loading, error };
} 