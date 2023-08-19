import React from 'react';
import debounce from 'debounce'
import styles from '../styles/components/search_input.module.scss'
import search_icon from '../assets/img/search_icon.svg'
import clear_icon from '../assets/img/clear_icon.svg'
import {useDispatch} from "react-redux";
import {setSearch} from "../redux/slices/filterSlice";

const SearchInput = ({...props}) => {
    const dispatch = useDispatch()
    const [localSearch, setLocalSearch] = React.useState('')
    const inputRef = React.useRef()

    const clearInput = () => {
        dispatch(setSearch(''))
        setLocalSearch('')
        inputRef.current.focus()
    }

    const changeLocalSearch = (e) => {
        setLocalSearch(e.target.value)
        changeGlobalValue(e.target.value)
    }


    const changeGlobalValue = React.useCallback(
        debounce((localSearchData) => {
            dispatch(setSearch(localSearchData))
        }, 500), []
    )

    return (
        <div className={styles.searchBar}>
            <img className={styles.search_icon} src={search_icon} alt="search_icon"/>
            <input ref={inputRef} value={localSearch} onChange={changeLocalSearch}
                   className={styles.input} {...props}/>
            {localSearch && <img className={styles.clear_icon} src={clear_icon} onClick={clearInput} alt=""/>}
        </div>
    );
};

export default SearchInput;