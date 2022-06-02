import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import LoginService from "../../services/LoginService";
import { useCookies } from 'react-cookie';
import InstituteService from "../../services/InstituteService";

function InsHeader() {
    const navigate = useNavigate()
    const [cookie, setCookie, removeCookie] = useCookies()
    const [email, setEmail] = useState()

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
            })
        }
        catch {
            navigate("/")
        }
    })

    const logout = () => {
        const logoutDTO = {
            "email": email,
            "type": "Institute"
        }
        LoginService.logout(logoutDTO)
            .then((response) => {
                removeCookie("Institute")
                localStorage.removeItem("enquiry");
                localStorage.removeItem("insEmailId");
                localStorage.removeItem("Institute");
                navigate('/')
            })
            .catch((error) => {
                localStorage.removeItem("enquiry");
                localStorage.removeItem("insEmailId");
                localStorage.removeItem("Institute");
                removeCookie("Institute")
                navigate("/")
            })
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ color: "#2a3536", backgroundColor: "#343a40" }}>
            <Link className="navbar-brand border p-2 rounded" to="">Find Best Institute</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={logout}>Logout<i className="fa fa-sign-out icon"></i></Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default InsHeader;