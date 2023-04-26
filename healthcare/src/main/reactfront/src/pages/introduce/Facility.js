import bg_black from '../../assets/images/bg_black.jpg'
import '../../styles/Facility.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import SideBar from "../../components/introduce/SideBar";
import { createFacilityV1, deleteFacilityV1, fetchFacilitiesV1, updateFacilityV1 } from '../../api/Introduce/FacilityAPI';

const FacilityAddForm = (props) => {
    const [values, setValues] = useState({
        sectorName: "",
        sectorInfo: "",
        secretYn: false,
    });

    const handleChange = async (e) => {
        e.preventDefault();
        setValues({...values,
            [e.target.id]: e.target.value
        });
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        props.setShowAddForm(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        createFacilityV1(values)
        .then(() => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Card border="dark">
            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="title"><h5><strong>시설 이름</strong></h5></label>
                        <input type="text" className="form-control" id="sectorName" onChange={handleChange} value={ values.sectorName } />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="content"><h5><strong>시설 설명</strong></h5></label>
                        <textarea className="form-control" id="sectorInfo" rows={3} onChange={handleChange} value={ values.sectorInfo } />
                    </div>
                    <div className="form-group d-flex justify-content-end">
                        <Button className="me-1" variant="dark" style={{ width: "100px" }}
                        type="submit" >추가</Button>
                        <Button className="ms-1" variant="danger" style={{ width: "100px" }}
                        onClick={handleCancel} >취소</Button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}

const FacilityEditForm = (props) => {
    const { facility } = props;
    const [values, setValues] = useState(facility);

    const handleChange = async (e) => {
        e.preventDefault();
        setValues({...values,
            [e.target.id]: e.target.value
        });
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        props.setShowEditForm(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateFacilityV1(facility.id ,values)
        .then(() => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="title"><h5><strong>시설 이름</strong></h5></label>
                        <input type="text" className="form-control" id="sectorName" onChange={handleChange} value={ values.sectorName } />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="content"><h5><strong>시설 설명</strong></h5></label>
                        <textarea className="form-control" id="sectorInfo" rows={3} onChange={handleChange} value={ values.sectorInfo } />
                    </div>
                    <div className="form-group d-flex justify-content-end">
                        <Button className="me-1" variant="primary" style={{ width: "100px" }}
                        type="submit" >수정</Button>
                        <Button className="me-1" variant="danger" style={{ width: "100px" }}
                        onClick={handleCancel} >취소</Button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}

const FacilityItem = (props) => {
    const { facility } = props;
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = async (params, e) => {
        e.preventDefault();
        deleteFacilityV1(params)
        .then((response) => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="d-flex justify-content-start mt-4 mb-2">
            <div className="me-2">
                <img
                    className="rounded"
                    src={bg_black}
                    width="100%"
                    height="100%"
                    alt="profile"
                    // style={{ maxWidth: "100", maxHeight: "100" }} https://www.youtube.com/watch?v=QvQsuAaUwxo 참고
                />
            </div>
            <div className="flex-fill ms-2">
                <div><h2>{facility.sectorName}</h2></div>
                <hr/>
                <div>{facility.sectorInfo}</div>
                        {showEditForm
                        ?
                            <FacilityEditForm facility={facility} setShowEditForm={setShowEditForm} />
                        :
                            <div className="d-flex justify-content-end">
                                <Button className="me-1" variant="primary" style={{ width: "100px" }}
                                onClick={(e) => { setShowEditForm(!showEditForm) }}>수정</Button>
                                <Button className="me-1" variant="danger" style={{ width: "100px" }}
                                onClick={(e) => { handleDelete(facility.id, e) }}>삭제</Button>
                            </div>
                        }
                </div>
        </div>
    );
}

export default function Facility() {
    const [facilities, setFacilities] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchFacilitiesV1()
        .then((response) => {
            setFacilities(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SideBar />
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card>
                        <Card.Body>
                            <Card.Title><h2><strong>Facility</strong></h2></Card.Title>
                            <hr/>
                            {facilities.map((facility, index) => (
                                <FacilityItem key={index} facility={facility} />    
                            ))}                          
                        </Card.Body>
                    </Card>
                </Col>
                {!showAddForm
                    ?
                        <div className="d-flex justify-content-end mt-3">
                            <Button className="me-1" variant="dark" style={{ width: "100px" }}
                            onClick={() => { setShowAddForm(!showAddForm) }}>추가</Button>
                        </div>
                    :
                        <div className="mt-4">
                            <FacilityAddForm setShowAddForm={setShowAddForm} />
                        </div>
                    }
            </Row>
        </Container>
    );
}