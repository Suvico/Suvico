import React, { useState, useEffect } from "react";
import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert, TextField , InputLabel ,Select ,Autocomplete} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  validAadhar,
  validEmail,
  validPAN,
  validPhone,
  validPincode,
} from "./helpers/regex";
import numberToWords from "number-to-words";
import axios from "axios";
import bankData from './bankData.json';
import { signup } from "./helpers/index";
import { getServices } from "../auth";
import { API } from "../backend";
import Footer from "./Footer";
import { Verified, VerifiedOutlined } from "@mui/icons-material";


export default function Signup() {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [states, setStates] = useState("");
  const [country, setCountry] = useState("");
  const [aadharno, setAadharno] = useState("");
  const [panno, setPanno] = useState("");
  const [todebit, setTodebit] = useState("SB");
  const [accountno, setAccountno] = useState("");
  const [vaccountno, setVAccountno] = useState("");
  const [name_of_bank, setNameOfBank] = useState("");
  const [ifsc, setIFSC] = useState("");
  const [amountdigits, setAmountDigits] = useState("");
  const [amountwords, setAmountWords] = useState("");
  const [user, setUser] = useState({});
  // const [services, setServices] = useState([]);

  const [dob, setDOB] = useState();
  const [name_of_service, setTOS] = useState("Saving");
  const [untilcancelled, setUntilCancelled] = useState(false);
  const [iagree, setIagree] = useState(false);

  const [error, setError] = useState(true);

  // const sendMail = async (email, firstname, id) => {
  //   console.log(user);
  //   const formData = new FormData()
  //   formData.append('from', "user");
  //   formData.append('to', email);
  //   formData.append('subject', "Suvico Registration Successfull");
  //   formData.append('html', `<!DOCTYPE html>
  //   <html>
  //     <head>
  //       <title>Thank you for registering!</title>
  //       <style>
  //         body {
  //           font-family: Arial, sans-serif;
  //           font-size: 16px;
  //           line-height: 1.5;
  //           color: #333;
  //           backgroundColor: #f5f5f5;
  //           padding: 20px;
  //         }
  //         h1 {
  //           font-size: 24px;
  //           margin-bottom: 20px;
  //         }
  //         p {
  //           margin-bottom: 20px;
  //         }
  //         a {
  //           color: #007bff;
  //           text-decoration: none;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       <h1>Thank you for registering ${firstname}!</h1>
  //       <p>We're excited to have you join our community. Your account has been created successfully.</p>
  //       <p>If you ever wish to unsubscribe from our emails, you can do so by clicking the "Unsubscribe" button below:</p>
  //    <p>Keep this id safe: ${id}</p>
  //       <a href='https://suvicosolutions.com/#/unsubscribe'><button onclick="https://suvicosolutions.com/#/unsubscribe">Unsubscribe
  //      </button></a>
  //      <p> OR visit: https://suvicosolutions.com/#/unsubscribe </p>
  //       <p>If you have any questions or issues, please don't hesitate to contact us at <a href="mailto:support@suvicosolutions.com">support@suvicosolutions.com</a>.</p>
  //     </body>
  //   </html>
  //   ` );
  //   // console.log(quillRef.current.getEditor().getContents())
  //   // if (attachment) {
  //   //   formData.append('attachment', attachment);
  //   // }

  //   try {
  //     const response = await axios.post(`${API}/send-mail`, formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     if (!response.data) {
  //       setError("Error in mailing")
  //     }
  //     navigate('/confirmation', { state: { status: true, data: user } })

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const [isAccountNoMatching, setIsAccountNoMatching] = useState(true);
  const handleAccountNoChange = (e) => {
    setAccountno(e.target.value);
    setIsAccountNoMatching(e.target.value === vaccountno);
  };
 
  const handleVerifyAccountNoChange = (e) => {
    setVAccountno(e.target.value);
    setIsAccountNoMatching(e.target.value === accountno);
  };

  const [isPhonenoValid, setIsPhonenoValid] = useState(true);

  const handlePhonenoChange = (e) => {
    setPhoneno(e.target.value);
    setIsPhonenoValid(validatePhoneno(e.target.value));
  };
  const validatePhoneno = (phoneNumber) => {
   
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const [isPincodeValid, setIsPincodeValid] = useState(true);

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
    setIsPincodeValid(validatePincode(e.target.value));
  };

  const validatePincode = (pincode) => {
 
    const pincodePattern = /^\d{6}$/;
    return pincodePattern.test(pincode);
  };


  const [selectedBank, setSelectedBank] = useState('');
  const handleBankSelect = (event, value) => {
    setSelectedBank(value);

    // Find the corresponding IFSC code from the bankData JSON
    if (value) {
      const selectedBankObj = bankData.find((bank) => bank.bankName === value);
      if (selectedBankObj) {
        setIFSC(selectedBankObj.ifsc);
      } else {
        setIFSC('');
      }
    } else {
      setIFSC('');
    }
  };
  
  const handleBankInputChange = (event) => {
    const typedBankName = event.target.value;
    setSelectedBank(typedBankName);
  };


  const handlesubmit = async(e) => {
    e.preventDefault();
    const data={
      "firstname":firstname,
      "lastname":lastname,
      "email":email,
      "phoneno":phoneno,
      // "address":address,
      "city":city,
      "pincode":pincode,
      "states":states,
      "country":country,
      // "aadharno":aadharno,
      // "panno":panno,
      "todebit":todebit,
      "accountNo":accountno,
      "vaccountno":vaccountno,
      "name_of_bank":name_of_bank,
      "ifsc":ifsc,
      "amountdigits":amountdigits,
      // "amountwords":amountwords, 
      "dob":dob,
      "selectedBank":selectedBank,
      "name_of_service":name_of_service 
    };
    
    
    try {
      const response = await axios.post(`http://localhost:4000/Suvico` , data);
      console.log(JSON.stringify(response.data));
      toast.success('Success Notification !', {
        position: toast.POSITION.TOP_CENTER
    });
      navigate("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // alert('Email is already registered');
        toast.error('Error Email already registered !', {
          position: toast.POSITION.TOP_CENTER
      });
        // Display an alert or handle the error in some other way
      } else {
        console.log('Something went wrong');
        toast.error('Something went wrong Try again !', {
          position: toast.POSITION.TOP_CENTER
      });
        // Handle other types of errors here
      }
      console.log(error);
      
     
    }
  };

 

  // useEffect(() => {
  //   getServices().then(data => {
  //     // console.log(data)
  //     setServices(data)
  //   }).then(err => {
  //     console.log(err)
  //   })
  // }, [])

  return (
    <>
   <ToastContainer />

    <div className="flex flex-col">
    <div>
      {flag && (
        <div className="d-flex align-items-center">
          <strong>Loading...</strong>
          <div
            className="spinner-border "
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      )}

      <section className="gradient-custom-2 mb-40">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ "borderRadius": "15px" }}
              >
            <form onSubmit={handlesubmit}>
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-6">
                      <div className="p-5">
                        <h3
                          className="fw-normal mb-5 text-3xl"
                          style={{ color: "#4835d4" }}
                        >
                          General Information
                        </h3>

           

                        <div className="row">
                          <div className="col-md-6 mb-4 ">
                            <div className="">
                              <TextField
                                type="text" placeholder="First Name"
                                fullWidth id="fullWidth"
                                value={firstname}
                                label="firstname"
                                onChange={(e) => setFirstname(e.target.value)} required
                              />
                             
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 ">
                          <div className="">
                              <TextField
                                type="text" placeholder="Last Name" 
                                fullWidth id="fullWidth"
                                value={lastname}
                                label="lastname"
                                onChange={(e) => setLastname(e.target.value)}
                              /> 
                            </div>
                          </div>
                        </div>


                          <div className="">
                              <TextField
                                type="email" placeholder="Email"
                                // id="demo-helper-text-misaligned"
                                fullWidth id="fullWidth"
                                value={email}
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                             

                        </div>

                        <div className="row mt-4">
        <div className="col">
          <div className="">
            <TextField
              fullWidth
              id="fullWidth"
              type="number"
              placeholder="Phone no"
              value={phoneno}
              label="Phone Number"
              onChange={handlePhonenoChange}
              required
            />
          </div>
        </div>
      </div>

      {!isPhonenoValid && (
        <p style={{ color: 'red' }}>Phone number should be 10 digits</p>
      )}


  
                      
                        {/* <div className="row mt-4">
                          <div className="col">
                          <div className="">
                              <TextField
                                type="text" placeholder="Address"
                                // id="demo-helper-text-misaligned"
                                fullWidth id="fullWidth"
                                value={address}
                                label="Address"
                                onChange={(e) => setAddress(e.target.value)}
                                
                              />
                             
                            </div>
                           
                          </div>
                        </div> */}

                        <div className="row mt-4">
                          <div className="mb-4 pb-2">
                          <div className="">
                              <TextField
                                type="text" placeholder="City"
                                fullWidth id="fullWidth"                                value={city}
                                label="City"
                                onChange={(e) => setCity(e.target.value)}
                                
                              />
                           
                            </div>
                           
                          </div>
                          <div className=" pb-2">
        <div className="">
          <TextField
            type="number"
            placeholder="Pincode"
            fullWidth id="fullWidth"
            value={pincode}
            label="Pincode"
            onChange={handlePincodeChange}
            
          />
        </div>
      </div>
                        </div>
                        {!isPincodeValid && (
        <p style={{ color: 'red' }}>Pincode number  is incorrect</p>
      )}

                        {/* <div className="row ">
                          <div className="col-md-6 mb-4 pb-2">
                          <div className="">
                              <TextField
                                type="text" placeholder="State"
                                id="demo-helper-text-misaligned"
                                value={country}
                                label="Country"
                                onChange={(e) => setCountry(e.target.value)}
                                
                              />
                             
                            </div>
                           
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                          <div className="">
                              <TextField
                                type="text" placeholder="Country"
                                id="demo-helper-text-misaligned"
                                value={country}
                                label="Country"
                                onChange={(e) => setCountry(e.target.value)}
                                
                              />
                             
                            </div>
                            
                          </div>
                        </div> */}

                        {/* <div className="row ">
                          <div className="col">
                          <div className="">
                              <TextField
                                type="text" placeholder="Aadhar Card Number"
                                // id="demo-helper-text-misaligned"
                                fullWidth id="fullWidth"
                                value={aadharno}
                                label="Aadhar Card Number"
                                onChange={(e) => setAadharno(e.target.value)}
                                
                              />
                             
                            </div>
                            
                          </div>
                        </div> */}

                        {/* <div className="row mt-4">
                          <div className="col">
                          <div className="">
                              <TextField
                                type="text" placeholder="PAN Card Number"
                                // id="demo-helper-text-misaligned"
                                fullWidth id="fullWidth"
                                value={panno}
                                label="PAN Card Number"
                                onChange={(e) => setPanno(e.target.value)}
                                
                              />
                             
                            </div>
                            
                          </div>
                        </div> */}


                      
            <div className="row mt-4">
                          <div className="col">
                          <div className="">
                              <TextField
                               type="text" placeholder="State"
                             
                               fullWidth id="fullWidth"
                               value={states}
                               label="State"
                               onChange={(e) => setStates(e.target.value)}
                                required
                              />
                             
                            </div>
                         
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col">
                          <div className="">
                              <TextField
                               type="text" placeholder="Country"
                               fullWidth id="fullWidth"
                               value={country}
                               label="Country"
                               onChange={(e) => setCountry(e.target.value)}
                               required
                              />
                             
                            </div>
                         
                          </div>
                        </div>



                      </div>
                    </div>

                    {/*White Section Over */}

                    <div className="col-lg-6 bg-[#d5d53f] text-light">
                      <div className="p-5">
                        <h3 className="fw-normal mb-5 text-[indigo] text-3xl">Banking Details</h3>

                        <div className="mb-4 py-2">
                          <div className="form-outline  border border-dark">
                            <select className="form-control form-control-lg " aria-label="Default select example" value={todebit} onChange={(e) => setTodebit(e.target.value)} required>
                              <option className='bg-[#d5d53f] border border-white h6'>To Debit</option>
                              <option  value="SB" className='bg-[#d5d53f] border border-white h6'>SB</option>
                              <option value="CA" className='bg-[#d5d53f] border border-white h6 '>CA</option>
                              <option value="CC" className='bg-[#d5d53f] border border-white h6'>CC</option>
                              <option value="SB-NRE" className='bg-[#d5d53f] border border-white h6'>SB-NRE</option>

                              <option value="SB-NRO" className='bg-[#d5d53f] border border-white h6'>SB-NRO</option>
                              <option value="OTHER" className='bg-[#d5d53f] border border-white h6'>OTHER</option>

                            </select> 
                            <i className="fas fa-caret-down position-absolute top-50 end-2 translate-middle-y"></i> </div>
                        </div>
                          
                        
                          <div className="">
                          {/* <TextField
                                type="text" 
                                // id="demo-helper-text-misaligned"
                                fullWidth id="fullWidth"
                                value={todebit}
                                label="To Debit"
                                onChange={(e) => setTodebit(e.target.value)}
                                  
                              /> */}
                              
                          </div> 
                        


                          <div className="mt-4 ">
                          <TextField
                                type="number" 
                                // id="demo-helper-text-misaligned"
                                fullWidth id="fullWidth"
                                value={accountno}
                                label="Account Number"
                                // onChange={(e) => setAccountno(e.target.value)}
                                onChange={handleAccountNoChange}
                                required
                              />

                          </div>
                          {accountno.length > 0 && (accountno.length < 8 || accountno.length > 17) && (
        <p style={{ color: 'red' }}>Account number should be between 8 and 17 digits</p>
      )}
              

                          <div className="mt-4 ">
                          <TextField
                                type="number" 
                              
                                fullWidth id="fullWidth"
                                
                                label="Verify Account Number"
                                onChange={handleVerifyAccountNoChange}
                                // onChange={(e) => setVAccountno(e.target.value)}
                                required
                              />
                         
                        </div>

                        {!isAccountNoMatching && (
        <p style={{ color: 'red' }}>Account numbers do not match</p>
      )}
                
                       

