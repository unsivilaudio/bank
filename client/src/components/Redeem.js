import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from '../pages/login/Login.module.css';
import Transaction from './../pages/home/TransactionForm';
import { useAuthContext } from './../hooks/useAuthContext';

const Redeem = () => {
    const [redeem, setRedeem] = useState('');
    const { user } = useAuthContext();
    const uid = user.data.user._id;
    const balance = user.data.user.balance;

    const handlerCode = async e => {
        e.preventDefault();
        const b = await axios.get('http://localhost:5000/code/get');
        // setCode(...b.data.code)
        const h = b.data.code;
        const a = h.find(o => o.redeemCode === redeem);
        const k = a.redeemCode;
        const m = a.amount;
        console.log(m);
        if (k) {
            axios.post(`http://localhost:5000/user/d/${uid}`, {
                balance: balance + m,
            });
            alert('$2000 Added successfully');
            axios.delete(`http://localhost:5000/code/delete/${redeem}`, {});
        }
    };
    return (
        <form onSubmit={handlerCode} className={styles['login-form']}>
            <h2>Reedem</h2>
            <label>
                <span>Code</span>
                <input
                    type='username'
                    onChange={e => setRedeem(e.target.value)}
                    value={redeem}
                />
            </label>
            <button className='btn'>Submit</button>
        </form>
    );
};

export default Redeem;
