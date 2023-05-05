import React, { useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


const BaseSideBar = ({ title, items }) => {
    const [selectedKey, setSelectedKey] = useState(
        items.find((item) => item.href === window.location.pathname)?.eventKey || 1
    );
  
    const handleSelect = (selectedKey) => {
        setSelectedKey(selectedKey);
    };
  
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="fs-2 fw-bold fst-italic">
                    <Link to={items[0].href} className="text-dark" style={{ textDecoration: "none" }}>
                        {title}
                    </Link>
                </Card.Title>
                <hr />
                <Nav className="flex-column">
                    {items.slice(1).map((item) => (
                        <Nav.Item key={item.eventKey}>
                            <Nav.Link
                            href={item.href}
                            eventKey={item.eventKey}
                            onSelect={handleSelect}
                            active={selectedKey === item.eventKey}
                            className={selectedKey === item.eventKey ? "text-light bg-dark rounded" : "text-dark p-1"}
                            >
                                <div className="fs-4 fw-bold"
                                onMouseEnter={(e) => { 
                                    if (selectedKey !== item.eventKey) {
                                        e.target.className = "fs-4 fw-bold text-light bg-dark rounded px-2";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedKey !== item.eventKey) {
                                        e.target.className = "fs-4 fw-bold text-dark";
                                    }
                                }}
                                >
                                    {item.label}
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </Card.Body>
        </Card>
    );
}



export const MyPageSideBar = (props) => {
    const items = [
        { eventKey: 1, href: '/my-page', label: '마이페이지'},
        { eventKey: 2, href: '/my-page/diet', label: '식단추천'},
        { eventKey: 3, href: '/my-page/routine', label: '루틴추천'},
        { eventKey: 4, href: '/my-page/bmi', label: '체질량지수(BMI)'},
    ];

    return <BaseSideBar title="마이페이지" items={items} />;
}


export const SupportSideBar = (props) => {
    const items = [
        { eventKey: 1, href: '/support/faqboard', label: 'FAQ'},
        { eventKey: 1, href: '/support/faqboard', label: 'FAQ'},
        { eventKey: 2, href: '/support/qnaboard', label: 'Q&A'},
        { eventKey: 3, href: '/support/freeboard', label: '자유게시판'},
        { eventKey: 4, href: '/support/livechat', label: 'LiveChat'},
    ];

    return <BaseSideBar title="Support" items={items} />;
}
