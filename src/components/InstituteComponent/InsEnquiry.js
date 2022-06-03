import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import InsHeader from './InsHeader'
import InstituteHome from './InstituteHome'
import { useLocation } from 'react-router-dom';
import LoginService from "../../services/LoginService";
import EnquiryService from "../../services/EnquiryService";

export default function InsEnquiry() {
    const history = useNavigate()
    const location = useLocation()
    const [apiData, setApiData] = useState([]);
    const [failureMessage, SetFailureMessage] = useState(null)
    const [failure, SetFailure] = useState(false)
    const [success, SetSuccess] = useState(true)
    const [email, setEmail] = useState(localStorage.getItem("insEmailId"))
    const [changeEffect, setChangeEffect] = useState(true)


    useEffect(() => {

        EnquiryService.getByInsEmail(email)
            .then((insData) => {
                setApiData(insData.data);
                localStorage.setItem("enquiry", Object.keys(insData.data).length)
            })
            .catch((error) => {
                localStorage.setItem("enquiry", 0)
                SetFailureMessage("No Enquiries")
                SetFailure(true)
                SetSuccess(false)
            })


    }, [changeEffect])


    // const setID = (insEmail) => {
    //     console.log(insEmail)
    //     localStorage.setItem('insEmail', insEmail)
    // }

    const getData = () => {
        EnquiryService.getByInsEmail(email)
            .then((getData) => {
                setApiData(getData.data);
                console.log(getData.data)
            })
    }

    const onDelete = (enqId) => {
        // setChange(1)
        if (window.confirm('Are you sure ! You want to remove enquiry')) {
            EnquiryService.delete(enqId)
                .then(() => {
                    //  localStorage.setItem("enquiry", Object.keys(apiData).length)
                    setChangeEffect(false)
                    getData();
                })
            setChangeEffect(true)
        }
    }
    let index = 0;
    let phno;



    return (
        <>
            <InsHeader insEmail={email} />
            <InstituteHome insEmail={email} />
            <div className="table-striped table-hover">
                <div className="p-3  mx-auto text-center">
                    {failure && <div className="col-lg-5 mx-auto rounded border mt-4">
                        <h1 className="text-center display-4 p-4">No Enquiries</h1>
                    </div>}
                    {/* {failure && <p className="alert alert-warning text-center">{failureMessage}</p>} */}
                    {success && <table className="table table-hover mx-auto table-striped" ng-show='enquiries.length>0'>
                        <thead>
                            <tr>
                                <th>S.no.</th>
                                <th>Students</th>
                                <th>Course for enquiry</th>
                                <th>Students Phone no</th>
                                <th>Students Email</th>
                                <th>Enquiry Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {apiData.map((data, knox) => {
                                index++
                                phno = "tel:+91" + data.phoneNo
                                return (
                                    <tr key={knox}>
                                        <td>{index}</td>
                                        <td>{data.stuName}</td>
                                        <td>{data.courseName}</td>
                                        <td>{data.phoneNo}</td>
                                        <td>{data.stuEmail}</td>
                                        <td>{data.enqTime}</td>
                                        <td className="list-inline-item">
                                            <a href={phno} >
                                                <i className="icon-social fa fa-phone" style={{ fontSize: "25px" }}></i>
                                            </a>
                                        </td>
                                        <td className="">
                                            <span className="close text-danger" onClick={() => onDelete(data.enqId)} style={{ fontSize: "30px" }} title="Remove From Enquiry">&times;</span>
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
