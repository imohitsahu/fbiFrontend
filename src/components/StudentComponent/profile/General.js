import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import StuHeader from '../StuHeader';
import StudentProfile from '../StudentProfile';
import { useNavigate } from 'react-router';
import LoginService from '../../../services/LoginService';
import StudentService from '../../../services/StudentService';

export default function StuGeneral() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [password, setPassword] = useState();

  const history = useNavigate();
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [success, SetSuccess] = useState(false)
  const [failure, SetFailure] = useState(false)

  const [studentTemp, SetStudentTemp] = useState({
    email: "",
    stuName: "",
    password: "",
    contactNo: "",
    city: "",
    state: "",
  })

  useEffect(() => {
    LoginService.getStudent()
      .then((getData) => {
        setEmail(getData.data.email)
        StudentService.get(getData.data.email)
          .then((res) => {
            setName(res.data.stuName);
            setEmail(res.data.email);
            setContact(res.data.contactNo);
            setCity(res.data.city);
            setState(res.data.state);
            setPassword(res.data.password)
          })
      })
      .catch((error) => {
        history("/")
      })
  })

  const sendDataToAPI = () => {
    if (studentTemp.email === "" || studentTemp.stuName === ""
      || studentTemp.password === "" || studentTemp.city === ""
      || studentTemp.state === "" || studentTemp.contactNo === "") {
      SetSuccess(false);
      SetFailure(true)
    }
    else {
      StudentService.update(email, studentTemp)
        .then((response) => {
          SetSuccess(true);
          SetFailure(false);
        })
    }
  }

  const updateStudent = () => {
    SetStudentTemp({
      email: email,
      stuName: name,
      password: password,
      contactNo: contact,
      city: city,
      state: state,
    })
    setShow(true)
  }

  const changeHandleStudent = (e) => {
    SetStudentTemp((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  };


  return (
    <div>
      <StuHeader />
      <StudentProfile />
      <div className="p-2" ng-show='general_div' >
        <div className="" style={{ textAlign: "right", padding: "15px" }}>
          <Button className="btn text-white" onClick={() => updateStudent()} style={{ backgroundColor: "#15B5B0" }} variant="secondary">
            Update
          </Button>
        </div>

        <div className="row m-0" style={{ color: "#333945" }}>
          <div className="col-lg-4" >
            <div className='m-3 border rounded pl-4 pt-3 p-2' style={{ backgroundColor: "deepskyblue" }}>
              <h5>Name</h5>
              <hr className="p-0 m-1 text-white bg-white" />
              <p>{name}</p>
            </div>
          </div>

          <div className="col-lg-4" >
            <div className="m-3 border rounded pl-4 pt-3 p-2 " style={{ backgroundColor: "#ced4da" }}>
              <h5>Email</h5>
              <hr className="p-0 m-1 text-white bg-white" />
              <p>{email}</p>
            </div>
          </div>

          <div className="col-lg-4" >
            <div className="m-3 border rounded pl-4 pt-3 p-2 " style={{ backgroundColor: "#ced4da" }}>
              <h5>Contact</h5>
              <hr className="p-0 m-1 text-white bg-white" />
              <p>{contact}</p>
            </div>
          </div>

          <div className="col-lg-4" >
            <div className="m-3 border rounded pl-4 pt-3 p-2 " style={{ backgroundColor: "#ced4da" }}>
              <h5>City</h5>
              <hr className="p-0 m-1 text-white bg-white" />
              <p>{city}</p>
            </div>
          </div>

          <div className="col-lg-4" >
            <div className="m-3 border rounded pl-4 pt-3 p-2 " style={{ backgroundColor: "#ced4da" }}>
              <h5>State</h5>
              <hr className="p-0 m-1 text-white bg-white" />
              <p>{state}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header >

          <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-body" onSubmit={sendDataToAPI} >
            {success && <p className="alert alert-success text-center">Successfully Update</p>}
            {failure && <p className="alert alert-warning text-center">Please fill all the mendatory fields</p>}

            <div className="username">
              <label className="form__label">Full Name </label>
              <input className="form__input" type="text" name="stuName" placeholder="Your Name" value={studentTemp.stuName} onChange={changeHandleStudent} required />
            </div>

            <div className="email">
              <label className="form__label">Email </label>
              <input type="email" className="form__input" name="email" placeholder="Email" value={studentTemp.email}
                onChange={changeHandleStudent}
                title="You can not change the email" disabled />
            </div>

            <div className="contactno">
              <label className="form__label">Phone No. </label>
              <input type="tel" className="form__input" name="contactNo" placeholder="12345-67890" pattern="^\d{10}$" title="Phone number should be in 10 digits without alphabets"
                onChange={changeHandleStudent}
                value={studentTemp.contactNo} required />
            </div>

            <div className="city d-flex">
              <label className="form__label">City</label>
              <input type="text" className="form__input" name="city" placeholder="city" value={studentTemp.city} onChange={changeHandleStudent} required />
            </div>

            <div className="state d-flex">
              <label className="form__label">State </label>
              <input type="text" className="form__input" name="state" placeholder="state" value={studentTemp.state} onChange={changeHandleStudent} required />
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
    </div>

  )
}