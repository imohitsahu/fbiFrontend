import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import ContactUs from './components/ContactUsComponent/Contact';
import About from './components/AboutUsComponent/About';
import StudentHome from './components/StudentComponent/StudentHome';
import StudentProfile from './components/StudentComponent/StudentProfile';
import AllInstitute from './components/AdminComponent/AdminInstitute';
import AllEnquiries from './components/AdminComponent/ViewEnquiries';
import AllStudent from './components/AdminComponent/AdminStudent';
import InstituteHome from './components/InstituteComponent/InstituteHome';
import StuGeneral from './components/StudentComponent/profile/General'
import StudentChangePassword from './components/StudentComponent/profile/StudentChangePassword';
import Enqofinstitute from './components/StudentComponent/profile/Enqofinstitute';
import StuHeader from './components/StudentComponent/StuHeader'
import AdminChangePassword from './components/AdminComponent/AdminProfile';

import InsCourses from './components/InstituteComponent/InsCourses';
import InsEnquiry from './components/InstituteComponent/InsEnquiry';
import InsStudent from './components/InstituteComponent/InsStudent';
import InsProfile from './components/InstituteComponent/InsProfile';
import InsChangePassword from './components/InstituteComponent/InsChangePassword';
import StudentReg from './components/RegistrationComponent/StudentRegistration';
import InstituteReg from './components/RegistrationComponent/InstituteRegistration';
import Login from './components/HomeComponent/Login';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* <Route  path="/">
          {isLoggedin ? <Redirect to="/dashboard" /> : <Home />}
        </Route> */}

        <Route path="/" element={<Login />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/sturegistration" element={<StudentReg />} />
        <Route path="/insregistration" element={<InstituteReg />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/admin" element={<AllInstitute />} />
        <Route path="/stuheader" element={<StuHeader />} />
        {/* <Route path="/adminnavr" element={<AdminNav />} /> */}



        {/* Admin */}

        <Route path="/adminprofile" element={<AdminChangePassword />} />
        <Route path="/allins" element={<AllInstitute />} />
        <Route path="/allenq" element={<AllEnquiries />} />
        <Route path="/allstu" element={<AllStudent />} />



        <Route path="/studentprofile" element={<StudentProfile />} />
        {/* profiles components */}
        <Route path="/gen" element={<StuGeneral />} />
        <Route path="/stupassword" element={<StudentChangePassword />} />
        <Route path="/enqofinstitute" element={<Enqofinstitute />} />
        {/* <Route path="/courseofstudent" element={<Courses />} />    */}



        {/* Institute */}
        <Route path="/institute" element={<InsCourses />} />
        <Route path="/inshome" element={<InstituteHome />} />
        <Route path="/insenq" element={<InsEnquiry />} />
        <Route path="/insstu" element={<InsStudent />} />
        <Route path="/inspro" element={<InsProfile />} />
        <Route path="/inspass" element={<InsChangePassword />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;