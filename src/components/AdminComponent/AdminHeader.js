import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import LoginService from "../../services/LoginService";
import AdminService from "../../services/AdminService";
import { useCookies } from 'react-cookie';

function AdminHeader() {
    const navigate = useNavigate()
    const [cookie, setCookie, removeCookie] = useCookies()
    const location = useLocation();
    const [email, setEmail] = useState()

    useEffect(() => {
        function parseJwt(token) {
            if (!token) { return; }
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }

        try {
            AdminService.get(parseJwt(localStorage.getItem('Admin'), { decrypt: true }).iss)
                .then((getData) => {
                    setEmail(getData.data.email)
                })
        }
        catch {
            navigate("/")
        }

    })

    const logout = () => {
        const logoutDTO = {
            "email": email,
            "type": "Admin"
        }
        LoginService.logout(logoutDTO)
            .then((response) => {
                removeCookie("Admin")
                localStorage.removeItem("token");
                localStorage.removeItem("Admin");
                navigate('/')
            })
            .catch((error) => {
                removeCookie("Admin")
                localStorage.removeItem("Admin");
                navigate("/")
            })
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ color: "#2a3536", backgroundColor: "#343a40" }}>
            <Link className="navbar-brand border p-2 rounded" to="/admin">Find Best Institute</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="mr-2 nav-item">
                        <Link to="/admin" className="nav-link">
                            <span className="border p-1" style={{ borderRadius: "40%", fontSize: "18px", verticalAlign: "middle" }}>H</span>
                            <span className="" style={{ verticalAlign: "middle" }}>Home</span>
                        </Link>
                    </li>
                    <li className="mr-2 nav-item">
                        <Link to="/adminprofile" className="nav-link">
                            <span className="border p-1" style={{ borderRadius: "40%", fontSize: "18px", verticalAlign: "middle" }}>P</span>
                            <span className="" style={{ verticalAlign: "middle" }}>Profile</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={logout}>Logout<i className="fa fa-sign-out icon"></i></Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default AdminHeader;