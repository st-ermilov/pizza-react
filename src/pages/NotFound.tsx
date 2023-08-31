import React from 'react';
import not_found from '../assets/img/sad.svg'
import styles from '../styles/components/nof_found.module.scss'

const NotFound: React.FC = () => {
    return (
        <div className={styles.container}>
            <img src={not_found} alt=""/>
            <h1>404</h1>
            <h2>Ничего не найдено</h2>
        </div>
    );
};

export default NotFound;