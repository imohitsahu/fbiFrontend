import React from 'react';
import { Link } from 'react-router-dom';
function RegHeader() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ color: "#2a3536", backgroundColor: "#343a40" }}>
                <a className="navbar-brand border p-2 rounded" href="/">Find Best Institute</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                    <div className="row col-12 d-flex justify-content-center text-white">
                        <h3>Registration</h3>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default RegHeader;