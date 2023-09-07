import React from 'react';
import angry from '../assets/img/angry.svg'
import styles from '../styles/components/error.module.scss'

export const Error: React.FC = () => {
    return (
        <div className={styles.error_container}>
            <h2>Ошибка</h2>
            <img src={angry} alt=""/>
            <p>Приносим свои извинения, мы работаем над устранением проблемы</p>
        </div>
    );
};

