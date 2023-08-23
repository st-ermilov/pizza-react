import React from 'react';
import styles from '../styles/components/loader.module.scss'

const Loader = () => {
    return (
        <div className={styles.loader_container}>
            <div className={styles.loader}></div>
        </div>
    );
};

export default Loader;