import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import StuHeader from "../StuHeader";
import StudentProfile from "../StudentProfile";
import LoginService from "../../../services/LoginService";
import EnquiryService from "../../../services/EnquiryService";
import StudentService from "../../../services/StudentService";

export default function Enqofinstitute() {
    const history = useNavigate()
    const [apiData, setApiData] = useState([]);
    const [failureMessage, SetFailureMessage] = useState(null)
    const [failure, SetFailure] = useState(false)
    const [success, SetSuccess] = useState(true)
    const [email, setEmail] = useState()

    useEffect(() => {
        function parseJwt(token) {
            if (!token) { return; }
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }
        try {
            StudentService.get(parseJwt(localStorage.getItem('Student'), { decrypt: true }).iss)
                .then((getData) => {
                    setEmail(getData.data.email)
                    EnquiryService.getByStuEmail(getData.data.email)
                        .then((getData) => {
                            setApiData(getData.data);
                        })
                        .catch((error) => {
                            SetFailureMessage("No Enquiries")
                            SetFailure(true)
                            SetSuccess(false)
                        })
                })
                .catch((error) => {
                    history("/")
                })
        }
        catch {
            history("/")
        }
    }, [])

    const getData = () => {
        EnquiryService.getByStuEmail(email)
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const onDelete = (enqId) => {
        if (window.confirm('Are you sure ! You want to delete this account')) {
            EnquiryService.delete(enqId)
                .then(() => {
                    getData();
                })
        }
    }
    let index = 0;

    return (
        <>
            <StuHeader />
            <StudentProfile />
            <div className="table-striped table-hover table-center">
                <div className="p-3  mx-auto text-center">
                    {failure && <div className="col-lg-5 mx-auto rounded border mt-4">
                        <h1 className="text-center display-4 p-4">No Enquiries</h1>
                    </div>}
                    {success && <table className="table table-hover mx-auto table-striped" ng-show='enquiries.length>0'>
                        <thead>
                            <tr>
                                <th>S.no.</th>
                                <th>Institute Name</th>
                                <th>CourseName</th>
                                <th>Institute Email</th>
                                <th>Enquiry Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {apiData.map((data, knox) => {
                                index++

                                return (
                                    <tr key={knox}>
                                        <td>{index}</td>
                                        <td>{data.insName}</td>
                                        <td>{data.courseName}</td>
                                        <td>{data.insEmail}</td>
                                        <td>{data.enqTime}</td>
                                        <td className="">
                                            <span className="close text-danger" onClick={() => onDelete(data.enqId)} title="Remove From Enquiry">&times;</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}
