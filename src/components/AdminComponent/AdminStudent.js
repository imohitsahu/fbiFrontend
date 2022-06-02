import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap'
import "./AdstudentList.css"
import AdminNav from "./AdminNav";
import AdminHeader from "./AdminHeader";
import StudentService from '../../services/StudentService'
import LoginService from "../../services/LoginService";
import { useNavigate } from 'react-router-dom';

export default function AllStudent() {
    const history = useNavigate()
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        LoginService.getAdmin()
            .then((getcred) => {
                StudentService.getAll()
                    .then((getData) => {
                        setApiData(getData.data);
                    })
            })
            .catch((error) => {
                history("/")
            })

    }, [])

    const getData = () => {
        StudentService.getAll()
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const onDelete = (email) => {
        if (window.confirm('You want to delete this account Are you sure')) {
            StudentService.delete(email)
                .then(() => {
                    getData();
                })
        }
    }
    let index = 0

    return (
        <div>
            <AdminHeader />
            <AdminNav />
            <div className='tab-pane fade show active'>
                <div className="p-3  mx-auto text-center">
                    <table className="table table-responsive mx-auto table-striped ">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apiData.map((data, knox) => {
                                index++
                                return (
                                    <tr key={knox}>
                                        <td>{index}</td>
                                        <td>{data.stuName}</td>
                                        <td>{data.email}</td>
                                        <td>{data.contactNo}</td>
                                        <td>{data.city}</td>
                                        <td>{data.state}</td>
                                        <td>
                                            <Button variant="secondary" style={{ backgroundColor: "#bd2130" }} onClick={() => onDelete(data.email)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    <div className='pagination-container'>
                        <nav>
                            <ul className="pagination">
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

