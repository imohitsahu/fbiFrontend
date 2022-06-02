import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InsHeader from './InsHeader'
import InstituteHome from './InstituteHome'
import CourseService from '../../services/CourseService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoginService from '../../services/LoginService';
import EnquiryService from '../../services/EnquiryService';
import InstituteService from '../../services/InstituteService';

function InsCourses() {
    const history = useNavigate()
    const [email, setEmail] = useState()
    const [courses, setCourses] = useState(
        {
            insEmail: "",
            courseName: "",
            courseFee: ""
        });

    const [enqData, setEnqData] = useState([]);
    const [apiData, setApiData] = useState([]);
    const [failure, SetFailure] = useState(false)
    const [success, SetSuccess] = useState(true)

    const [changeEffect, setChangeEffect] = useState(true)

    const changeHandle = e => {
        setCourses((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };

    useEffect(() => {

        function parseJwt(token) {
            if (!token) { return; }
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }

        try {
            InstituteService.get(parseJwt(localStorage.getItem('Institute'), { decrypt: true }).iss)
                .then((getData) => {
                setEmail(getData.data.email)
                localStorage.setItem("insEmailId", getData.data.email)
                setCourses({
                    ...courses,
                    "insEmail": getData.data.email
                })
                EnquiryService.getByInsEmail(localStorage.getItem("insEmailId"))
                    .then((getenq) => {
                        setEnqData(getenq.data)
                        localStorage.setItem("enquiry", Object.keys(getenq.data).length)
                    })
                    .catch((err) => {
                        localStorage.setItem("enquiry", 0)
                    })
                CourseService.get(localStorage.getItem("insEmailId"))
                    .then((res) => {
                        setApiData(res.data);
                        SetFailure(false)
                        SetSuccess(true)
                    })
                    .catch((erro) => {
                        console.log("No Courses Available")
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
    }, [changeEffect])

    const handleSubmit = async (event) => {
        setCourses({
            ...courses,
            "insEmail": email
        })
        event.preventDefault();
        const data = await CourseService.create(courses)
            .then(response => {
                toast.success("Course Added Successfully")
                getData();
                setChangeEffect(false)
            })
            .catch(error => {
                toast.warn("SomeThing went Wrong")
            })
        setChangeEffect(true)
    };

    const getData = () => {
        CourseService.get(email)
            .then((getData) => {
                setApiData(getData.data);
            })
            .catch((err) => {
                //  getData();
                setChangeEffect(false)
            })
    }

    const onDelete = (courseId) => {
        CourseService.delete(courseId)
            .then(() => {
                // getData();
                changeEffect ? setChangeEffect(false) : setChangeEffect(true)
            })
            .catch((err) => {
                // getData();
                setChangeEffect(false)
            })
        changeEffect ? setChangeEffect(false) : setChangeEffect(true)
    }
    let index = 0;

    return (
        <>

            <InsHeader />
            <InstituteHome />
            <ToastContainer />
            <div className="tab-pane fade show active" id="courses" role="tabpanel">
                <div className="row p-3 m-4">
                    <div className="form col-lg-4">
                        <form className="border p-4 m-2 rounded" onSubmit={handleSubmit}>
                            <div className="jumbotron p-0 m-0 text-white text-center" style={{ backgroundColor: "#15B5B0" }}>
                                <h3 className="p-3">Add Courses Here</h3>
                            </div>
                            <div className="form-group">
                                <label>Course Name</label>
                                <input className="form-control" type="text"
                                    name="courseName" placeholder="Course Name"
                                    value={courses.courseName}
                                    onChange={changeHandle}
                                    required />
                            </div>
                            <div className="form-group">
                                <label>Course Fee</label>
                                <input className="form-control" type="number"
                                    name="courseFee" placeholder="Course Fee"
                                    value={courses.courseFee}
                                    onChange={changeHandle}
                                    required="" />
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Save" className="btn form-control text-white" style={{ backgroundColor: "#15B5B0" }} />
                            </div>
                        </form>
                    </div>
                    {/* <!-- All Courses Here --> */}
                    <div className="col-lg-7 mx-auto">
                        {failure && <div className="col-lg-5 mx-auto rounded border mt-4">
                            <h1 className="text-center p-4">No Courses Available</h1>
                        </div>}
                        {success && <table className="table table-striped ">
                            <thead className='text-center'>
                                <th>Sno.</th>
                                <th>Course Name</th>
                                <th>Course Fees</th>
                            </thead>
                            <tbody>
                                {apiData.map((data, indexx) => {
                                    index++
                                    return (
                                        <tr key={indexx}>
                                            <td>{index}</td>
                                            <td>{data.courseName}</td>
                                            <td>Rs. {data.courseFee}</td>
                                            <td className="">
                                                <span className="close text-danger" onClick={() => onDelete(data.courseId)} title="Remove Course">&times;</span></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default InsCourses;
