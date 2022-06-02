import React, { useEffect, useState } from 'react'
import { IconButton, InputAdornment, Input, Backdrop, CircularProgress } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import StudentService from '../../../services/StudentService';
import StuHeader from '../StuHeader';
import StudentProfile from '../StudentProfile';
import { useNavigate } from 'react-router';
import LoginService from '../../../services/LoginService';

function StudentChangePassword() {
    const history = useNavigate
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
    const handleClickShowPassword = () => {
        setShowPassword(true)
    };

    const [email, setEmail] = useState()

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
        LoginService.getStudent()
            .then((getData) => {
                setEmail(getData.data.email)
            })
            .catch((error) => {
                history("/")
            })

    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newPassword === confirmPassword) {
            if (oldPassword === confirmPassword) {
                setFailureMsg("Please enter different password.")
                setFailureMsg(true)
            } else {
                setLoading(true)
                StudentService.changePassword(email, oldPassword, confirmPassword)
                    .then((response) => {
                        setSuccess(true);
                        setFailure(false)
                    }).catch((error) => {
                        setFailureMsg("Old Password does Not Match")
                        // (error.response.data)
                        setSuccess(false);
                        setFailure(true)
                    })
                setLoading(false)
            }
        }
        else {
            setSuccess(false)
            setFailureMsg("New password must match with confirm password")
            setFailure(true)
        }

    }

    return (
        <>
            <StuHeader />
            <StudentProfile />
            {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>}
            {!loading && <>
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
                                                        onMouseDown={handleMouseDownOldPassword}>
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
                                            title="At least 1 Uppercase
                                            1 Lowercase
                                            1 Number
                                            1 Special Character
                                            8 to 12 characters required"
                                            pattern="^\d{10}$"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required />
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

export default StudentChangePassword