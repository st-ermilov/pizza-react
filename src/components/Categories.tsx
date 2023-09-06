import React from 'react';
import {setCategory} from "../redux/slices/filterSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux_toolkit_hooks";

const Categories: React.FC = React.memo(() => {
    const dispatch = useAppDispatch()
    const categoriesArray: string[] = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые',]

    const category = useAppSelector((state) => state.filter.category)

    const changeCategory = (i: number) => {
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
})

export default Categories;