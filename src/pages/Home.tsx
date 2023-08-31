import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaItem from "../components/PizzaItem";
import PizzaSkeleton from "../components/PizzaSkeleton";
import Pagination from "../components/Pagination";
import {selectCategory, selectCurrentPage, selectSearch, selectSort, setCurrentPage} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizzas, selectStatus} from '../redux/slices/pizzasSlice'
import Error from "../components/Error";
import {useAppDispatch, useAppSelector} from "../hooks/redux_toolkit_hooks";

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const pizzas = useAppSelector(selectPizzas)

    const status = useAppSelector(selectStatus)


    const category = useAppSelector(selectCategory)
    const categoryParams = `${category > 0 ? `category=${category}` : ``}`


    const sort = useAppSelector(selectSort)
    const sortParams = `${sort.sortProp.includes('-')
        ? `sortBy=${sort.sortProp.replace('-', '')}&order=desc`
        : `sortBy=${sort.sortProp}&order=asc`}`


    const search = useAppSelector(selectSearch)
    const searchParams = `${search !== ''
        ? `search=${search}`
        : ``}`

    const currentPage = useAppSelector(selectCurrentPage)
    const changePage = (number: number) => {
        dispatch(setCurrentPage(number))
    }
    const pagesParams = `page=${currentPage}&limit=${4}`

    const fetchParams = `${pagesParams}&${categoryParams}&${sortParams}&${searchParams}`

    React.useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchPizzas({fetchParams}))
        }
        fetchData()

        window.scrollTo(0, 0)
    }, [category, sort, currentPage, search])

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories/>
                    <Sort/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items__pizza">
                    {status === 'error' ? <Error/> : (status === 'loading'
                        ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index}/>)
                        : pizzas.map((item: any) => <PizzaItem key={item.id} {...item}/>))}

                </div>
                <Pagination changePage={changePage}/>
            </div>
        </div>
    );
};

export default Home;