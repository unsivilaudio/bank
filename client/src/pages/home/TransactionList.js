import { useTransactionContext } from '../../hooks/useTransactionContext';
import styles from './Home.module.css';

export default function TransactionList() {
    const { transactions } = useTransactionContext();
    return (
        <ul className={styles.transactions}>
            {transactions?.length &&
                transactions.map(data => (
                    <li key={data._id}>
                        <p className={styles.name}>{data.name}</p>
                        <p className={styles.amount}>${data.amount}</p>
                    </li>
                ))}
        </ul>
    );
}
