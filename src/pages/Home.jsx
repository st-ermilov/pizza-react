import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaSkeleton";
import PizzaItem from "../components/PizzaItem";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/slices/filterSlice";
import axios from "axios";

const Home = () => {
    const dispatch = useDispatch()

    const [pizzas, setPizzas] = React.useState([])
    const [loading, setLoading] = React.useState(true)


    const category = useSelector((state) => state.filter.category)
    const categoryParams = `${category > 0 ? `category=${category}` : ``}`


    const sort = useSelector((state) => state.filter.sort)
    const sortParams = `${sort.sortProp.includes('-')
        ? `sortBy=${sort.sortProp.replace('-', '')}&order=desc`
        : `sortBy=${sort.sortProp}&order=asc`}`


    const search = useSelector((state) => state.filter.search)
    const searchParams = `${search !== ''
        ? `search=${search}`
        : ``}`


    const currentPage = useSelector(state => state.filter.currentPage)
    const changePage = (number) => {
        dispatch(setCurrentPage(number))
    }
    const pagesParams = `page=${currentPage}&limit=${4}`

    const fetchParams = `${pagesParams}&${categoryParams}&${sortParams}&${searchParams}`

    React.useEffect(() => {
        setLoading(true)
        axios
            .get(`https://647734419233e82dd53b241b.mockapi.io/pizza_array?${fetchParams}`)
            .then((response) => {
                setPizzas(response.data)
                setLoading(false)
            })
        window.scrollTo(0, 0)
    }, [category, sort, search, currentPage])

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories/>
                    <Sort/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items__pizza">
                    {loading
                        ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index}/>)
                        : pizzas.map((item) => <PizzaItem key={item.id} {...item}/>)}
                </div>
                <Pagination changePage={changePage}/>
            </div>
        </div>
    );
};

export default Home;