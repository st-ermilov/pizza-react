import React from 'react';
// @ts-ignore
import debounce from 'lodash.debounce'
import styles from '../styles/components/search_input.module.scss'
import search_icon from '../assets/img/search_icon.svg'
import clear_icon from '../assets/img/clear_icon.svg'
import {setSearch} from "../redux/slices/filterSlice";
import {useAppDispatch} from "../hooks/redux_toolkit_hooks";

const SearchInput: React.FC = () => {
    const dispatch = useAppDispatch()
    const [localSearch, setLocalSearch] = React.useState('')
    const inputRef = React.useRef<HTMLInputElement>(null)

    const clearInput = () => {
        dispatch(setSearch(''))
        setLocalSearch('')
        inputRef.current?.focus()
    }

    const changeLocalSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value)
        changeGlobalValue(e.target.value)
    }


    const changeGlobalValue = React.useCallback(
        debounce((localSearchData: string) => {
            dispatch(setSearch(localSearchData))
        }, 500), []
    )

    return (
        <div className={styles.searchBar}>
            <img className={styles.search_icon} src={search_icon} alt="search_icon"/>
            <input ref={inputRef} value={localSearch} onChange={changeLocalSearch}
                   className={styles.input} placeholder='Поиск пиццы...'/>
            {localSearch && <img className={styles.clear_icon} src={clear_icon} onClick={clearInput} alt=""/>}
        </div>
    );
};

export default SearchInput;