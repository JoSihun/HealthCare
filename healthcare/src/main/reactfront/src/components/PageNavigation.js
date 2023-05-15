import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import '../styles/PageNavigation.css';

export default function PageNavigation(props) {
    const { data, setPage } = props;
    const [numbers, setNumbers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let tempNumbers = [];
        if (data.totalPages <= 5) {
            for (let i = 0; i < data.totalPages; i++) {
                tempNumbers.push(i + 1);
            }
        } else if (data.number + 1 <= 3) {
            tempNumbers = [1, 2, 3, 4, 5];
        } else if (data.totalPages - 2 <= data.number + 1) {
            tempNumbers = [
                data.totalPages - 4,
                data.totalPages - 3,
                data.totalPages - 2,
                data.totalPages - 1,
                data.totalPages - 0,
            ]
        } else if (3 < data.number + 1 && data.number + 1 < data.totalPages - 2) {
            tempNumbers = [
                data.number + 1 - 2,
                data.number + 1 - 1,
                data.number + 1,
                data.number + 1 + 1,
                data.number + 1 + 2,
            ]
        }
        
        setNumbers(tempNumbers);
    }, [data]);

    const handleClick = async (number, e) => {
        e.preventDefault();
        setPage(number);
        searchParams.set("page", number);
        setSearchParams(searchParams);
    }
    
    const handleEllipsis = (number, e) => {
        e.preventDefault();
        number = Math.min(Math.max(1, number), data.totalPages);
        setPage(number);
        searchParams.set("page", number);
        setSearchParams(searchParams);
    }

    return (
        <Pagination className="justify-content-center">
            <Pagination.First onClick={(e) => {handleClick(1, e)}} disabled={data.first} />
            <Pagination.Prev onClick={(e) => {handleClick(data.number + 1 - 1, e)}} disabled={data.first} />
            <Pagination.Ellipsis onClick={(e) => {handleEllipsis(data.number + 1 - 5, e)}} disabled={data.first} />
            
            {numbers.map((number, index) => (
                <Pagination.Item key={index} onClick={(e) => {handleClick(number, e)}} active={number === data.number + 1} > 
                    {number}
                </Pagination.Item>
            ))}

            <Pagination.Ellipsis onClick={(e) => {handleEllipsis(data.number + 1 + 5, e)}} disabled={data.last} />
            <Pagination.Next onClick={(e) => {handleClick(data.number + 1 + 1, e)}} disabled={data.last} />
            <Pagination.Last onClick={(e) => {handleClick(data.totalPages, e)}} disabled={data.last} />
        </Pagination>
    )
}
