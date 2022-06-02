import React from "react";
import InsHeader from "./InsHeader";
import InstituteHome from "./InstituteHome";
function InsStudent() {
    let index = 0
    return (
        <>
            <InsHeader />
            <InstituteHome />
            <div className="tab-pane fade show active" id="students" role="tabpanel" >
                <div className="p-3  mx-auto text-center">

                    <div ng-hide='admitted.length>0' className="col-lg-5 mx-auto rounded border mt-4">
                        <h1 className="text-center display-4 p-4">No Admitted Students</h1>
                    </div>
                    <table className="table table-responsive mx-auto table-striped" ng-show='admitted.length>0'>
                        <thead>
                            <tr>
                                <th>Sno.</th>
                                <th>Course</th>
                                <th>Course Fees</th>
                                <th>Student</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>Address</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr ng-repeat='x in admitted'>
                                <td>{index}</td>
                                <td>((x.course.courseName))</td>
                                <td>((x.course.courseFees))</td>
                                <td>((x.student.name))</td>
                                <td>((x.student.contact))</td>
                                <td>((x.student.email))</td>
                                <td title="((x.student.address))">(( x.student.address.substring(0 , 30)+"....." ))</td>
                                <td>
                                    <span className="icon material-icons text-danger m-2" title="Remove From Enquiry" ng-click='deleteEnquiry(x.enquiryId , $index , "a")'>delete </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}
export default InsStudent;