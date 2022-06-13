import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (username, password) => {
        setError(null);
        setIsPending(true);

        try {
            let { data } = await axios.post(
                'http://localhost:5000/user/login',
                {
                    username,
                    password,
                }
            );
            localStorage.setItem('token', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data });
            setIsPending(false);
            setError(null);
        } catch (err) {
            setError(err.message);
            setIsPending(false);
        }
    };
    return { login, error, isPending };
};
