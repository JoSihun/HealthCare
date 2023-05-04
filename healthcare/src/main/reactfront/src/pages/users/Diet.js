import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { createDiet, deleteDiet, fetchDiets, fetchRecommendFoods } from "../../api/DietAPI";
import { useSearchParams } from "react-router-dom";
import { fetchBMI, fetchBMIList } from "../../api/BMIAPI";
import Paging from "../../components/support/Paging";

// const FoodList = (props) => {
//     const { foods } = props;
//     const [checkedFoods, setCheckedFoods] = useState([]);

//     const handleCheck = async (e) => {
//         if (e.target.checked) {
//             setCheckedFoods([...checkedFoods, parseInt(e.target.value)]);
//         } else {
//             setCheckedFoods(checkedFoods.filter((id) => id !== parseInt(e.target.value)));
//         }
//     }

//     return (
//         <Table striped bordered hover size='sm'>
//             <thead>
//                 <tr>
//                     <th className="text-center" style={{ width: "3%" }}>선택</th>
//                     <th className="text-center" style={{ width: "15%" }}>음식명</th>
//                     <th className="text-center" style={{ width: "5%" }}>중량(g)</th>
//                     <th className="text-center" style={{ width: "5%" }}>열량(kcal)</th>
//                     <th className="text-center" style={{ width: "7%" }}>탄수화물(g)</th>
//                     <th className="text-center" style={{ width: "5%" }}>단백질(g)</th>
//                     <th className="text-center" style={{ width: "5%" }}>지방(g)</th>
//                     <th className="text-center" style={{ width: "5%" }}>당류(g)</th>
//                     <th className="text-center" style={{ width: "5%" }}>나트륨(g)</th>
//                     <th className="text-center" style={{ width: "7%" }}>콜레스테롤(g)</th>
//                     <th className="text-center" style={{ width: "7%" }}>포화지방산(g)</th>
//                     <th className="text-center" style={{ width: "7%" }}>트랜스지방산(g)</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {foods.map((food, index) => (
//                     <tr key={index}>
//                         <td className="text-center">
//                             <input type="checkbox" className="form-check-input" name="foodId" value={food.id || ''} onChange={handleCheck}/>
//                         </td>
//                         <td className="text-center">{food.name}</td>
//                         <td className="text-end">{food.weight}g</td>
//                         <td className="text-end">{food.calories}kcal</td>
//                         <td className="text-end">{food.carbohydrates}g</td>
//                         <td className="text-end">{food.proteins}g</td>
//                         <td className="text-end">{food.fats}g</td>
//                         <td className="text-end">{food.sugars}g</td>
//                         <td className="text-end">{food.sodium}g</td>
//                         <td className="text-end">{food.cholesterol}g</td>
//                         <td className="text-end">{food.saturatedFattyAcids}g</td>
//                         <td className="text-end">{food.transFattyAcids}g</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </Table>
//     );
// }

// const Recommend = (props) => {
//     const [bmis, setBmis] = useState([]);
//     const [foods, setFoods] = useState([]);
//     const [selectedBmi, setSelectedBmi] = useState(null);
//     const [selectedFoods, setSelectedFoods] = useState([]);

//     useEffect(() => {
//         fetchBMIList()
//         .then((response) => {
//             setBmis(response);
//             setSelectedBmi(response[0].id);
//         }).catch((error) => {
//             console.log(error);
//         });
//     }, []);

//     const handleSelectBmi = async (e) => {
//         setSelectedBmi(e.target.value);
//     }

//     const handleCheckbox = async (e) => {
//         if (e.target.checked) {
//             setSelectedFoods([...selectedFoods, parseInt(e.target.value)]);
//         } else {
//             setSelectedFoods(selectedFoods.filter((id) => id !== parseInt(e.target.value)));
//         }
//         console.log(selectedFoods);
//     }

//     const handleRecommend = async (e) => {
//         fetchRecommendFoods(selectedBmi)
//         .then((response) => {
//             setFoods(response);
//         }).catch((error) => {
//             console.log(error);
//         });
//     }

//     const handleSubmit = async (e) => {
//         createDiet(selectedFoods)
//         .then((response) => {
//             console.log(response);
//         }).catch((error) => {
//             console.log(error);
//         })
//     }

