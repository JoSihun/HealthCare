import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const SideBarItem = ({ item, selectedKey, setSelectedKey }) => {
    const handleClick = async (e) => {
        setSelectedKey(item.eventKey);
    }

    const handleMoustEnter = async (e) => {
        if (item.eventKey !== selectedKey) {
            e.target.className = "text-light bg-dark rounded px-2"
        }
    }
    const handleMoustLeave = async (e) => {
        if (item.eventKey !== selectedKey) {
            e.target.className = "text-dark"
        }
    }

    return (
        <Link to={item.href} className="fs-4 fw-bold" style={{ color: "black", textDecoration: "none" }}>
            <div className={selectedKey === item.eventKey ? "text-light bg-dark rounded p-1" : "text-dark"}
                onClick={handleClick}
                onMouseEnter={handleMoustEnter}
                onMouseLeave={handleMoustLeave}
            >
                {item.label}
            </div>
        </Link>
    );
}

const BaseSideBar = ({ title, items }) => {
    const [selectedKey, setSelectedKey] = useState(
        items.find((item) => window.location.pathname.includes(item.href))?.eventKey || 0
    );
  
    return (
        <Card>
            <Card.Body>
                <Card.Title className="fs-2 fw-bold fst-italic">
                    <Link to={title.href} className="text-dark" style={{ textDecoration: "none" }}>
                        {title.label}
                    </Link>
                </Card.Title>
                <hr />

                {items.map((item, index) => (
                    <SideBarItem key={index} item={item} selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
                ))}
            </Card.Body>
        </Card>
    );
}



export const MyPageSideBar = (props) => {
    const title = { label: "마이페이지", href: '/my-page' };
    const items = [
        { eventKey: 1, href: '/my-page/diet', label: '식단추천'},
        { eventKey: 2, href: '/my-page/routine', label: '루틴추천'},
        { eventKey: 3, href: '/my-page/bmi', label: '체질량지수(BMI)'},
    ];

    return <BaseSideBar title={title} items={items} />;
}


export const SupportSideBar = (props) => {
    const title = { label: 'Support', href: '/support/faqboard' };
    const items = [
        { eventKey: 1, href: '/support/faqboard', label: 'FAQ'},
        { eventKey: 2, href: '/support/qnaboard', label: 'Q&A'},
        { eventKey: 3, href: '/support/freeboard', label: '자유게시판'},
        { eventKey: 4, href: '/support/livechat', label: 'LiveChat'},
    ];

    return <BaseSideBar title={title} items={items} />;
}
