import React from 'react';
import Footer from '../Footer';
import Header from '../Header';


function Contact() {
    return (
        <div>
            <Header />
            <div className="mt-2 p-4 mx-auto text-center col-lg-6">
                <h1>Get In <font color="#2ecc72">Touch</font></h1>
                <p style={{ color: "#7B8788" }}>
                    Have any questions or doubts? We are just a call away. You can also drop down at our office
                    and we'll chat!
                </p>
            </div>

            <div className="m-3">
                <div className="row col-lg-9 mx-auto m-4">
                    <div className="col-lg-4 container" style={{ position: "relative", textAlign: "center" }}>
                        <div className="centered" style={{ position: "absolute", top: "50%", left: "50%", textAlign: "center", transform: "translate(-50%, -50%)" }}>
                            <h5>Send Us An Email</h5>
                            <h6>WE'RE STANDING BY!</h6>
                            <p>Email: contact@findbestclass.com today!</p>
                        </div>
                    </div>

                    <div className="col-lg-4 container" style={{ position: "relative", textAlign: "center", minHeight: "50vh" }}>
                        <div className="centered" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                            <h5>Corporate Office</h5>
                            <h6>CORPORATE LOCATION</h6>
                            <p>B15, Insta House BTM 2nd Stage, Bengaluru, KA
                                +919893217569
                                +918319125282
                                msahu7362@gmail.com.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 container" style={{ position: "relative", textAlign: "center" }}>
                        <div className="centered" style={{ position: "absolute", top: "50%", left: "50%", textAlign: "center", transform: "translate(-50%, -50%)" }}>
                            <h5>Call us To Schedule</h5>
                            <h6>Call us Today</h6>
                            <p>+919144460897</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Contact;