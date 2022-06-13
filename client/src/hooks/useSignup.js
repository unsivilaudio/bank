import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const signup = async (username, password) => {
        setError(null);
        setIsPending(true);

        try {
            let item = { username, password };
            let result = await fetch('http://localhost:5000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accpet: 'application/json',
                },
                body: JSON.stringify(item),
            });
            result = await result.json();
            console.log(result);
            localStorage.setItem('token', JSON.stringify(result));
            dispatch({ type: 'LOGIN', payload: result });
            setIsPending(false);
            setError(null);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    };

    return { signup, error, isPending };
};
