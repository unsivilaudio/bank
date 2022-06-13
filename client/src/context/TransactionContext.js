import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const __INITIAL_STATE = {
    transactions: [],
};
export const TransactionContext = createContext();

const transactionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            return Object.assign({}, state, { transactions: action.payload });
        case 'ADD_TRANSACTION':
            return Object.assign({}, state, {
                transactions: state.transactions.concat(action.payload),
            });
        default:
            return state;
    }
};

export const TransactionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(transactionReducer, __INITIAL_STATE);

    useEffect(() => {
        axios
            .get('http://localhost:5000/doc/get')
            .then(({ data }) => {
                dispatch({
                    type: 'SET_TRANSACTIONS',
                    payload: data.data,
                });
            })
            .catch(err => console.log(err.message));
    }, [dispatch]);

    return (
        <TransactionContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TransactionContext.Provider>
    );
};
