import React from "react";
import { Link } from "react-router-dom";

function StudentProfile() {

  return (
    <>
      <div className="container" ng-app='studentProfileApp' ng-controller='studentProfileController'>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <Link className="nav-item nav-link" data-toggle="tab" to="/gen" role="tab">General</Link>
          <Link className="nav-item nav-link" data-toggle="tab" to="/enqofinstitute" role="tab">Enquiries</Link>
          <Link className="nav-item nav-link" data-toggle="tab" to="/stupassword" role="tab">Change Password</Link>
        </div>
      </div>
    </>
  )
}
export default StudentProfile;