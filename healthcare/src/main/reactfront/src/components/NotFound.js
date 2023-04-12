import React from "react";

export default function NotFound() {
    return (
        <container fluid>
            <div className="d-flex justify-content-center" style={{ minHeight: "50vh" }}>
                <div className="align-self-center">
                    <div style={{ color: "red" }}>
                        <h1><strong>
                            [404 ERROR] Page NotFound
                        </strong></h1>
                    </div>
                    <div style={{ color: "black" }}>
                        <h1><strong><i>
                            페이지를 찾을 수 없습니다.<br/>
                        </i></strong></h1>
                    </div>
                </div>
            </div>
        </container>
    );
}
