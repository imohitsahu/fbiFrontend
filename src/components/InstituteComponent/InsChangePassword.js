import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment, Input } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import { Backdrop, CircularProgress } from '@material-ui/core';
import InstituteService from '../../services/InstituteService'
import InsHeader from "./InsHeader"
import InstituteHome from "./InstituteHome"
import LoginService from '../../services/LoginService';

export default function InsChangePassword() {
    const history = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const [failureMsg, setFailureMsg] = useState(null)
    const handleClose = () => setShow(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [isProfile, setIsProfile] = useState(false)
    const [email, setEmail] = useState()

    const handleClickShowPassword = () => {
        setShowPassword(true)
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        setShowPassword(false)
    };

    const handleClickShowOldPassword = () => {
        setShowOldPassword(true)
    };

    const handleMouseDownOldPassword = (event) => {
        event.preventDefault();
        setShowOldPassword(false)
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
                    setIsProfile(true)
                    setEmail(getData.data.email)
                })
                .catch((error) => {
                    history("/")
                })
        }
        catch {
            history("/")
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newPassword === confirmPassword) {
            if (oldPassword === confirmPassword) {
                setFailureMsg("Please enter different password.")
                setFailure(true)
            } else {
                setLoading(true)
                InstituteService.changePassword(email, oldPassword, confirmPassword)
                    .then((response) => {
                        setSuccess(true);
                        setFailure(false)
                    }).catch((error) => {
                        setFailureMsg("Old Password does Not Match")
                        // error.response.data)
                        setSuccess(false);
                        setFailure(true)
                    })
                setLoading(false)
            }
        }
        else {
            alert("New password must match with confirm password")
        }
    }

    return (
        <>
            <InsHeader />
            <InstituteHome />
            {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>}
            {!loading &&
                isProfile && <>
                    <div className="row d-flex justify-content-center m-0 align-items-center h-100">
                        <div className="col-md-9 col-lg-4">
                            <div className="card " >
                                <div className="card-body p-1">
                                    <form onSubmit={handleSubmit} className="border p-4 m-2 rounded">
                                        <div className="jumbotron text-center text-white" style={{ backgroundColor: "#15B5B0", padding: "20px" }}>
                                            <h4>Change Password</h4>
                                        </div>
                                        <div>
                                            {success && <p className='text-center text-success' ><b>Successfully changed</b></p>}
                                            {failure && <p className='alert alert-warning text-center'><b>{failureMsg}</b></p>}
                                        </div>
                                        <div className="form-group">
                                            <label >Old Password:</label>
                                            <Input
                                                type={showOldPassword ? "text" : "password"}
                                                className="form-control"
                                                name="Current Password"
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickShowOldPassword}
                                                            onMouseDown={handleMouseDownOldPassword}
                                                        >
                                                            {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                } required />
                                        </div>
                                        <div className="form-group">
                                            <label >New Password:</label>
                                            <Input
                                                type="password"
                                                className="form-control form-control-sm"
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                value={newPassword}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label >Confirm New Password:</label>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                value={confirmPassword}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                required
                                            />
                                        </div>
                                        <div className='mt-3'>
                                            <button type="submit" className="btn text-white form-control" style={{ backgroundColor: "#15B5B0" }}>Change</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </>
    )
}