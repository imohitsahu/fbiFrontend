import { Link } from 'react-router-dom';
import React from "react";

function InstituteHome() {

    return (
        <>
            <div className="container p-4">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <Link className="nav-item nav-link" data-toggle="tab" to="/institute" role="tab">Courses</Link>
                        <Link className="nav-item nav-link" data-toggle="tab" to="/insenq" role="tab">
                            Enquiry <span className="badge badge-success">{localStorage.getItem("enquiry")}</span>
                        </Link>
                        <Link className="nav-item nav-link" data-toggle="tab" to="/inspro" role="tab">Profile</Link>
                        <Link className="nav-item nav-link" data-toggle="tab" to="/inspass" role="tab">Change Password</Link>
                    </div>
                </nav>
            </div>
        </>
    )
}
export default InstituteHome;