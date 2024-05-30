import * as React from 'react';
import axios from "axios";
// @ts-ignore
import styles from '../styles/pages/single_pizza.module.scss'
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addPizza, TypePizzaItem} from "../redux/slices/basketSlice";
import {Loader} from "../components";
import {TypePrimaryPizzaItem} from "../redux/slices/pizzasSlice";

const SinglePizza: React.FC = () => {
    const dispatch = useDispatch()
    const doughType: string[] = ['тонкое', 'традиционное']
    const [count, setCount] = React.useState(0)


    const [pizza, setPizza] = React.useState<TypePrimaryPizzaItem>()
    const [activeType, setActiveType] = React.useState(0)
    const [activeSize, setActiveSize] = React.useState(0)

    const {id} = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        const getSinglePizza = async () => {
            try {
                const response = await axios.get(`https://66582d845c3617052647319b.mockapi.io/pizzas-array/${id}`)
                setPizza(response.data)
            } catch (error) {
                alert(`Произошла ошибка:${error}`)
                navigate('/')
            }
        }
        getSinglePizza()
        window.scrollTo(0, 100)
    }, [id])

    if (!pizza) {
        return <Loader/>
    }


    const addPizzaItem = () => {
        let pizzaItem: TypePizzaItem = {
            id: pizza.id,
            title: pizza.title,
            imageUrl: pizza.imageUrl,
            price: pizza.price,
            type: doughType[activeType],
            size: pizza.sizes[activeSize],
            basketId: `${id ? id + pizza.sizes[activeSize] : ''}`,
            count: 0
        }
        dispatch(addPizza(pizzaItem))
        setCount(count + 1)
    }


    return (
        <div className={styles.pizza_container}>
            <div className={styles.pizza_block}>
                <div className={styles.first_column}>
                    <h4 className={styles.pizza_block__title}>{pizza.title}</h4>
                    <img
                        className={styles.pizza_img}
                        src={pizza.imageUrl}
                        alt="Pizza"
                    />
                </div>
                <div className={styles.second_column}>
                    <div className={styles.description}>
                        <h3>Описание:</h3>
                        <p>Классическое тесто для итальянской пиццы делается из специальной муки твёрдых сортов пшеницы,
                            с высоким содержанием белка, количеством не менее 14-15 %, в Италии известной как тип «два
                            нуля» (Farina Di Grano Tenero, tipo 00), натуральных дрожжей[6] (закваски), соли, воды и
                            оливкового масла. Тесто замешивается вручную и отправляется на двухчасовой отдых, после
                            этого его делят на шарики и отправляют на длительный отдых — около 8 часов. Из тестового
                            шарика руками (вначале пальцами рук, а затем ладонями) раcскатывается и растягивается
                            (раскрывается) тестовая основа круглой формы. Толщина классического теста пиццы — около 3-4
                            миллиметров, диаметр тестовой основы — 31-32 сантиметра. Тесто покрывается томатным соусом
                            либо его аналогами — например, белым (сливочным) соусом.</p>
                    </div>
                    <div className={styles.selector}>
                        <ul>
                            {
                                pizza.types.map((item, index) => <li
                                    key={index}
                                    onClick={() => setActiveType(index)}
                                    className={activeType === index ? `${styles.selector} ${styles.active}` : `${styles.selector}`}>{doughType[item]}</li>)
                            }
                        </ul>
                        <ul>
                            {pizza.sizes.map((item, index) => <li
                                key={index}
                                onClick={() => setActiveSize(index)}
                                className={activeSize === index ? `${styles.selector} ${styles.active}` : `${styles.selector}`}>{item} см</li>)}
                        </ul>
                    </div>
                    <div className={styles.pizza_block__bottom}>
                        <div className={styles.pizza_block__price}>от {pizza.price} ₽</div>
                        <div className={styles.nav_btns}>
                            <div className="cart__bottom-buttons">
                                <Link to="/" className="button button--outline button--add go-back-btn">
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <span>Вернуться назад</span>
                                </Link>
                            </div>
                            <div className="button button--outline button--add" onClick={addPizzaItem}>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                        fill="white"
                                    />
                                </svg>
                                <span>Добавить</span>
                                {count > 0 && <i>{count}</i>}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default SinglePizza;