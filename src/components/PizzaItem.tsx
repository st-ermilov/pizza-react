import React from 'react';
import {addPizza, TypePizzaItem} from "../redux/slices/basketSlice";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../hooks/redux_toolkit_hooks";

type TypePizzaItemProps = {
    id: string;
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
}
export const PizzaItem: React.FC<TypePizzaItemProps> = ({id, title, price, imageUrl, sizes, types}) => {
    const dispatch = useAppDispatch()


    const [count, setCount] = React.useState(0)
    const [activeType, setActiveType] = React.useState(0)
    const [activeSize, setActiveSize] = React.useState(0)
    const doughType = ['тонкое', 'традиционное']


    const addPizzaItem = () => {
        const pizzaItem: TypePizzaItem = {
            id,
            title,
            imageUrl,
            price,
            type: doughType[activeType],
            size: sizes[activeSize],
            basketId: `${id + sizes[activeSize] + doughType[activeType]}}`,
            count: 0
        }
        dispatch(addPizza(pizzaItem))
        setCount(count + 1)
    }

    return (
        <div className="pizza-block">
            <Link to={`/pizza/${id}`}><h4 className="pizza-block__title">{title}</h4></Link>
            <Link to={`/pizza/${id}`}> <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            /></Link>
            <div className="pizza-block__selector">
                <ul>
                    {
                        types.map((item, index) => <li
                            key={index}
                            onClick={() => setActiveType(index)}
                            className={activeType === index ? "active" : ''}>{doughType[item]}</li>)
                    }
                </ul>
                <ul>
                    {sizes.map((item, index) => <li
                        key={index}
                        onClick={() => setActiveSize(index)}
                        className={activeSize === index ? 'active' : ''}>{item} см</li>)}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
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
    );
};

