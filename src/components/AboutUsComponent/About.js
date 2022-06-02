import React from 'react';
import Footer from '../Footer';
import Header from '../Header';

function About() {
    return (
        <>
            <Header />
            <div className="content col-lg-9 mx-auto m-3">
                <div className="overview text-center p-3">
                    <h4 className="m-4 text-info">Overview</h4>
                    <p>In this Era Coaching Lover we are here to help you in finding best institute
                        or Coaching classes in your nearest area for your subject so that you get
                        best studies.
                    </p>
                </div>

                <div className="vision text-center p-3">
                    <h4 className="m-4 text-info">Vision And Mission</h4>
                    <p>This application actually works as a Bridge between the student and the institute.
                        By using this application students can search their Nearby coaching.
                        Institute and also check about the Ratings for that Institute.
                        This application will give full information about the tutor  and that institute to the students.
                    </p>
                    <p>As Bridge b/w Student and Institute our app also provide a full management
                        for Institute.
                        Institute  can share it all its Information about courses and fees .
                        Institute also maintain data of  student  who take  Admission or Enquiry for
                        Course.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default About;