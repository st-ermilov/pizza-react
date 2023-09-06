import React from 'react';
import {setSort, TypeSort} from "../redux/slices/filterSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux_toolkit_hooks";

type TypeSortCategory = {
    name: string,
    sortProp: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price'
}
type TypePopUp = MouseEvent & {
    composedPath: Node[]
}
const Sort: React.FC = React.memo(() => {
        const dispatch = useAppDispatch()
        const [openModal, setOpenModal] = React.useState(false)

        const sortCategories: TypeSortCategory[] = [
            {name: `популярности (возр.)`, sortProp: 'rating'},
            {name: 'популярности (убыв.)', sortProp: '-rating'},
            {name: 'цене (возр.)', sortProp: 'price'},
            {name: 'цене (убыв.)', sortProp: '-price'},
            {name: 'алфавиту (возр.)', sortProp: 'title'},
            {name: 'алфавиту (убыв.)', sortProp: '-title'}
        ]
        const sortRef = React.useRef<HTMLDivElement>(null)

        const sort = useAppSelector((state) =>
            state.filter.sort
        )


        const selectSort = (item: TypeSort) => {
            dispatch(setSort(item))
            setOpenModal(!openModal)
        }

        React.useEffect(() => {
            const closeSortModal = (event: MouseEvent) => {
                const _event = event as TypePopUp
                if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
                    setOpenModal(false)
                }
            }
            document.body.addEventListener('click', closeSortModal)

            /* команда на момент component will unmount
            return () => {}, в данном случае для очистки EventListener*
             */

            return () => {
                document.body.removeEventListener('click', closeSortModal)
            }

        }, [])

        return (
            <div ref={sortRef} className="sort">
                <div className="sort__label">
                    <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                    <b>Сортировка по:</b>
                    <span onClick={() => setOpenModal(!openModal)}>{sort.name}</span>
                </div>
                <div className={`sort__popup ${openModal ? 'show' : ''}`}>
                    <ul>
                        {sortCategories.map((item, index) =>
                            <li
                                key={index}
                                className={sort.sortProp === item.sortProp ? 'active' : ''}
                                onClick={() => selectSort(item)}>{item.name}
                            </li>)}
                    </ul>
                </div>
            </div>
        );
    }
)
export default Sort;