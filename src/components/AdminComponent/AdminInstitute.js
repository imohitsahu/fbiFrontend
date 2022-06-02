import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap'
import "./AdstudentList.css"
import AdminNav from "./AdminNav";
import AdminHeader from "./AdminHeader";
import LoginService from '../../services/LoginService';
import InstituteService from '../../services/InstituteService'


export default function AllInstitute() {
    const history = useNavigate()
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        LoginService.getAdmin()
            .then((getcred) => {
                InstituteService.getAll()
                    .then((getData) => {
                        setApiData(getData.data);
                    })
            })
            .catch((error) => {
                history("/")
            })

    }, [])

    const getData = () => {
        InstituteService.getAll()
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const onDelete = (email) => {
        if (window.confirm('Are you sure ! You want to delete this account')) {
            InstituteService.delete(email)
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
            <div className="tab-pane fade show active">
                <div className="p-3  mx-auto text-center">
                    <table className="table table-responsive mx-auto table-striped table-hover" id="table-id">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Institute Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Map</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apiData.map((data, knox) => {
                                index++
                                return (
                                    <tr key={knox}>
                                        <td>{index}</td>
                                        <td>{data.insName}</td>
                                        <td>{data.email}</td>
                                        <td>{data.contactNo}</td>
                                        <td>{data.city}</td>
                                        <td>{data.state}</td>
                                        <td>
                                            <a href={data.map} target="blank">Map</a>
                                        </td>
                                        <td>
                                            <Button onClick={() => onDelete(data.email)} variant="secondary" style={{ backgroundColor: "#bd2130" }} >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

