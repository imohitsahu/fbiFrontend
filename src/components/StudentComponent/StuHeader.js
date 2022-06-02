import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import LoginService from "../../services/LoginService";
import { useCookies } from 'react-cookie';

function StuHeader() {

    const navigate = useNavigate()
    const [cookie, setCookie, removeCookie] = useCookies()
    const [email, setEmail] = useState()
    const [slice, setSlice] = useState()

    useEffect(() => {
        LoginService.getStudent()
            .then((getData) => {
                setEmail(getData.data.email)
                setSlice(getData.data.stuName.charAt(0).toUpperCase())
            })
    })
    const logout = () => {
        const logoutDTO = {
            "email": email,
            "type": "Student"
        }
        LoginService.logout(logoutDTO)
            .then((response) => {
                // removeCookie("Student")
                localStorage.removeItem("token");
                navigate('/')
            })
            .catch((error) => {
                // removeCookie("Student")
                navigate("/")
            })
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ color: "#2a3536", backgroundColor: "#343a40" }}>
            <Link className="navbar-brand border p-2 rounded" to="">Find Best Institute</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse center" id="navbarSupportedContent">

                {/* <input className="form-control only-at-home col-lg-4 mr-auto form-control-sm" type="search" placeholder="Search Here , Type anything Institute or Address" aria-label="Search" ng-keyup='search($event);' ng-focus='loading()' hidden="" onChange={searchBar.handleChange} value={searchBar.searchInput} /> */}
                {/* <input type="text" placeholder="You can search here by city" onChange={searchBar.handleChange} value={searchBar.searchInput} /> */}
                {/* <input className="form-control only-at-home col-lg-4 mr-auto form-control-sm" type="search" placeholder="Search Here , Type anything Institute or Address" aria-label="Search" ng-keyup='search($event);' ng-focus='loading()' hidden="" /> */}

                <ul className="navbar-nav ml-auto">
                    <li className="mr-2 nav-item">
                        <Link to="/student" className="nav-link"><i className="fa fa-home" style={{ fontSize: "20px" }}></i> Home</Link>
                    </li>
                    <li className="mr-2 nav-item">
                        <Link to="/gen" className="nav-link">
                            <span className="border p-1" style={{ borderRadius: "40%", fontSize: "18px", verticalAlign: "middle" }}>{slice}</span>
                            <span className="" style={{ verticalAlign: "middle" }}> Profile</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={logout}>Logout <i className="fa fa-sign-out icon"></i></Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default StuHeader;