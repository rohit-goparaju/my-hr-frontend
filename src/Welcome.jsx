import styles from './Welcome.module.css';

export default function Welcome(){
    return (
        <div className={`specialElite ${styles.welcomeContainer}`}>
            <div className={`${styles.welcomeLine1}`}>
                Welcome
            </div>
            <div className={`${styles.welcomeLine2}`}>
                To
            </div>
            <div className={`${styles.welcomeLine3}`}> 
                <span className='text-bg-danger p-2'>myHR</span> portal.
            </div>
        </div>
    );
}