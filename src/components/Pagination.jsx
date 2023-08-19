import React from 'react';
import ReactPaginate from "react-paginate";
import style from '../styles/components/pagination.module.scss'

const Pagination = ({changePage}) => {
    return (
        <div>
            <ReactPaginate
                className={style.pagination_container}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => {
                    changePage(e.selected + 1)
                }}
                pageRangeDisplayed={5}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default Pagination;