import { useState } from 'react';
import axios from 'axios';

const useUpdateProfile = () => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const updateProfile = async (formData: FormData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.put(`${URL}/auth/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(response.data.message);
        } catch (err : any) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { updateProfile, loading, error, success };
};

export default useUpdateProfile;