{/*                         
                            <div className="mt-4 ">
                          <TextField
                                type="text" 
                                
                                fullWidth id="fullWidth"
                                value={name_of_bank}
                                label="Name of Bank"
                                onChange={(e) => setNameOfBank(e.target.value)}
                                required
                              />
                         
                        </div> */}

<div className="mt-4">
<Autocomplete
          options={bankData.map((bank) => bank.bankName)}
          value={selectedBank}
          onChange={handleBankSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Bank or Type"
              fullWidth
              required
            />
          )}
        />
      </div>

                           <div className="flex flex-row">
                            <div className="mt-4  col-md-6 ">
                          <TextField
                                type="text" 
                                id="demo-helper-text-misaligned"
                                // fullWidth id="fullWidth"
                                value={ifsc}
                                label="IFSC/MICR"
                                // onChange={(e) => setIFSC(e.target.value)}
                                disabled
                                required
                              />
                          
                          </div>
                         
                            <div className="mt-4  col-md-6 ml-4">
                             <TextField
                                type="number" 
                                id="demo-helper-text-misaligned"
                                // fullWidth id="fullWidth"
                                value={amountdigits}
                                label="Amount in Digits"
                                onChange={(e) => setAmountDigits(e.target.value)}
                                required
                              />
                              </div>
                          </div>
                      
                          <div className="mb-4 pb-2 mt-4">
  <div className=" py-2">
    <div className="form-outline border border-dark position-relative">
      <select
   
        className="form-control form-control-lg"
        aria-label="Default select example"
        value={name_of_service}
        label="Account type"
        onChange={(e) => setTOS(e.target.value)}
        required
        defaultValue="Saving"
      >
           
        <option className='bg-[#d5d53f] h6'>Account type</option>
        <option value="Saving" className='bg-[#d5d53f] h6'> Saving</option>
        <option value="Current" className='bg-[#d5d53f] h6'>Current</option>
      </select>
      <i className="fas fa-caret-down position-absolute top-50 end-2 translate-middle-y"></i>
      
    </div>
  </div>
