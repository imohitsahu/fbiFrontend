import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import "./AdstudentList.css"
import AdminNav from "./AdminNav";
import AdminHeader from "./AdminHeader";
import EnquiryService from "../../services/EnquiryService";
import LoginService from "../../services/LoginService";

export default function AllEnquiries() {
    const [apiData, setApiData] = useState([]);
    const history = useNavigate()

    useEffect(() => {
        LoginService.getAdmin()
            .then((getcred) => {
                EnquiryService.getAll()
                    .then((getData) => {
                        setApiData(getData.data);
                    })
            })
            .catch((error) => {
                console.log(error)
                history("/")
            })

    }, [])

    const getData = () => {
        EnquiryService.getAll()
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const onDelete = (enqId) => {
        if (window.confirm('You want to delete this account Are you sure')) {
            EnquiryService.delete(enqId)
                .then(() => {
                    getData();
                })
        }
    }
    let index = 0;

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
                                <th>Student Email</th>
                                <th>Student Name</th>
                                <th>Institute Email</th>
                                <th>Course for Enquiry</th>
                                <th>phone no</th>
                                <th>Time</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apiData.map((data, inbox) => {
                                index++
                                return (
                                    <tr key={inbox}>
                                        <td>{index}</td>
                                        <td>{data.stuEmail}</td>
                                        <td>{data.stuName}</td>
                                        <td>{data.insEmail}</td>
                                        <td>{data.courseName}</td>
                                        <td>{data.phoneNo}</td>
                                        <td>{data.enqTime}</td>
                                        <td>
                                            <Button variant="secondary" style={{ backgroundColor: "#bd2130" }} onClick={() => onDelete(data.enqId)}>
                                                Remove Enquiry
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

