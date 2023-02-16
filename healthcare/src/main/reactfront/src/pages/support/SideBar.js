import React, { useState } from "react";
import '../../styles/SideBar.css';
import { Card, Nav } from "react-bootstrap";

export default function SideBar() {
    const handleActiveKey = () => {
        const pathnames = [
            "/support/faqboard",
            "/support/qnaboard",
            "/support/freeboard",
            "/support/livechat"
        ]
        for (var i = 0; i < pathnames.length; i++) {
            if (window.location.pathname.includes(pathnames[i])) {
                return (i + 1).toString();
            }
        }
    }

    return (
        <div className="SideBar">
            <Card>
                <Card.Body>
                    <Card.Title><h2><strong><i>Support</i></strong></h2></Card.Title>
                    <hr/>
                    <Card.Text>
                        <Nav variant="pills" activeKey={handleActiveKey()} className="flex-column">
                            <Nav.Link eventKey="1" href="/support/faqboard" className="sidebar-item">FAQ</Nav.Link>
                            <Nav.Link eventKey="2" href="/support/qnaboard" className="sidebar-item">Q&A</Nav.Link>
                            <Nav.Link eventKey="3" href="/support/freeboard" className="sidebar-item">자유게시판</Nav.Link>
                            <Nav.Link eventKey="4" href="/support/livechat" className="sidebar-item">LiveChat</Nav.Link>
                        </Nav>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}