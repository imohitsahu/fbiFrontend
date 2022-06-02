import React, { useState } from 'react';
import './Style.css'
import { Backdrop, CircularProgress } from "@material-ui/core";
import InstituteService from '../../services/InstituteService';
import { Country, State, City } from 'country-state-city';
import Footer from '../Footer';
import Header from '../Header';

function InstituteReg() {

    const [institutes, setInstitutes] = useState(
        {
            email: "",
            insName: "",
            password: "",
            contactNo: "",
            city: "",
            state: "",
            map: "",
            status: ""
        });

    const [country, setCountry] = useState(Country.getAllCountries());
    const [countryid, setCountryid] = useState('');
    const [st, setSt] = useState([]);
    const [stateid, setStateid] = useState('');
    const [selectedSt, setSelectedSt] = useState('');
    const [city, setCity] = useState([]);
    const [selectedCity, SetSelectedCity] = useState('');

    const handlecountry = (event) => {
        const getcountryid = event.target.value;
        setCountryid(getcountryid);
        setSt(State.getStatesOfCountry(getcountryid))
    }
    const handlestate = (event) => {
        const getstateid = event.target.value;
        setStateid(getstateid);
        setInstitutes({ ...institutes, state: State.getStateByCodeAndCountry(getstateid, countryid).name })
        setSelectedSt(State.getStateByCodeAndCountry(getstateid, countryid).name)
        setCity(City.getCitiesOfState(countryid, getstateid))
    }

    const handlecity = (event) => {
        setInstitutes({ ...institutes, city: event.target.value })
        SetSelectedCity(event.target.value)
    }

    const [showpasswordError, setShowPasswordError] = useState(false)
    const [passwordError, setPasswordError] = useState()
    const [success, SetSuccess] = useState(false)
    const [failure, SetFailure] = useState(false)
    const [failureMessage, SetFailureMessage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const handleClose = () => setShow(false);

    const [confirmPassword, setConfirmPassword] = useState()

    const changeHandle = e => {
        setInstitutes((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (confirmPassword === institutes.password) {
            setIsSubmit(true);
            setLoading(true)
            await InstituteService.create(institutes)
                .then(response => {
                    setPasswordError(null)
                    SetSuccess(true);
                    SetFailure(false);
                })
                .catch(error => {
                    SetFailureMessage(error.response.data)
                    SetSuccess(false);
                    setLoading(false)
                    SetFailure(true)
                })

            setLoading(false)
            setIsSubmit(false)
        } else {
            setShowPasswordError(true)
            setPasswordError("Password and Confirm Password does not match")
        }
    };

    const validate = (values) => {
        const errors = {}
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const phoneFormat = /^\d{10}$/
        if (!values.email) {
            errors.email = "Email is required"
        } else if (!emailFormat.test(institutes.email)) {
            errors.email = "Should enter valid email"
        }
        if (!values.contactNo) {
            errors.contactNo = "Phone number is required"
        } else if (!phoneFormat.test(institutes.contactNo)) {
            errors.contactNo = "Phone number should be ten digit"
        }
        if (!(values.password === confirmPassword)) {
            errors.password = "password and cnf password does not same"
        }
        return errors
    }

    return (
        <>
            <Header />
            {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>}
            {!loading && <>
                <div className="col-lg-4 col-sm-8 col-md-6 mx-auto p-0 rounded border-top-0 bg-white border m-4" style={{ boxShadow: "2px 2px 5px grey" }}>
                    <form className="form-body" onSubmit={handleSubmit}>
                        {success && <p className="alert alert-success text-center">Successfully registered</p>}
                        {failure && <p className="alert alert-warning text-center">{failureMessage}</p>}

                        <div className="jumbotron p-0 m-0 text-white text-center" style={{ backgroundColor: "#15B5B0" }}>
                            <h3 className="p-3">Institute Registration</h3>
                        </div>
                        <div className="input-group mt-2">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Institute Name </label>
                            </div>
                            <input className="form-control" type="text" name="insName" placeholder="Institute Name"
                                value={institutes.insName}
                                onChange={changeHandle}
                                required />
                        </div>

                        <div className="input-group mt-2">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Email </label>
                            </div>
                            <input type="email" className="form-control" name="email" placeholder="Institute Email"
                                title="Email should be in valid format.(ex: example@gmail.com)"
                                value={institutes.email} onChange={changeHandle}
                                required />
                        </div>
                        {/* <span className='text-danger'>{formError.email}</span> */}

                        <div className="input-group mt-2">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Phone No.</label>
                            </div>
                            <input type="tel" className="form-control" name="contactNo" placeholder="12345-67890"
                                title="Phone number should be in 10 digits without alphabets"
                                value={institutes.contactNo} onChange={changeHandle}
                                required />
                        </div>
                        {/* <span className='text-danger'>{formError.contactNo}</span> */}

                        <div className="input-group mt-2">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Map-Link </label>
                            </div>
                            <textarea className="form-control" type="text" name="map" placeholder="Institute Map"
                                value={institutes.map} onChange={changeHandle}
                                required />
                        </div>

                        <div className="input-group mt-2">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Country</label>
                            </div>
                            <select name="country" className="form-control" onChange={(e) => handlecountry(e)} required>
                                <option value="">--Select Country--</option>
                                <option value="IN">India</option>
                                {
                                    country.map((getcon, index) => {
                                        return (
                                            <option key={index} value={getcon.isoCode}>{getcon.name} </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="input-group mt-2">
                            <div className="input-group-prepend">
                                <label className="input-group-text">State</label>
                            </div>
                            <select className="form-control" name="state" onChange={(e) => handlestate(e)} required>
                                <option value="">--Select State--</option>
                                {
                                    st.map((getst, index) => (
                                        <option key={index} value={getst.isoCode}>{getst.name} </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="input-group mt-2">
                            <div className="input-group-prepend">
                                <label className="input-group-text">City</label>
                            </div>
                            <select className="form-control" name="city" onChange={changeHandle} required>
                                <option value="">--Select City--</option>
                                {
                                    city.map((gcity, index) => (
                                        <option key={index} value={gcity.name}> {gcity.name} </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="input-group mt-2">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Password </label>
                            </div>
                            <input className="form-control" type="password" name="password"
                                placeholder="Password"
                                title="At least 1 Uppercase
                                1 Lowercase
                                1 Number
                                1 Special Character
                                8 to 12 characters required"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                                value={institutes.password}
                                onChange={changeHandle}
                                required />
                        </div>

                        <div className="input-group mt-2">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Confirm Password </label>
                            </div>
                            <input className="form-control" type="password" name="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required />
                        </div>
                        {showpasswordError && <span className="text-danger">{passwordError}</span>}
                        {/* <span className='text-danger'>{formErrors.password}</span> */}
                        <div className="mt-3">
                            <input type="submit" className="btn text-white form-control" value="Signup" />
                        </div>
                    </form>
                </div>
            </>}
            <Footer />
        </>
    )
}
export default InstituteReg;