//     return (
//         <Card>
//             <Card.Body>
//                 <Card.Title><h2><strong>추천식단</strong></h2></Card.Title>
//                 <hr/>

//                 <div className="d-flex justify-content-between mb-3">
//                     <select className="text-start" style={{ minWidth: "50%" }}
//                         onChange={handleSelectBmi} defaultValue={0}>
//                         {bmis.slice(0).reverse().map((bmi, index) => (
//                             <option value={bmi.id} key={index}>
//                                 {index + 1}: 
//                                 측정일자: {bmi.createdDate} | 
//                                 BMI: {bmi.bodyMassIndex.toFixed(2)}%, | 
//                                 기초대사량: {bmi.basalMetabolicRate}Kcal
//                             </option>
//                         ))}
//                     </select>

//                     <select className="text-center" style={{ minWidth: "7%" }}>
//                         <option value={5}>5개씩</option>
//                         <option value={10}>10개씩</option>
//                         <option value={20}>20개씩</option>
//                     </select>
//                 </div>


//                 <form onSubmit={handleSubmit}>
//                     <div className="border border-2 border-dark">
//                         <Table striped bordered hover size='sm'>
//                             <thead>
//                                 <tr>
//                                     <th className="text-center" style={{ width: "3%" }}>선택</th>
//                                     <th className="text-center" style={{ width: "15%" }}>음식명</th>
//                                     <th className="text-center" style={{ width: "5%" }}>중량(g)</th>
//                                     <th className="text-center" style={{ width: "5%" }}>열량(kcal)</th>
//                                     <th className="text-center" style={{ width: "7%" }}>탄수화물(g)</th>
//                                     <th className="text-center" style={{ width: "5%" }}>단백질(g)</th>
//                                     <th className="text-center" style={{ width: "5%" }}>지방(g)</th>
//                                     <th className="text-center" style={{ width: "5%" }}>당류(g)</th>
//                                     <th className="text-center" style={{ width: "5%" }}>나트륨(g)</th>
//                                     <th className="text-center" style={{ width: "7%" }}>콜레스테롤(g)</th>
//                                     <th className="text-center" style={{ width: "7%" }}>포화지방산(g)</th>
//                                     <th className="text-center" style={{ width: "7%" }}>트랜스지방산(g)</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {foods.map((food, index) => (
//                                     <tr key={index}>
//                                         <td className="text-center">
//                                             <input type="checkbox" className="form-check-input" name="foodId" value={food.id || ''} onChange={handleCheckbox}/>
//                                         </td>
//                                         <td className="text-center">{food.name}</td>
//                                         <td className="text-end">{food.weight}g</td>
//                                         <td className="text-end">{food.calories}kcal</td>
//                                         <td className="text-end">{food.carbohydrates}g</td>
//                                         <td className="text-end">{food.proteins}g</td>
//                                         <td className="text-end">{food.fats}g</td>
//                                         <td className="text-end">{food.sugars}g</td>
//                                         <td className="text-end">{food.sodium}g</td>
//                                         <td className="text-end">{food.cholesterol}g</td>
//                                         <td className="text-end">{food.saturatedFattyAcids}g</td>
//                                         <td className="text-end">{food.transFattyAcids}g</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     </div>

//                     <div className="d-flex justify-content-end mt-3">
//                         <Button className="me-1" onClick={handleRecommend} variant="success" style={{ minWidth: "7%" }}>추천식단</Button>
//                         <Button className="ms-1" type="submit" variant="dark" style={{ minWidth: "7%" }}>식단추가</Button>
//                     </div>
//                 </form>
//             </Card.Body>
//         </Card>
//     );
// }


