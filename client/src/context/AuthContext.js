import { createContext, useReducer, useEffect } from 'react';

const __INITIAL_STATE = {
    token: null,
    user: null,
    status: 'unauthenticated',
    loading: false,
};

export const AuthContext = createContext();
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log('Logging in user!');
            const { token, data } = action.payload;
            const { user } = data || null;
            return Object.assign({}, state, {
                status: 'authenticated',
                token,
                user,
                loading: false,
            });
        case 'LOGOUT':
            return __INITIAL_STATE;
        case 'UPDATE_USER_BALANCE':
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    balance: action.payload,
                },
            });
        default:
            return state;
    }
};
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, __INITIAL_STATE);

    useEffect(() => {
        if (localStorage.token && state.status !== 'authenticated') {
            try {
                const payload = JSON.parse(localStorage.token);
                console.log(payload);
                dispatch({
                    type: 'LOGIN',
                    payload,
                });
            } catch (err) {
                console.log(err.message);
                console.log('Something went wrong parsing data');
                localStorage.removeItem('token');
            }
        } else {
            console.log("USER IS AUTH'D");
        }
    }, [dispatch, state.status]);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
