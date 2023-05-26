import user_pic from '../../assets/images/user_pic.jpg'
import '../../styles/Staff.css'
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Container, Table } from "react-bootstrap";
import SideBar from "../../components/introduce/SideBar";
import { fetchStaffV1, deleteStaffV1, createStaffV1 } from '../../api/Introduce/StaffAPI';
import { searchUserList } from '../../api/user/UserAPI';
import { Link } from 'react-router-dom';

const AddForm = (props) => {
    const { setUsers, handleShow } = props;
    const { selectedUser, setSelectedUser } = props;
    const [value, setValue] = useState({
        staffRole: "",
    });
    
    const handleChange = async (e) => {
        setValue({...value,
            [e.target.id]: e.target.value,
        });
    }
    
    const handleCancel = async (e) => {
        setSelectedUser({});
        handleShow();
        setUsers([]);
    }

    const handleSubmit = async (e) => {
        createStaffV1(selectedUser.id, value)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    return(
        <div className='d-flex justify-content-center'>
            <form className='w-75' onSubmit={handleSubmit}>
                <div className='form-group input-group mb-3'>
                    <label className='input-group-text'>이름</label>
                    <input className='form-control' id="username" type='text' value={selectedUser.username || ""} readOnly />
                    <label className='input-group-text'>이메일</label>
                    <input className='form-control' id="email" type='text' value={selectedUser.email || ""} readOnly />
                    <label className='input-group-text'>연락처</label>
                    <input className='form-control' id="contact" type='text' value={selectedUser.contact || ""} readOnly />
                </div>
                <div className='form-group input-group mb-3'>
                    <label className='input-group-text'>직책</label>
                    <input className='form-control' id="staffRole" type='text' onChange={handleChange} value={value.staffRole} 
                        placeholder='직책을 입력해주세요.' />
                </div>
                <div className='form-group d-flex justify-content-center'>
                    <Button className='me-1' type='submit' variant='primary'style={{ width: "100px" }}>추가</Button>
                    <Button className='ms-1' onClick={handleCancel} variant='danger'style={{ width: "100px" }}>취소</Button>
                </div>
            </form>
        </div>
    );
}

const UserItem = (props) => {
    const { user, setSelectedUser } = props;

    const handleClick = async (e) => {
        setSelectedUser(user);
    }

    return (
        <tr>
            <td className='text-start'>{user.username}</td>
            <td className='text-start'>{user.email}</td>
            <td className='text-start'>{user.contact}</td>
            <td className='text-center'>
                <Button onClick={handleClick} variant="dark" style={{ width: "100px" }}>
                    선택
                </Button>
            </td>
        </tr>
    );
}

const UserList = (props) => {
    const { users, setSelectedUser } = props;

    return (
        <Table responsive hover>
            <thead>
                <tr>
                    <th className='col-3 text-start'>이름</th>
                    <th className='col-3 text-start'>이메일</th>
                    <th className='col-3 text-start'>연락처</th>
                    <th className='col-3 text-center'>추가</th>
                </tr> 
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <UserItem key={index} user={user} setSelectedUser={setSelectedUser} />
                ))}
            </tbody>
        </Table>
    );
}

const SearchForm = (props) => {
    const { setUsers } = props;
    const [value, setValue] = useState({
        username: ""
    });

    const handleChange = async (e) => {
        setValue({...value,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        searchUserList(value)
        .then((response) => {
            setUsers(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username"><h5><strong>USERNAME 검색</strong></h5></label>
                <div className='d-flex justyfy-content-between'>
                    <input type="text" className="form-control" id="username" onChange={handleChange} value={ value.username } />
                    <Button className="ms-1" variant="primary" style={{ width: "100px" }} type="submit" >검색</Button>
                </div>
            </div>
        </form>
    );
}

const UserSearch = (props) => {
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    const handleShow = async (e) => {
        setShow(!show);
    }

    return (show ? (
        <Card>
            <Card.Body className='pb-0'>
                <Card.Title>
                    <h4><strong>Staff 추가</strong></h4>
                </Card.Title>
                <hr/>
            </Card.Body>
            <Card.Body className='pt-0 pb-4'>
                <SearchForm setUsers={setUsers} />
            </Card.Body>
            <Card.Body className='border-top border-bottom border-2 pt-0'>
                <UserList users={users} setSelectedUser={setSelectedUser} />
            </Card.Body>
            <Card.Body>
                <AddForm selectedUser={selectedUser} setSelectedUser={setSelectedUser}
                    handleShow={handleShow} setUsers={setUsers} />
            </Card.Body>
        </Card>
    ) : (
        <div className='d-flex justify-content-end mb-3'>
            <Button onClick={handleShow} variant='dark' style={{ width: "100px" }}>추가</Button>
        </div>
    ));
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
    
    return (
        <Card>
            <Card.Body className='pb-2'>
                <div className='d-flex justify-content-start'>
                    <div className='me-2'>
                        <img
                        className="rounded"
                        src={user_pic}
                        width="100"
                        height="100"
                        alt="profile"
                        />
                    </div>
                    <div className='ms-2'>
                        <div>이&nbsp;&nbsp;&nbsp;름: {staff.user.username}</div>
                        <div>직&nbsp;&nbsp;&nbsp;책: {staff.staffRole}</div>
                        <div>연락처: {staff.user.contact}</div>
                        <div>이메일: {staff.user.email}</div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <Link className='text-secondary' style={{ textDecoration: "none" }}>
                        <small>수정</small>
                    </Link>
                    &nbsp;/&nbsp;
                    <Link className='text-secondary' style={{ textDecoration: "none" }}
                        onClick={(e) => { handleDelete(staff.id, e) }}>
                        <small>삭제</small>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}

const StaffList = (props) => {
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
        <Card className='mb-3'>
            <Card.Body className='pb-0'>
                <Card.Title>
                    <h2><strong>Staff</strong></h2>
                </Card.Title>
                <hr/>
            </Card.Body>
            <Card.Body className='py-0'>
                <Row className='justify-content-start'>
                    {staffs.map((staff, index) => (
                        <Col className='col-12 col-lg-6 mb-3' key={index}>
                            <StaffItem staff={staff} />
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );
}

export default function Staff() {
    return (
        <Container fluid>
            <Row className='justify-content-center mt-3'>
                <Col className='col-12 col-lg-2 mb-3'>
                    <SideBar />
                </Col>
                <Col className='col-12 col-lg-9 mb-3'>
                    <StaffList />
                    <UserSearch />
                </Col>
            </Row>
        </Container>
    );
}
