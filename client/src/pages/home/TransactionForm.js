import React, { useState } from 'react';
import axios from 'axios';

import { useAuthContext } from './../../hooks/useAuthContext';
import { useTransactionContext } from '../../hooks/useTransactionContext';

const Transaction = ({ user, uid, balance }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const authCtx = useAuthContext();
    const transactionCtx = useTransactionContext();

    const handleSubmit = async e => {
        e.preventDefault();
        const { data } = await axios.get('http://localhost:5000/user/getUser/');
        let userData = data.users.find(o => o.username === user.username);
        const nextBalance = [userData.balance, +amount].reduce((a, b) => a + b);

        console.log(balance, nextBalance);
        // NO IDEA WHAT YOU WERE TRYING TO DO HERE
        // I think it said "tt >= balance"
        if (true) {
            axios.post(`http://localhost:5000/user/d/${uid}`, {
                balance: balance - amount,
            });
            authCtx.dispatch({
                type: 'UPDATE_USER_BALANCE',
                payload: nextBalance,
            });

            axios.post(`http://localhost:5000/user/da/${user.username}`, {
                balance: nextBalance,
            });

            axios
                .post('http://localhost:5000/doc/add', {
                    name,
                    amount,
                })
                .then(({ data }) => {
                    transactionCtx.dispatch({
                        type: 'ADD_TRANSACTION',
                        payload: data.data,
                    });
                });
        } else {
            console.log('No enough balance');
        }
    };

    return (
        <>
            <h3>Add a transction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transcation name:</span>
                    <input
                        type='text'
                        required
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Amount ($)</span>
                    <input
                        type='number'
                        required
                        onChange={e => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                <button>Add A Transaction</button>
            </form>
        </>
    );
};

export default Transaction;
