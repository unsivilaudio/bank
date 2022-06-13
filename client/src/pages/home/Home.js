import { useAuthContext } from '../../hooks/useAuthContext';
import { TransactionContextProvider } from '../../context/TransactionContext';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import styles from './Home.module.css';
import './Home2.css';

export default function Home() {
    const { user } = useAuthContext();

    return (
        <TransactionContextProvider>
            <div className={styles.container}>
                <div className={styles.content}>
                    <TransactionList user={user} />
                </div>
                <div className={styles.sidebar}>
                    <TransactionForm
                        user={user}
                        uid={user._id}
                        balance={user.balance}
                    />
                </div>
            </div>
        </TransactionContextProvider>
    );
}
