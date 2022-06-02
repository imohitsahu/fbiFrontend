import React from 'react'
import StudentProfile from '../StudentProfile'
import StuHeader from '../StuHeader'

export const Courses = () => {

  return (
    <div>
      <StuHeader />
      <StudentProfile />
      <div className="p-2" ng-show='courses_div'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Course</th>
              <th>Fees</th>
              <th>Institute</th>
              <th>Your Rate</th>
            </tr>
          </thead>
          <tbody className="">
            <tr ng-repeat='x in courses_institutes' className="course-rating-body">
              <td>(( $index+1 ))</td>
              <td>(( x.course.courseName ))</td>
              <td>Rs.(( x.course.courseFees ))</td>
              <td>(( x.institute.name ))</td>
              <td rating='((x.rating))' className="rating-row" ng-init="rating=x.rating">

                <i className="fa fa-star a text-info" ng-mouseover='startAnimation($event);' ng-mouseout='endAnimation($event);' ng-click='rate($event , x.course.id)' title="Poor" ng-if='1<=rating' ></i>
                <i className="fa fa-star-o a text-info" ng-mouseover='startAnimation($event);' ng-mouseout='endAnimation($event);' ng-click='rate($event , x.course.id)' title="Poor" ng-if='1>rating'></i>

                <i className="fa fa-star b text-info" ng-mouseover='startAnimation($event);' ng-mouseout='endAnimation($event);' ng-click='rate($event , x.course.id)' title="Fair" ng-if='2<=rating'></i>
                <i className="fa fa-star-o b text-info" ng-mouseover='startAnimation($event);' ng-mouseout='endAnimation($event);' ng-click='rate($event , x.course.id)' title="Fair" ng-if='2>rating'></i>

                <i className="fa fa-star c text-info" ng-mouseover='startAnimation($event);' ng-mouseout='endAnimation($event);' ng-click='rate($event , x.course.id)' title="Good" ng-if='3<=rating'></i>
                <i className="fa fa-star-o c text-info" ng-mouseover='startAnimation($event);' ng-mouseout='endAnimation($event);' ng-click='rate($event , x.course.id)' title="Good" ng-if='3>rating'></i>

                <i className="fa fa-star d text-info" ng-mouseover='startAnimation($event);' ng-mouseout='endAnimation($event);' ng-click='rate($event , x.course.id)' title="Very Good" ng-if='4<=rating'></i><i className="fa fa-star-o d text-info" ng-mouseover='startAnimation($event);' ng-mouseout='endAnimation($event);' ng-click='rate($event , x.course.id)' title="Very Good" ng-if='4>rating'></i>

                <i className="fa fa-star e text-info" ng-mouseover='startAnimation($event);' ng-mouseout='endAnimation($event);' ng-click='rate($event , x.course.id)' title="Excellent" ng-if='5<=rating'></i><i className="fa fa-star-o e text-info" ng-mouseover='startAnimation($event);' ng-mouseout='endAnimation($event);' ng-click='rate($event , x.course.id)' title="Excellent" ng-if='5>rating'></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
