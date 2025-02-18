import { useEffect, useState } from 'react';
import axios from 'axios'

const useGenres = () => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [genres, setGenres] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                
                const response = await axios.get(`${URL}/books/genres`);
                
                const data = await response.data;
                const formattedGenres = data.genres.map((genre: string) => ({
                    value: genre.trim(), 
                    label: genre.trim(),
                }));
                console.log(formattedGenres)
                setGenres(formattedGenres);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    return { genres, loading, error };
};

export default useGenres;