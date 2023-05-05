import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBMIPage } from "../../api/BMIAPI";
import Paging from "../../components/support/Paging";
import ChartComponent from "../../components/user/ChartComponent";
import { MyPageSideBar } from "../../components/SideBar";

// 추후 필요하면 주석해제해서 사용
// const CreateForm = (props) => {
//     const { setShowCreateForm } = props;
//     const [values, setValues] = useState({

//     });

//     const handleChange = async (e) => {
//         setValues({...values,
//             [e.target.id]: e.target.value,
//         });
//     }

//     const handleCancel = async (e) => {
//         setShowCreateForm(false);
//     }

//     const handleSubmit = async (e) => {

//     }

//     return (
//         <Card>
//             <Card.Body>
//                 <Card.Title><h2><strong>BMI 추가</strong></h2></Card.Title>
//                 <hr/>
//                 <form onSubmit={handleSubmit}>
//                     <Card.Title><h5><strong>기본 측정 정보</strong></h5></Card.Title>
//                     <div className="form-group input-group mb-2">
//                         <label className="input-group-text">신장</label>
//                         <input className="form-control" id="height" type="number" onChange={handleChange}></input>
//                     </div>

//                     <div className="form-group input-group mb-2">
//                         <label className="input-group-text">체중</label>
//                         <input className="form-control" id="weight" type="number" onChange={handleChange}></input>
//                     </div>

//                     <div className="form-group input-group mb-2">
//                         <label className="input-group-text">BMI</label>
//                         <input className="form-control" id="bodyMassIndex" type="number" onChange={handleChange}></input>
//                     </div>

//                     <div className="form-group input-group mb-2">
//                         <label className="input-group-text">체수분량</label>
//                         <input className="form-control" id="bodyWaterFraction" type="number" onChange={handleChange}></input>
//                     </div>

//                     <hr/>
//                     <Card.Title><h5><strong>체지방 & 골격근</strong></h5></Card.Title>
//                     <div className="form-group input-group mb-2">
//                         <label className="input-group-text">체지방률</label>
//                         <input className="form-control" id="fatRate" type="number" onChange={handleChange}></input>
//                     </div>

//                     <div className="form-group input-group mb-2">
//                         <label className="input-group-text">골격근량</label>
//                         <input className="form-control" id="musculoskeletalMass" type="number" onChange={handleChange}></input>
//                     </div>

//                     <div className="form-group input-group mb-2">
//                         <label className="input-group-text">체지방량</label>
//                         <input className="form-control" id="fatMass" type="number" onChange={handleChange}></input>
//                     </div>

//                     <div className="form-group input-group mb-2">
//                         <label className="input-group-text">골격근률</label>
//                         <input className="form-control" id="musculoskeletalRate" type="number" onChange={handleChange}></input>
//                     </div>

//                     <div className="form-group d-flex justify-content-center">
//                         <Button className="me-1" type="submit" variant="dark" style={{ minWidth: "7%"}}>저장</Button>
//                         <Button className="ms-1" onClick={handleCancel} variant="danger" style={{ minWidth: "7%"}}>취소</Button>
//                     </div>
//                 </form>
//             </Card.Body>
//         </Card>
//     );
// }

const BMIList = (props) => {
    const { page, data, pageSize } = props;
    const { searchParams, setSearchParams } = props;

    const handleSelect = async (e) => {
        searchParams.set("page", parseInt(page.pageable.offset / e.target.value) + 1);
        searchParams.set("size", e.target.value);
        props.setSearchParams(props.searchParams);
    }

    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
                <select className="text-center" style={{ minWidth: "7%" }}
                    onChange={handleSelect} value={pageSize}>
                    <option value={5}>5개씩</option>
                    <option value={10}>10개씩</option>
                    <option value={20}>20개씩</option>
                </select>
            </div>

            <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th className='text-center' style={{ width: "5%" }}>#</th>
                        <th className='text-center' style={{ width: "8%" }}>신장</th>
                        <th className='text-center' style={{ width: "8%" }}>체중</th>
                        <th className='text-center' style={{ width: "7%" }}>BMI</th>
                        <th className='text-center' style={{ width: "7%" }}>체지방률</th>
                        <th className='text-center' style={{ width: "8%" }}>골격근량</th>
                        <th className='text-center' style={{ width: "8%" }}>체지방량</th>
                        <th className='text-center' style={{ width: "7%" }}>골격근률</th>
                        <th className='text-center' style={{ width: "8%" }}>체수분량</th>
                        <th className='text-center' style={{ width: "15%" }}>측정일자</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{item.height}cm</td>
                            <td className='text-center'>{item.weight}kg</td>
                            <td className='text-center'>{item.bodyMassIndex}%</td>
                            <td className='text-center'>{item.fatRate}%</td>
                            <td className='text-center'>{item.musculoskeletalMass}kg</td>
                            <td className='text-center'>{item.fatMass}kg</td>
                            <td className='text-center'>{item.musculoskeletalRate}%</td>
                            <td className='text-center'>{item.bodyWaterFraction}l</td>
                            <td className='text-center'>{item.createdDate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paging pages={page} searchParams={searchParams} setSearchParams={setSearchParams} />
        </div>

    );
}

const BMIComponent = (props) => {
    const [page, setPage] = useState({});
    const [data, setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageNums = searchParams.get("page") ? searchParams.get("page") : 1;
    const pageSize = searchParams.get("size") ? searchParams.get("size") : 5;

    useEffect(() => {
        fetchBMIPage(pageNums, pageSize)
        .then((response) => {
            setPage(response)
            setData(response.content);
        }).catch((error) => {
            console.log(error);
        });
    }, [pageNums, pageSize]);

    return (
        <Card>
            <Card.Body>
                <Card.Title><h2><strong>BMI</strong></h2></Card.Title>
                <hr/>
                <ChartComponent data={data} size={pageSize} />
                <hr/>
                <BMIList page={page} data={data} searchParams={searchParams} setSearchParams={setSearchParams} />
            </Card.Body>
        </Card>
    );
}

export default function BMI() {
    // 추후 필요하면 주석해제해서 사용
    // const [showCreateForm, setShowCreateForm] = useState(false);

    return (
        <Container fluid>
            <Row className="justify-content-center my-3">
                <Col className="col-md-2">
                    <MyPageSideBar />
                </Col>
                <Col className="col-md-10">
                    <BMIComponent />
                </Col>
            </Row>

            {/* 추후 필요하면 주석해제해서 사용 */}
            {/* <Row className="justify-content-center mb-3">
                <Col className="col-md-2">
                    <div className="h-100 border border-dark">
                        <h2><strong>Empty Space</strong></h2>
                    </div>
                </Col>
                <Col className="col-md-10">
                    {showCreateForm
                    ?
                        <CreateForm showCreateForm={showCreateForm} setShowCreateForm={setShowCreateForm} />
                    :
                        <div className="d-flex justify-content-end">
                            <Button className="ms-1" onClick={() => {setShowCreateForm(true)}} variant="dark" style={{ minWidth: "7%"}}>추가</Button>
                        </div>
                    }
                </Col>
            </Row> */}
        </Container>
    );
}