import user_pic from '../../assets/images/user_pic.jpg'
import '../../styles/Staff.css'
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import SideBar from "../../components/introduce/SideBar";
import { fetchStaffV1, deleteStaffV1, createStaffV1 } from '../../api/Introduce/StaffAPI';
import { searchUsers } from '../../api/UserAPI';

const AddForm = (props) => {
    const { userId, setShowAddForm } = props;
    const [value, setValue] = useState({
        staffRole: "",
    });
    
    const handleChange = async (e) => {
        setValue({...value,
            [e.target.id]: e.target.value,
        });
    }
    
    const handleCancel = async (e) => {
        setShowAddForm(false);
    }

    const handleSubmit = async (e) => {
        createStaffV1(userId,value)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className='form-group input-group'>
                <label className='input-group-text'>직책</label>
                <input className='form-control' id="staffRole" type='text' onChange={handleChange}></input>
                <Button type='submit' variant='primary'>추가</Button>
                <Button onClick={handleCancel} variant='danger'>취소</Button>
            </div>
        </form>
    );
}

const UserItem = (props) => {
    const { user } = props;
    const [showAddForm, setShowAddForm] = useState(false);

    return (
        <div className='d-flex justify-content-between mb-2'>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{user.contact}</div>
            {showAddForm
            ?
                <AddForm userId={user.id} setShowAddForm={setShowAddForm} />
            :
                <Button onClick={() => { setShowAddForm(true) }} variant='warning'>+</Button>
            }
        </div>
    );
}

const UserList = (props) => {
    const { users } = props;

    return (
        <div>
            {users.map((user, index) => (
                <UserItem user={user} key={index} />
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
                {users
                ?
                    <UserList users={users} />
                :
                    <h5>해당정보를 찾을수 없습니다.</h5>
                }
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

const StaffItem = (props) => {
    const { staffs } = props;

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
            {staffs.map((staff, index) => (         
                <Col className="col-md-6" key={index} >
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
                                <div>이름: {staff.user.username}</div>
                                <div>연락처: {staff.user.contact}</div>
                                <div>이메일: {staff.user.email}</div>
                            </Col>
                            <Button className="me-1" variant="danger" style={{ width: "100px" }}
                            onClick={(e) => { handleDelete(staff.id, e) }}>삭제</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

function Staff() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [staffs, setStaffs] = useState([]);

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
                        <StaffItem staffs={staffs} />                                        
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