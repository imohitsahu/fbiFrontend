import React, { useState } from 'react';
import LoginService from '../../services/LoginService';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Backdrop, CircularProgress } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import Header from '../Header';
import Footer from '../Footer';

function Login() {

    const [cookie, setCookie] = useCookies()
    const history = useNavigate();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [failureMsg, setFailureMsg] = useState("");
    const [loginFailureMsg, setLoginFailureMsg] = useState("");
    const [loginFailure, setLoginFailure] = useState(false);
    const [forgetEmail, setForgetEmail] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [login, setLogin] = useState(
        {
            email: "",
            password: ""
        });

    const changeHandle = e => {
        setLogin((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        await LoginService.login(login)
            .then(response => {
                setLoginFailure(false)
                if (response.data[0] === "Student" && response.data[1] === true) {
                    // setCookie(response.data[0], response.data[2])
                    localStorage.setItem(response.data[0],response.data[2],{encrypt:true});
                    history('/student')
                }
                else if (response.data[0] === "Institute" && response.data[1] === true) {
                    // setCookie(response.data[0], response.data[2])
                    localStorage.setItem(response.data[0],response.data[2],{encrypt:true});
                    history('/institute')
                }
                else if (response.data[0] === "Admin" && response.data[1] === true) {
                    // setCookie(response.data[0], response.data[2])
                    localStorage.setItem(response.data[0],response.data[2],{encrypt:true});
                    history('/admin')
                }
            })
            .catch((error) => {
                setLoginFailure(true)
                setLoginFailureMsg("Invalid email or password")
            })
        setLoading(false)
    };

    const getpassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        await LoginService.forgetpassword(forgetEmail)
            .then((response) => {
                setFailure(false)
                setSuccess(true)
                setSuccessMsg(response.data)
                setFailureMsg("")
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                setFailure(true)
                setSuccess(false)
                setSuccessMsg("")
                setFailureMsg(error.response.data)
            });
        setLoading(false)
    };

    return (
        <>
            <Header />
            {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>}
            {!loading && <>
                <>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header >

                            <Modal.Title>Forget Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={getpassword}>
                                <div className="form-group mb-2">
                                    <label>Email:</label>
                                    <input type="email" className="form-control" placeholder="Enter email"
                                        name="forgetemail" value={forgetEmail} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        title="Email should be in valid format.(ex: example@gmail.com)"
                                        onChange={(e) => setForgetEmail(e.target.value)}
                                        required />
                                </div>
                                <div>
                                    <button type="submit" className="btn text-white form-control" style={{ backgroundColor: "#15B5B0" }}>submit</button>
                                </div>
                            </form>
                        </Modal.Body>
                        <div className='text-center'>
                            {success && <p className='text-center text-success'>{successMsg}</p>}
                            {failure && <p className='text-center text-danger'>{failureMsg}</p>}
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: "#bd2130" }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="row m-0">

                        <div className="col-lg-3 col-sm-8 col-md-6  mx-auto p-0 rounded border-top-0 bg-white border mt-4" style={{ boxShadow: "2px 2px 5px grey" }}>
                            <form style={{ padding: "1.0rem" }} onSubmit={handleSubmit}>
                                {loginFailure && <p className="alert alert-warning text-center">{loginFailureMsg}</p>}
                                <div className="jumbotron p-0 m-0 text-white text-center" style={{ backgroundColor: "#15B5B0" }}>
                                    <h3 className="p-3">Login Here</h3>
                                </div>

                                <div className="input-group mt-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Email  </span>
                                    </div>
                                    <input type="email" className="form-control" placeholder="example@gmail.com"
                                        name="email" value={login.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        title="Email should be in valid format.(ex: example@gmail.com)"
                                        onChange={changeHandle}
                                        required />
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Password</span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="************"
                                        name="password" value={login.password}
                                        onChange={changeHandle}
                                        required />
                                </div>
                                <div className="mt-3">
                                    <input type="submit" onClick={handleShow} className="text-info border btn form-control" value="Forgot Password" />
                                </div>
                                <div className='mt-3'>
                                    <input type="submit" className="btn text-white form-control" style={{ backgroundColor: "#15B5B0" }} value="Log in" />
                                </div>

                                <hr></hr>

                                <div className="mt-3">
                                    <Link to="/sturegistration" className="text-info border btn form-control" style={{ textDecoration: "none" }}>Student Registration</Link>
                                </div>

                                <div className="mt-3">
                                    <p className='text-center' style={{ color: "#6c757d" }}>or</p>
                                </div>

                                <div className="mt-3">
                                    <Link to="/insregistration" className="text-info border btn form-control" style={{ textDecoration: "none" }}>Institute Registration</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            </>}
            <Footer />
        </>
    )
}
export default Login;