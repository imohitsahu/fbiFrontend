import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer style={{ backgroundColor: "#343a40" }}>
			<div className="container">
				<hr className="text-white bg-light" />

				<div className="ml-4 pl-4 row">
					<ul className="list-inline text-white col-lg-6">
						<li className="list-inline-item"><h4>Follow Us</h4></li>
						<li className="list-inline-item"><a target='blank' href="https://www.facebook.com/imohitsahu"><i className="fa fa-facebook-square"></i></a></li>
						<li className="list-inline-item"><a target='blank' href="https://www.twitter.com/"><i className="icon-social fa fa-twitter-square"></i></a></li>
						<li className="list-inline-item"><a target='blank' href="https://www.pinterest.com/"><i className="icon-social fa fa-pinterest-square"></i></a></li>
						<li className="list-inline-item"><a target='blank' href="https://www.github.com/imohitsahu"><i className="icon-social fa fa-github"></i></a></li>
						<li className="list-inline-item"><a target='blank' href="https://www.youtube.com"><i className="icon-social fa fa-youtube-play"></i></a></li>
						<li className="list-inline-item"><a target='blank' href="https://www.linkedin.com/imohitsahu"><i className="icon-social fa fa-linkedin-square"></i></a></li>
						<li className="list-inline-item"><a target='blank' href="https://www.instagram.com/imohitsahu"><i className="icon-social fa fa-instagram"></i></a></li>
					</ul>

					<ul className="list-inline text-white rounded">
						<li className="list-inline-item"><h4>Instant Support</h4></li>
						<li className="list-inline-item"><a target='blank' href="https://wa.me/919893217569"><i className="icon-social fa fa-whatsapp"></i></a></li>
						<li className="list-inline-item"><a href="tel:+919893217569" ><i className="icon-social fa fa-phone"></i></a></li>
					</ul>
				</div>

				<hr className="text-white bg-light" />

				<div className="row footer-links" style={{ color: "#DAE0E2" }}>
					<div className="col-lg-3">
						<ul style={{ listStyle: "none" }}>
							<li ><b>Quick Links</b></li>
							<li className="text-warning"><b>-------</b></li>
							<li ><Link to="/" className="text-white">Home</Link></li>
							<li ><Link to="/about" className="text-white">About Us</Link></li>
							<li ><Link to="/contact" className="text-white">Contact Us</Link></li>
						</ul>
					</div>

					<div className="col-lg-3">
						<ul style={{ listStyle: "none" }}>
							<li ><b>Contact Info</b></li>
							<li className="text-warning"><b>-------</b></li>
							<li className="text-white">B15, Insta House BTM 2nd Stage, Bengaluru, KA</li>
							<li className="text-white">+919893217569</li>
							<li className="text-white">+918319125282</li>
							<li className="text-white">findbestinstitute@gmail.com</li>
						</ul>
					</div>

					<div className="col-lg-3">
						<ul style={{ listStyle: "none" }}>
							<li ><b>Policies</b></li>
							<li className="text-warning"><b>-------</b></li>
							<li ><a href="https://www.contractscounsel.com/t/us/terms-and-conditions#toc--what-are-terms-and-conditions-" className="text-white">Terms & Conditions</a></li>
							<li ><a href="https://getterms.io/" className="text-white">Privacy Policy</a></li>
						</ul>
					</div>

				</div>

				<hr className="" style={{ backgroundColor: "#7B8788" }} />

				<div className="p-2 text-light">
					<p style={{ fontSize: "16px" }}>&copy; Copyright 2022 Find Best Institute</p>
				</div>
			</div>
		</footer>
	)
}
export default Footer;