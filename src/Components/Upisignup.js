
import React, { useState, useEffect } from "react";
import "./style.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";

import { Alert, TextField, MenuItem, InputLabel, Select, Autocomplete } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import pay1 from '../Images/Z12.jpg'



export default function Upisignup() {



  const [formData, setFormData] = useState({
    virtualAddress: '',
    name: '',
    mobileNumber: '',
    email: '',
    amount: 500,
    pattern: 'ASPRESENTED',
    startDate: '',
    endDate: '',
    add1: '',
    add2: '',
    add3: '',
    add4: '',
  });
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [showResponseBox, setShowResponseBox] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const clearFormData = () => {
    setFormData({
      virtualAddress: '',
      name: '',
      mobileNumber: '',
      email: '',
      amount: 500,
      pattern: 'ASPRESENTED',
      startDate: '',
      endDate: '',
      add1: '',
      add2: '',
      add3: '',
      add4: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSubmitError('');
    // toast.info('Test toast');
    // setSubmitSuccess('');

    // Include the formatted dates in the formData
    const formDataWithDates = {
      ...formData,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
    };

    try {
      const response = await axios.post('http://localhost:4000/api/upiTransaction', formDataWithDates);
  
           console.log('backend data', response.data);
            // console.log('Submitted Data:', formDataWithDates);
            console.log('API response', response.data.response);
            console.log('Status code', response.data.response.StatusCode);
            console.log('status desc', response.data.response.StatusDesc);
    //     if (response.data.response.StatusCode === "NP000") {
    //       toast.info(JSON.stringify(response.data.response));
    //       // Display success message in a toast
    //     // clearFormData(); 
    //   } else {
    //     toast.error(response.data.response.StatusDesc); 
    //   }
    // } 
    
    if (response.data.response.StatusCode === "NP000") {
   
    const formattedMessage = `Status: ${response.data.response.status}\n` +
                             `StatusDesc: ${response.data.response.StatusDesc}\n` +
                             `ReferenceNumber: ${response.data.response.ReferenceNumber}\n` +
                            //  `StatusCode: ${response.data.response.StatusCode}\n` +
                             `Make sure to take a screenshot or save the ReferenceNumber for Future Purpose.`
                            ;

    setResponseMessage(formattedMessage);
      setShowResponseBox(true);
      clearFormData();
    } else {
      setResponseMessage(`Error: ${response.data.response.StatusDesc}`);
      setShowResponseBox(true);
    }
  } 
    
  catch (error) {
  console.error(error);
  setResponseMessage('Failed to create the transaction');
  setShowResponseBox(true);
}
};

  
 
 

  const [isPhonenoValid, setIsPhonenoValid] = useState(true);

  const handlePhonenoChange = (e) => {
    const phoneNumber = e.target.value;
    setFormData({ ...formData, mobileNumber: phoneNumber });
    setIsPhonenoValid(validatePhoneno(phoneNumber));
  };

  const validatePhoneno = (phoneNumber) => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
  };
 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedStartDate = formatDate(formData.startDate);
  const formattedEndDate = formatDate(formData.endDate);


  return (
    <div>


  


      <div className="container mt-4">
        <h1 className="mb-4 text-center text-bold text-decoration-underline" style={{ fontSize: "28px" }}>UPI Transaction Signup</h1>
        <div class="row">
          <div class="col-lg-5 mb-3 px-5">

            <img class="img-fluid" src={pay1} alt="Your Image" />
          </div>

          <div class="col-lg-7 mb-3">
            <form id="signupForm" method="POST" onSubmit={handleSubmit}>
              <div className="row">
                {/* Virtual Address */}
                <div className="col-lg-6 mb-3">
                  <label htmlFor="virtualAddress" className="form-label">
                    Virtual Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="virtualAddress"
                    name="virtualAddress"
                    value={formData.virtualAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Name */}
                <div className="col-lg-6 mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Mobile Number */}
                <div className="col-lg-6 mb-3">
                  <label htmlFor="mobileNumber" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handlePhonenoChange}
                    required
                  />
                  {!isPhonenoValid && (
                    <p style={{ color: 'red' }}>Phone number should be 10 digits</p>
                  )}
                </div>
                {/* Email */}
                <div className="col-lg-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Amount */}
                <div className="col-lg-6 mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Pattern */}
                <div className="col-lg-6 mb-3">
        <label htmlFor="pattern" className="form-label">
          Pattern
        </label>
        <select
          className="form-select"
          id="pattern"
          name="pattern"
          value={formData.pattern}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Pattern</option>
          <option value="ONETIME">One-Time</option>
          <option value="MONTHLY">Monthly</option>
          <option value="WEEKLY">Weekly</option>
          <option value="DAILY">Daily</option>
          <option value="QUARTERLY">Quarterly</option>
          <option value="FORTNIGHTLY">Fortnightly</option>
          <option value="HALFYEARLY">Half-Yearly</option>
          <option value="YEARLY">Yearly</option>
          <option value="ASPRESENTED">ASPRESENTED</option>
      
        </select>
      </div>

                {/* Start Date */}
                <div className="col-lg-6 mb-3">
                  <label htmlFor="startDate" className="form-label">
                    Start Date
                  </label>
                  {/* <p>{formattedStartDate}</p> */}
                  <input
                    type="date"
                    pattern="\d{2}/\d{2}/\d{4}"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
 
                    placeholder="dd/mm/yyyy"
                    required
                  />
                </div>


                {/* End Date */}
                <div className="col-lg-6 mb-3  ">
                  <label htmlFor="endDate" className="form-label">
                    End Date
                  </label>
                  {/* <p>{formattedEndDate}</p> */}
                  <input
                    type="date"
                    pattern="\d{2}/\d{2}/\d{4}"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    placeholder="dd/mm/yyyy"
                    required
                  />
                </div>
                {/* Additional Info 1 */}
                <div className="col-lg-6 mb-3 hidden ">
                  <label htmlFor="add1" className="form-label">
                    Additional Info 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="add1"
                    name="add1"
                    value={formData.add1}
                    placeholder="Optional"
                    onChange={handleInputChange}
                  />
                </div>
                {/* Additional Info 2 */}
                <div className="col-lg-6 mb-3 hidden">
                  <label htmlFor="add2" className="form-label">
                    Additional Info 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="add2"
                    name="add2"
                    value={formData.add2}
                    placeholder="Optional"
                    onChange={handleInputChange}
                  />
                </div>
                {/* Additional Info 3 */}
                <div className="col-lg-6 mb-3 hidden ">
                  <label htmlFor="add3" className="form-label">
                    Additional Info 3
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="add3"
                    name="add3"
                    value={formData.add3}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Additional Info 4 */}
                <div className="col-lg-6 mb-3  hidden">
                  <label htmlFor="add4" className="form-label">
                    Additional Info 4
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="add4"
                    name="add4"
                    value={formData.add4}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-custom mt-2 btn-md">
                Sign Up
              </button>
            </form>
            {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
          </div>
        </div>

      </div>



      {showResponseBox && (
        <div className="response-box">
          <div className="response-content">
            <p>{responseMessage}</p>
            <button onClick={() => setShowResponseBox(false)}>Close</button>
          </div>
        </div>
        
      )}


    </div>
  )
}
