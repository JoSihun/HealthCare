import user_pic from '../../assets/images/user_pic.jpg'
import '../../styles/Staff.css'
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import SideBar from "../../components/introduce/SideBar";
import { fetchStaffV1, deleteStaffV1, createStaffV1 } from '../../api/Introduce/StaffAPI';
import { searchUsers } from '../../api/UserAPI';

const UserList = (props) => {
    const { users } = props;

    return (
        <div>
            {users.map((user, index) => (
                <div key={index}>
                    <p>
                        {user.username}&nbsp;
                        {user.email}&nbsp;
                        {user.contact}
                    </p>
                </div>
            ))}
        </div>
    );
}

const SearchForm = (props) => {
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState({
        username: "",
    });
    
    const handleChange = async (e) => {
        e.preventDefault();
        setValue({...value,
            [e.target.id]: e.target.value,
        });
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        props.setShowAddForm(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        searchUsers(value)
        .then((response) => {
            setUsers(response);
        }).catch((error) => {
            console.log(error);
        });       
    }
    
    return (
        <Card border="dark">
            <Card.Body>
                {users && <UserList users={users} />}
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="username"><h5><strong>USERNAME</strong></h5></label>
                        <input type="text" className="form-control" id="username" onChange={handleChange} value={ value.username } />
                    </div>
                    <div className="form-group d-flex justify-content-end">
                        <Button className="me-1" variant="primary" style={{ width: "100px" }}
                        type="submit" >검색</Button>
                        <Button className="ms-1" variant="danger" style={{ width: "100px" }}
                        onClick={handleCancel} >취소</Button>
                    </div>
                </form>
            </Card.Body>
        </Card>        
    );    
    
}

const AddForm = (props) => {
    const [value, setValue] = useState("");


    const handleValue = async (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        props.setShowAddForm(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        createStaffV1(value)
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
                        <label htmlFor="title"><h5><strong>USERNAME</strong></h5></label>
                        <input type="text" className="form-control" id="username" onChange={handleValue} value={ value } />
                    </div>
                    <div className="form-group d-flex justify-content-end">
                        <Button className="me-1" variant="primary" style={{ width: "100px" }}
                        type="submit" >검색</Button>
                        <Button className="ms-1" variant="danger" style={{ width: "100px" }}
                        onClick={handleCancel} >취소</Button>
                    </div>
                </form>
            </Card.Body>
        </Card>        
    );
}

const StaffItem = (props) => {
    const { staff } = props;

    const handleDelete = async (params, e) => {
        e.preventDefault();
        deleteStaffV1(params)
        .then((response) => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }

    return(
        <Row className="my-md-3">
            <Col className="col-md-6">
                <Card className='w-100'>
                    <Card.Body>
                        <Col className="col-md-2">
                            <img
                                className="rounded"
                                src={user_pic}
                                width="100"
                                height="100"
                                alt="profile"
                            />
                        </Col>
                        <Col className="col-md-4">
                            <div>역할: {staff.staffRole}</div>
                            <div>이름: {staff.userName}</div>
                            <div>연락처: {staff.contact}</div>
                        </Col>
                        <Button className="me-1" variant="danger" style={{ width: "100px" }}
                        onClick={(e) => { handleDelete(staff.id, e) }}>삭제</Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

function Staff() {
    const [staffs, setStaffs] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchStaffV1()
        .then((response) => {
            setStaffs(response);
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
                        <Card.Title><h2><strong>Staff</strong></h2></Card.Title>
                        <hr/>
                        {staffs.map((staff, index) => {
                            <StaffItem key={index} staff = {staff} />
                        })}                                          
                    </Card.Body>
                </Card>
                {!showAddForm
                    ?
                        <div className="d-flex justify-content-end mt-3">
                            <Button className="me-1" variant="dark" style={{ width: "100px" }}
                            onClick={() => { setShowAddForm(!showAddForm) }}>추가</Button>
                        </div>
                    :
                        <div className="mt-4">
                            <SearchForm setShowAddForm={setShowAddForm} />
                        </div>
                }
            </Col>
        </Row>
    </Container>
    );
}

export default Staff;