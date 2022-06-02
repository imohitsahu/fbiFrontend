import React, { useState, useEffect } from "react"
import InsHeader from "./InsHeader"
import { useNavigate } from 'react-router-dom';
import InstituteHome from "./InstituteHome"
import { Button, Modal } from 'react-bootstrap'
import InstituteService from "../../services/InstituteService"
import LoginService from "../../services/LoginService";

export default function InsProfile() {
    const history = useNavigate()
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [success, SetSuccess] = useState(false)
    const [failure, SetFailure] = useState(false)

    const [email, setEmail] = useState();
    const [insName, setInsName] = useState();
    const [contact, setContact] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [map, setMap] = useState();
    const [password, setPassword] = useState()

    const [instituteTemp, SetInstituteTemp] = useState({
        email: "",
        insName: "",
        password: "",
        contactNo: "",
        city: "",
        state: "",
        map: ""
    })

    useEffect(() => {
        LoginService.getInstitute()
            .then((getData) => {
                setEmail(getData.data.email)
                InstituteService.get(getData.data.email)
                    .then((res) => {
                        setInsName(res.data.insName);
                        setEmail(res.data.email);
                        setContact(res.data.contactNo);
                        setCity(res.data.city);
                        setState(res.data.state);
                        setMap(res.data.map);
                        setPassword(res.data.password)
                    })
            })
            .catch((error) => {
                history("/")
            })

    })

    const sendDataToAPI = () => {
        if (instituteTemp.email === "" || instituteTemp.insName === ""
            || instituteTemp.contactNo === "" || instituteTemp.city === ""
            || instituteTemp.state === "" || instituteTemp.map === "" || instituteTemp.password === "") {
            SetSuccess(false);
            SetFailure(true)
        }
        else {
            InstituteService.update(email, instituteTemp)
                .then((response) => {
                    SetSuccess(true);
                    SetFailure(false);
                })
        }
    }

    const updateInstitute = () => {
        SetInstituteTemp({
            email: email,
            insName: insName,
            password: password,
            contactNo: contact,
            city: city,
            state: state,
            map: map
        })
        setShow(true)
    }

    const changeHandleInstitute = (e) => {
        SetInstituteTemp((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };

    return (
        <>
            <InsHeader />
            <InstituteHome />
            <div className="p-2" ng-show='general_div' >
                <div className="" style={{ textAlign: "right", padding: "15px" }}>
                    <Button className="btn text-white" onClick={() => updateInstitute()} style={{ backgroundColor: "#15B5B0" }} variant="secondary">
                        Update
                    </Button>
                </div>
                <div className="row m-0" style={{ color: "#333945" }}>
                    <div className="col-lg-4" >
                        <div className='m-3 border rounded pl-4 pt-3 p-2' style={{ backgroundColor: "deepskyblue" }}>
                            <h5>Institute Name</h5>
                            <hr className="p-0 m-1 text-white bg-white" />
                            <p>{insName}</p>
                        </div>
                    </div>
                    <div className="col-lg-4" >
                        <div className='m-3 border rounded pl-4 pt-3 p-2' style={{ backgroundColor: "#ced4da" }}>
                            <h5>Email</h5>
                            <hr className="p-0 m-1 text-white bg-white" />
                            <p>{email}</p>
                        </div>
                    </div>
                    <div className="col-lg-4" >
                        <div className='m-3 border rounded pl-4 pt-3 p-2' style={{ backgroundColor: "#ced4da" }}>
                            <h5>Contact</h5>
                            <hr className="p-0 m-1 text-white bg-white" />
                            <p>{contact}</p>
                        </div>
                    </div>
                    <div className="col-lg-4" >
                        <div className='m-3 border rounded pl-4 pt-3 p-2' style={{ backgroundColor: "#ced4da" }}>
                            <h5>City</h5>
                            <hr className="p-0 m-1 text-white bg-white" />
                            <p>{city}</p>
                        </div>
                    </div>
                    <div className="col-lg-4" >
                        <div className='m-3 border rounded pl-4 pt-3 p-2' style={{ backgroundColor: "#ced4da" }}>
                            <h5>State</h5>
                            <hr className="p-0 m-1 text-white bg-white" />
                            <p>{state}</p>
                        </div>
                    </div>
                    <div className="col-lg-4" >
                        <div className='m-3 border rounded pl-4 pt-3 p-2' style={{ backgroundColor: "#ced4da" }}>
                            <h5>Map</h5>
                            <hr className="p-0 m-1 text-white bg-white" />
                            <a href={map} target="blank">Map</a>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Update Institute</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-body" onSubmit={sendDataToAPI} >
                        {success && <p className="alert alert-success text-center">Successfully Update</p>}
                        {failure && <p className="alert alert-warning text-center">Please fill all the mendatory fields</p>}

                        <div className="username">
                            <label className="form__label">Full Name </label>
                            <input className="form__input" type="text" name="insName" placeholder="Your Name" value={instituteTemp.insName} onChange={changeHandleInstitute} required />
                        </div>

                        <div className="email">
                            <label className="form__label">Email </label>
                            <input type="email" className="form__input" name="email" placeholder="Email" value={instituteTemp.email}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Email should be in valid format.(ex: example@gmail.com)" onChange={changeHandleInstitute} disabled />
                        </div>

                        <div className="Map">
                            <label className="form__label">Map </label>
                            <input type="text" className="form__input" name="map" onChange={changeHandleInstitute} value={instituteTemp.map} required />
                        </div>

                        <div className="contactno">
                            <label className="form__label">Phone No. </label>
                            <input type="tel" className="form__input" name="contactNo" placeholder="12345-67890" onChange={changeHandleInstitute} pattern="^\d{10}$" title="Phone number should be in 10 digits without alphabets"
                                value={instituteTemp.contactNo} required />
                        </div>

                        <div className="city d-flex">
                            <label className="form__label">City</label>
                            <input type="text" className="form__input" name="city" placeholder="city" value={instituteTemp.city} onChange={changeHandleInstitute} required />
                        </div>

                        <div className="state d-flex">
                            <label className="form__label">State </label>
                            <input type="text" className="form__input" name="state" placeholder="state" value={instituteTemp.state} onChange={changeHandleInstitute} required />
                        </div>

                        <div className="mt-3">
                            <Button type="submit" variant="secondary" style={{ backgroundColor: "#15B5B0" }}>
                                Update
                            </Button>
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: "#bd2130" }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}