</div>


                        {/* <div className="mt-4">
                          
                          <TextField
                                type="text" 
                                // id="demo-helper-text-misaligned"
                                fullWidth id="fullWidth"
                                value={amountwords}
                                label="Amount in Words"
                                onChange={(e) => setAmountWords(e.target.value)}
                                
                              />
                          
                        </div> */}

                        <div className=" mt-4">
                          
                            
                          
                       <TextField
                                type="date" 
                                // id="demo-helper-text-misaligned"
                                fullWidth id="fullWidth"
                                value={dob}
                                label="Date of Birth"
                                onChange={(e) => setDOB(e.target.value)}
                                
                                
                              />
                  
                          
                        </div>

                        {/* <div className="mb-4 pb-2 mt-4">
                          <div className="form-outline form-white border border-light">
                            <select className="form-control form-control-lg " aria-label="Default select example" value={name_of_service} onChange={(e) => setTOS(e.target.value)}>
                              <option selected className='bg-indigo border border-white h6'>Select Service</option>
                              {services.map((data, index) => {
                                return (
                                  <option value={data.name_of_service} className='bg-indigo border border-white h6 text-white'>{data.name_of_service}</option>
                                )

                              })}

                            </select>  </div>
                        </div> */}



                        <div className="form-check d-flex justify-content-start my-4 pb-3">
                          <input
                            className="form-check-input me-3"
                            type="checkbox"
                            id="form2Example3c"
                            value={!iagree}
                            checked={iagree}
                            onChange={(e) => setIagree(e.target.value)}
                            required
                          />
                          <label
                            className="form-check-label text-dark"
                            htmlFor="form2Example3"
                          >
                            I do accept the{" "}
                            <Link
                              to="/terms-and-conditions"
                              className="text-white"
                            >
                              <u>Terms and Conditions</u>
                            </Link>{" "}
                            of your site.
                          </label>
                        </div>

                        <input
                          type="submit"
                          className="btn btn-primary btn-lg"
                          data-mdb-ripple-color="dark"
                          // onClick={PostData}
                       />
                      
                      </div>
                     
                    </div> 
                  </div>
                </div>
                </form>
              </div>
            </div>   
          </div>
        </div>
        
      </section>

    </div>
    </div>
    <div className="-mt-40">
    <Footer/>
    </div>
    
    </>
  );
}