const RecommendedFoods = (props) => {
    const [bmis, setBmis] = useState([]);
    const [foods, setFoods] = useState([]);
    const [checkedBoxes, setCheckedBoxes] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [selectedBmiId, setSelectedBmiId] = useState(null);
    const [selectedBmiData, setSelectedBmiData] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        totalCalories: 0,
        basalMetabolicRate: 0,
        recommendedCaloriesIntake: 0,
        foodIds: [],
    });

    useEffect(() => {
        fetchBMIList()
        .then((response) => {
            setBmis(response);
            setSelectedBmiId(response[0].id);
            setSelectedBmiData(response[0]);
            
            setFormData(prevFormData => ({...prevFormData,
                basalMetabolicRate: response[0].basalMetabolicRate * 1.00,
                recommendedCaloriesIntake: response[0].basalMetabolicRate * 1.55,
            }));
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleBmiSelect = async (e) => {
        setSelectedBmiId(e.target.value);
        fetchBMI(e.target.value)
        .then((response) => {
            setSelectedBmiData(response);

            setFormData({...formData,
                basalMetabolicRate: response.basalMetabolicRate * 1.00,
                recommendedCaloriesIntake: response.basalMetabolicRate * 1.55,
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        const checkedBoxIds = checkedBoxes.filter((checkBox) => checkBox.checked).map((checkBox) => checkBox.id);
        const checkedFoods = foods.filter((food) => checkedBoxIds.includes(food.id));
        const sumCalories = checkedFoods.reduce((total, food) => total + food.calories, 0);
        setTotalCalories(sumCalories);
      
        setFormData((prevFormData) => ({...prevFormData,
            totalCalories: sumCalories,
            foodIds: checkedBoxIds,
        }));
    }, [foods, checkedBoxes, setFormData, setTotalCalories]);

    const handleRecommend = async (e) => {
        fetchRecommendFoods(selectedBmiId)
        .then((response) => {
            setFoods(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleChange = async (e) => {
        setFormData({...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        createDiet(formData)
        .then(() => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <Row className="justify-content-center">
            <Col className="col-md-12">
                <Card>
                    <Card.Body>
                        <Card.Title><h2><strong>추천식단</strong></h2></Card.Title>
                        <hr/>

                        <div className="d-flex justify-content-between mb-3">
                            <select className="text-start" style={{ minWidth: "50%" }}
                            onChange={handleBmiSelect} defaultValue={0}>
                                {bmis.slice(0).reverse().map((bmi, index) => (
                                    <option value={bmi.id} key={index}>
                                        {index + 1}: 측정일자 {bmi.createdDate} |
                                        체질량지수(BMI): {bmi.bodyMassIndex.toFixed(2)}% |
                                        기초대사량: {bmi.basalMetabolicRate}Kcal
                                    </option>
                                ))}
                            </select>
                            {/* <select className="text-center" style={{ minWidth: "7%" }}>
                                <option value={5}>5개씩</option>
                                <option value={10}>10개씩</option>
                                <option value={20}>20개씩</option>
                            </select> */}
                        </div>

                        <div className="d-flex justify-content-around mb-3">
                            <div><strong>칼로리총합:</strong> {totalCalories.toFixed(2) + "Kcal"}</div>
                            <div><strong>권장섭취량:</strong> {selectedBmiData ? (selectedBmiData.basalMetabolicRate * 1.55).toFixed(2) + "Kcal" : "-"}</div>
                            <div><strong>기초대사량:</strong> {selectedBmiData ? (selectedBmiData.basalMetabolicRate * 1.00).toFixed(2) + "Kcal" : "-"}</div>
                        </div>

                        <FoodList foods={foods} setCheckedBoxes={setCheckedBoxes} />

                        <form className="d-flex justify-content-end" onSubmit={handleSubmit}>
                            <div className="form-group input-group me-1" style={{ width: "50%"}}>
                                <label className="input-group-text">식단명</label>
                                <input className="form-control" name="title" type="text" onChange={handleChange} value={formData.title} />
                            </div>
                            <Button className="mx-1" onClick={handleRecommend} variant="success" style={{ width: "7%" }}>추천식단</Button>
                            <Button className="ms-1" type="submit" variant="dark" style={{ width: "7%" }}>식단추가</Button>
                        </form>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

const FoodList = (props) => {
    const { foods } = props;
    const { setCheckedBoxes } = props;
    const checkBoxRefs = useRef([]);
    const [checkBoxes, setCheckBoxes] = useState([]);

    useEffect(() => {
        checkBoxRefs.current.map(current => current.checked = false);
        setCheckBoxes(
            foods.map((food) => {
                return { id: food.id, checked: false};
            }),
        )
    }, [foods]);

    const handleCheck = async (e, index) => {
        const updatedCheckBoxes = checkBoxes.map((checkBox) => {
            if (checkBox.id === parseInt(e.target.value)) {
                return {...checkBox, checked: !checkBox.checked};
            }
            return checkBox;
        });
        setCheckBoxes(updatedCheckBoxes);
        setCheckedBoxes(updatedCheckBoxes);
    };
    
    const handleCheckAll = async (e) => {
        const checkedBoxes = checkBoxes.filter(checkBox => checkBox.checked);
        const isChecked = checkBoxes.length !== checkedBoxes.length;
      
        const updatedCheckBoxes = checkBoxes.map((checkBox) => {
            checkBoxRefs.current.map(current => current.checked = isChecked);
            return {...checkBox, checked: isChecked};
        });
        setCheckBoxes(updatedCheckBoxes);
        setCheckedBoxes(updatedCheckBoxes);
    }

    return (
        <Table bordered hover size="sm">
            <thead>
                <tr>
                    <th className="text-center" style={{ width: "3%" }}>
                        <input type="checkbox" onChange={handleCheckAll} checked={foods.length === checkBoxes.filter(checkBox => checkBox.checked).length}/>
                    </th>
                    <th className="text-center" style={{ width: "15%" }}>음식명</th>
                    <th className="text-center" style={{ width: "5%" }}>중량(g)</th>
                    <th className="text-center" style={{ width: "5%" }}>열량(kcal)</th>
                    <th className="text-center" style={{ width: "7%" }}>탄수화물(g)</th>
                    <th className="text-center" style={{ width: "5%" }}>단백질(g)</th>
                    <th className="text-center" style={{ width: "5%" }}>지방(g)</th>
                    <th className="text-center" style={{ width: "5%" }}>당류(g)</th>
                    <th className="text-center" style={{ width: "5%" }}>나트륨(g)</th>
                    <th className="text-center" style={{ width: "7%" }}>콜레스테롤(g)</th>
                    <th className="text-center" style={{ width: "7%" }}>포화지방산(g)</th>
                    <th className="text-center" style={{ width: "7%" }}>트랜스지방산(g)</th>
                </tr>
            </thead>
            <tbody>
                {foods.map((food, index) => (
                    <tr key={index}>
                        <td className="text-center">
                            <input type="checkbox" value={food.id}
                                ref={(e) => (checkBoxRefs.current[index] = e)}
                                onChange={(e) => handleCheck(e, index)}/>
                        </td>
                        <td className="text-center">{food.name}</td>
                        <td className="text-end">{food.weight}g</td>
                        <td className="text-end">{food.calories}kcal</td>
                        <td className="text-end">{food.carbohydrates}g</td>
                        <td className="text-end">{food.proteins}g</td>
                        <td className="text-end">{food.fats}g</td>
                        <td className="text-end">{food.sugars}g</td>
                        <td className="text-end">{food.sodium}g</td>
                        <td className="text-end">{food.cholesterol}g</td>
                        <td className="text-end">{food.saturatedFattyAcids}g</td>
                        <td className="text-end">{food.transFattyAcids}g</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

const EditForm = (props) => {
    const { diet } = props;
    const { setShowEditForm } = props;

    const handleDelete = async (e) => {
        deleteDiet(diet.id)
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <Row className="justify-content-center mb-3">
            <Col className="col-md-12">
                <Card>
                    <Card.Body>                        
                        <div className="d-flex justify-content-between">
                            <div>
                                <h2><strong>{diet.title}</strong></h2>
                            </div>
                            <div style={{ color: "gray"}}>
                                <div><small>식단생성일: {diet.createdDate}</small></div>
                                <div><small>식단수정일: {diet.updatedDate}</small></div>
                            </div>
                        </div>

                        <hr/>
                        
                        <div className="d-flex justify-content-around mb-3">
                            <div><strong>칼로리총합:</strong> {diet.totalCalories ? diet.totalCalories.toFixed(2) + "Kcal" : "-"}</div>
                            <div><strong>권장섭취량:</strong> {diet.recommendedCaloriesIntake ? diet.recommendedCaloriesIntake.toFixed(2) + "Kcal" : "-"}</div>
                            <div><strong>기초대사량:</strong> {diet.basalMetabolicRate ? diet.basalMetabolicRate.toFixed(2) + "Kcal" : "-"}</div>
                        </div>

                        <FoodList foods={diet.foods} />
                        
                        <div className="d-flex justify-content-between">
                            <div style={{ width: "7%" }}>
                                <Button onClick={handleDelete} className="ms-1" variant="danger" style={{ width: "100%" }}>삭제</Button>
                            </div>
                            <div className="d-flex" style={{ width: "14%" }}>
                                <Button className="me-1" variant="primary" style={{ width: "100%" }}>수정</Button>
                                <Button onClick={() => {setShowEditForm(false)}} className="ms-1" variant="dark" style={{ width: "100%" }}>닫기</Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

const DietItem = (props) => {
    const { index, diet } = props;
    const { editData, setEditData } = props;
    const { showEditForm, setShowEditForm } = props;

    const handleClick = async (e) => {
        if (showEditForm && editData.id === parseInt(e.target.parentNode.id)) {
          setShowEditForm(false);
        } else {
          setEditData(diet);
          setShowEditForm(true);
        }
    }

    return (
        <>
            <tr key={index} id={diet.id} onClick={handleClick}>
                <td className="text-center">{index}</td>
                <td className="text-start">{diet.title}</td>
                <td className="text-center">{diet.totalCalories ? diet.totalCalories.toFixed(2) + "Kcal" : "-"}</td>
                <td className="text-center">{diet.recommendedCaloriesIntake ? diet.recommendedCaloriesIntake.toFixed(2) + "Kcal" : "-"}</td>
                <td className="text-center">{diet.basalMetabolicRate ? diet.basalMetabolicRate.toFixed(2) + "Kcal" : "-"}</td>
                <td className="text-center">{diet.createdDate}</td>
                <td className="text-center">{diet.updatedDate}</td>
            </tr>
        </>
    )
}

const DietList = (props) => {
    const [data, setData] = useState({});
    const [diets, setDiets] = useState([]);

    const { editData, setEditData } = props;
    const { showEditForm, setShowEditForm } = props;
    
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page') ? searchParams.get('page') : 1;
    const size = searchParams.get('size') ? searchParams.get('size') : 10;

    useEffect(() => {
        fetchDiets(page, size)
        .then((response) => {
            setData(response)
            setDiets(response.content);
        }).catch((error) => {
            console.log(error);
        });
    }, [page, size]);

    return (
        <Row className="justify-content-center mb-3">
            <Col className="col-md-12">
                <Card>
                    <Card.Body>
                        <Card.Title><h2><strong>내 식단</strong></h2></Card.Title>
                        <hr/>
                        
                        <Table bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ width: "3%" }}>#</th>
                                    <th className="text-center" style={{ width: "30%" }}>식단명</th>
                                    <th className="text-center" style={{ width: "5%" }}>식단칼로리</th>
                                    <th className="text-center" style={{ width: "5%" }}>권장섭취량</th>
                                    <th className="text-center" style={{ width: "5%" }}>기초대사량</th>
                                    <th className="text-center" style={{ width: "7%" }}>식단생성일</th>
                                    <th className="text-center" style={{ width: "7%" }}>식단수정일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {diets.map((diet, index) => (
                                    <DietItem key={index} index={diets.length-index} diet={diet}
                                        editData={editData} setEditData={setEditData}
                                        showEditForm={showEditForm} setShowEditForm={setShowEditForm} />
                                ))}
                            </tbody>
                        </Table>

                        <Paging pages={data} searchParams={searchParams} setSearchParams={setSearchParams} />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default function Diet() {
    const [editData, setEditData] = useState({});
    const [showEditForm, setShowEditForm] = useState(false);

    return (
        <Container fluid>
            <Row className="justify-content-center my-3">
                <Col className="col-md-2">
                    <div className="h-100 border border-dark">
                        <h2><strong>Temp Side Menu</strong></h2>
                        <hr/>
                    </div>
                </Col>
                <Col className="col-md-10">
                    <DietList editData={editData} setEditData={setEditData}
                        showEditForm={showEditForm} setShowEditForm={setShowEditForm} />
                    {showEditForm && <EditForm diet={editData} setShowEditForm={setShowEditForm} /> }
                    <RecommendedFoods />

                    {/* <MyDietList /> */}
                    {/* <Recommend /> */}
                </Col>
            </Row>
        </Container>
    );
}
