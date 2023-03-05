import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

const PaginationItems = (props) => {
    const { handleClick } = props;
    const { numbers, actives } = props.pagination;
    
    const paginationItems = [];
    for (let i = 0; i < numbers.length; i++) {
        paginationItems.push(
            <Pagination.Item key={i} onClick={(e) => {handleClick(numbers[i], e)}} active={actives[i]}>
                {numbers[i]}
            </Pagination.Item>
        );
    }

    return paginationItems;
}

export default function Paging(props) {
    const { pages } = props;
    const [pagination, setPagination] = useState({
        numbers: [1, 2, 3, 4, 5],
        actives: [true, false, false, false, false],
    })

    useEffect(() => {
        const initPagination = async () => {
            const numbersList = [];
            const activesList = [];
            if (pages.totalPages < 5) {
                for (let i = 0; i < pages.totalPages; i++) {
                    numbersList.push(i + 1);
                    activesList.push(pages.number === i ? true : false);
                }
            } else {
                for (let i = 0; i < 5; i++) {
                    if (pages.number <= 2) {
                        numbersList.push(i + 1);
                        activesList.push(pages.number === i ? true : false);
                    } else if (2 < pages.number && pages.number <= pages.totalPages - 3) {
                        numbersList.push(pages.number - 2 + i + 1);
                        activesList.push(i === 2 ? true : false);
                    } else if (pages.totalPages - 3 < pages.number) {
                        numbersList.push(pages.totalPages - 5 + i + 1);
                        activesList.push(pages.totalPages - pages.number === 5 - i ? true : false);
                    }
                }
            }
            setPagination({
                numbers: numbersList,
                actives: activesList,
            });
        }

        initPagination();
    }, [pages]);

    const handleEllipsis = (params, e) => {
        e.preventDefault();
        const maxPage = props.pages.totalPages
        params = params < 1 ? 1 : params;
        params = params > maxPage ? maxPage : params;
        props.searchParams.set("page", params);
        props.setSearchParams(props.searchParams);
    }

    const handleClick = (params, e) => {
        e.preventDefault();
        props.searchParams.set("page", params);
        props.setSearchParams(props.searchParams);
    }

    return (
        <Pagination className="justify-content-center">
            <Pagination.First onClick={(e) => {handleClick(1, e)}} disabled={pages.first} />
            <Pagination.Prev onClick={(e) => {handleClick(pages.number + 1 - 1, e)}} disabled={pages.first} />

            <Pagination.Ellipsis onClick={(e) => {handleEllipsis(pages.number + 1 - 5, e)}} disabled={pages.first} />
            <PaginationItems handleClick={handleClick} pagination={pagination} />
            <Pagination.Ellipsis onClick={(e) => {handleEllipsis(pages.number + 1 + 5, e)}} disabled={pages.last} />

            <Pagination.Next onClick={(e) => {handleClick(pages.number + 1 + 1, e)}} disabled={pages.last} />
            <Pagination.Last onClick={(e) => {handleClick(pages.totalPages, e)}} disabled={pages.last} />
        </Pagination>
    );
}