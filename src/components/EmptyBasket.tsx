import * as React from 'react';
import {Link} from "react-router-dom";
import empty_basket from '../assets/img/empty-cart.png'
import styles from '../styles/pages/empty_cart.module.scss'

export const EmptyBasket: React.FC = () => {
    return (
        <div className="cart cart--empty">
            <h2>Корзина пустая</h2>
            <p>
                Вероятней всего, вы не заказывали ещё пиццу.<br/>
                Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img className={styles.cart_img} src={empty_basket} alt="Empty cart"/>
            <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
    );
};

