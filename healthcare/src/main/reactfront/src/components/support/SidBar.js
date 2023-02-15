import React from "react";
import axios from "axios";
import { Card, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const basicStyle = {
    color: "white",
    background: "teal",
    padding: ".375rem .75rem",
    border: "1px solid teal",
    borderRadius: ".25rem",
    fontSize: "1rem",
    lineHeight: 1.5,
}

const menuStyle = {
    color: "black",
    cursor: "pointer",
    fontSize: "1.5rem",
    fontWeight: "bolder",
    // background: "lightgray",
    lineHeight: 1,
};

export default function SideBar() {
    const isActive = (path) => {
        return window.location.pathname.startsWith(path);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title><h2><strong><i>Support</i></strong></h2></Card.Title>
                    <hr/>
                    <Card.Text>
                        <Nav variant="pills" defaultActiveKey="/support/freeboard" className="flex-column">
                            <Nav.Link href="/support/faqboard" style={menuStyle}><b>FAQ</b></Nav.Link>
                            <Nav.Link href="/support/qnaboard" style={menuStyle}>Q&A</Nav.Link>
                            <Nav.Link href="/support/freeboard" style={menuStyle}>자유게시판</Nav.Link>
                            <Nav.Link href="/support/livechat" style={menuStyle}>LiveChat</Nav.Link>
                        </Nav>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}