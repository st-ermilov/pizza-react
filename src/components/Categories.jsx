import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../redux/slices/filterSlice";

const Categories = () => {
    const dispatch = useDispatch()
    const categoriesArray = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые',]
    // const [activeCategory, setActiveCategory] = React.useState(0)
    const category = useSelector((state) => state.filter.category)

    const changeCategory = (i) => {
        dispatch(setCategory(i))
    }

    return (
        <div className="categories">
            <ul>
                {categoriesArray.map((item, index) => <li
                    key={index}
                    className={category === index ? 'active' : ''}
                    onClick={() => changeCategory(index)}>{item}</li>)}
            </ul>
        </div>
    );
};

export default Categories;