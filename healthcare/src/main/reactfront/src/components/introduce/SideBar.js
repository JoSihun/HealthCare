import React from "react";
import '../../styles/SideBar.css';
import { Card, Nav } from "react-bootstrap";

export default function SideBar() {
    const handleActiveKey = () => {
        const pathnames = [
            "/introduce/staff",
            "/introduce/facility",
            "/introduce/direction"
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
                    <Card.Title style={{ fontSize: "35px", fontWeight: "bold", fontStyle: "italic" }}>Introduce</Card.Title>
                    <hr/>
                    <Nav variant="pills" activeKey={handleActiveKey()} className="flex-column">
                        <Nav.Link eventKey="1" href="/introduce/staff" className="sidebar-item">Staff</Nav.Link>
                        <Nav.Link eventKey="2" href="/introduce/facility" className="sidebar-item">Facility</Nav.Link>
                        <Nav.Link eventKey="3" href="/introduce/direction" className="sidebar-item">Direction</Nav.Link>
                    </Nav>
                </Card.Body>
            </Card>
        </div>
    );
}