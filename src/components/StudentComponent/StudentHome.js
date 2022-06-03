import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./StuStyle.css"
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StuHeader from "./StuHeader";
import LoginService from "../../services/LoginService";
import InstituteService from "../../services/InstituteService";
import StudentService from "../../services/StudentService";
import CourseService from "../../services/CourseService";
import EnquiryService from "../../services/EnquiryService";


export default function StudentHome() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const history = useNavigate();
  const [stuEmail, setStuEmail] = useState();
  const [stuName, setStuName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [instituteName, setInstituteName] = useState();
  const [apiData, setApiData] = useState([]);
  const [courseEmpty, setCourseEmpty] = useState(null)
  const [failure, SetFailure] = useState(false)
  const [success, SetSuccess] = useState(true)

  useEffect(() => {
    function parseJwt(token) {
      if (!token) { return; }
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

    try {

      // LoginService.getStudent()
      StudentService.get(parseJwt(localStorage.getItem('Student'), { decrypt: true}).iss)
        .then((getData) => {
          setStuEmail(getData.data.email)
          setStuName(getData.data.stuName);
          setPhoneNo(getData.data.contactNo);
          InstituteService.getAll()
            .then((response) => {
              setApiData(response.data)
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

  const [courseData, setCourseData] = useState([]);

  const coursesOfInstitute = (email, insName) => {
    setInstituteName(insName)
    CourseService.get(email)
      .then((getData) => {
        SetSuccess(true)
        SetFailure(false)
        setCourseData(getData.data);
      })
      .catch((error) => {
        SetSuccess(false)
        SetFailure(true)
        setCourseEmpty("No Courses Available Yet")
      })
    setShow(true)
  }

  let index = 0;

  const onEnquiry = (courseName, insEmail, insName) => {
    let enquiryDto = {
      "courseName": courseName,
      "insEmail": insEmail,
      "insName": instituteName,
      "stuName": stuName,
      "stuEmail": stuEmail,
      "phoneNo": phoneNo,
      "enqTime": new Date().toISOString()
    }
    // console.log(enquiryDto)
    EnquiryService.create(enquiryDto)
      .then((getData) => {
        toast.success("Thanks for interest. Institute will contact you soon")
      })
      .catch(error => {
        toast.warn("Already Raised Enquiry")
      })
  }

  //   const searchFun=()=>{
  //     let filter=document.getElementById('myInput').value.toUpperCase();
  //     let myTable=document.getElementById('myTable');
  //     let tr=myTable.getElementsByTagName('tr');
  //     for(var i=0;i<tr.length;i++){
  //         let td=tr[i].getElementsByTagName('td')[0];
  //         if(td){
  //             let textvlaue=td.textContent || td.innerHTML;
  //             if(textvlaue.toUpperCase().indexOf(filter)>-1){
  //                 tr[1].style.display="";
  //             }else{
  //                 tr[i].style.display="none";
  //            }
  //    }
  //        }
  // }


  return (

    <>
      <StuHeader />
      <div className="container mt-1" style={{ minHeight: "500px" }}>
        <ToastContainer />
        <div className="mt-2 border">
          <h2 className="text-center">Institutes</h2>
        </div>

        {/* <div className="mt-2 border">
        <input type="text" name="" id="myInput" placeholder="search" onKeyUp={() => searchFun()} />
      </div> */}

        <div className="row">

          {apiData.map((data, knox) => {
            return (
              <div className="col-lg-4" key={knox}>
                <div className="data mt-4 rounded border">
                  <h2 className="text-center p-4 display-3 text-white" style={{ backgroundColor: "blueviolet" }}><b>{data.insName[0]}</b></h2>
                  <table className="table table-sm table-striped" style={{ minHeight: "167px", fontSize: "18px" }} >
                    <tr className="">
                      <td className="p-0  pl-3"><small>Institute Name : </small></td>
                      <td className="p-0"><small><b>{data.insName}</b></small></td>
                    </tr>
                    <tr className="">
                      <td className="p-0  pl-3"><small>City : </small></td>
                      <td className="p-0"><small>{data.city}</small></td>
                    </tr>
                    <tr className="">
                      <td className="p-0  pl-3"><small>State : </small></td>
                      <td className="p-0"><small>{data.state}</small></td>
                    </tr>
                    <tr className="">
                      <td className="p-0  pl-3"><small>Office Number : </small></td>
                      <td className="p-0"><small>{data.contactNo}</small></td>
                    </tr>
                    <tr className="">
                      <td className="p-0  pl-3"><small>Email : </small></td>
                      <td className="p-0"><small>{data.email}</small></td>
                    </tr>
                  </table>

                  <div className="row text-center">
                    <div className="col-lg-6 mt-2">
                      <a className="btn border btn-sm btn-white text-dark bg-white" target="blank" href={data.map}
                        style={{ textDecoration: "none" }}>See On Map <span className="material-icons icon"></span></a>
                    </div>
                    <div className="col-lg-6 mt-2">
                      <button className="btn btn-sm bg-white text-info border" onClick={() => coursesOfInstitute(data.email, data.insName)} >Available Courses</button>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

        {/* <!--Courses Modal --> */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title className="text-white form-control text-center" style={{ backgroundColor: "#15B5B0" }}>Courses Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {failure && <div className="col-lg-5 mx-auto rounded border mt-4">
              <h1 className="text-center ">No Courses Available Yet</h1>
            </div>}
            {success && <table className="table table-striped table-responsive table-hover">
              <thead>
                <tr className="text-center">
                  <th style={{ width: "25%" }}>Sno.</th>
                  <th style={{ width: "25%" }}>Course</th>
                  <th style={{ width: "25%" }}>Course Fees</th>
                </tr>
              </thead>
              <tbody>
                {courseData.map((data, index) => {
                  index++
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{data.courseName}</td>
                      <td>Rs. {data.courseFee} </td>
                      <td>
                        <div className="col-lg-6 mt-2">
                          <Button onClick={() => onEnquiry(data.courseName, data.insEmail, data.insName)} className="btn border text-dark"
                            style={{ backgroundColor: "#15b546" }}>Enquiry<span className="material-icons icon"></span></Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: "#bd2130" }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </div >
    </>
  )
}