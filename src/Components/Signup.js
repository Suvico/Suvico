import React, { useState, useEffect } from "react";
import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert, TextField ,MenuItem, InputLabel ,Select ,Autocomplete} from "@mui/material";
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
  const [account_holder_name, setaccount_holder_name] = useState("");
  
  const [email, setEmail] = useState("");
  const [mobile_no, setPhoneno] = useState("");
  // const [loan_no, setLoan_no] = useState("");
  const [bankResponse, setBankResponse] = useState(null);
  const [bank_account_no, setbank_account_no] = useState("");
  const [bank_account_no_confirmation, setbank_account_no_confirmation] = useState("");
  
  const [ifsc_code, setifsc_code] = useState("");
  const [colltn_amt, setcolltn_amt] = useState("500");
  const [seq_tp, setSeq_tp] = useState("RCUR");
  const [frqcy, setfrqcy] = useState("ADHO");
  const [debit_type, setDebit_type] = useState(false);
  const [auth_type, setAuth_type] = useState("Esign");
  const [addnl2, setAddnl2] = useState("NUPAY123");
  const [addnl3, setAddnl3] = useState("NUPAY123");
  const [addnl4, setAddnl4] = useState("NUPAY123");
  const [addnl5, setAddnl5] = useState("NUPAY123");
  
   const [categoryIdOptions, setCategoryIdOptions] = useState([]);
  const [category_id, setCategoryId] = useState('');
  const [user, setUser] = useState({});
  const [bank_id, setBankId] = useState('');
  const [bankIdOptions, setBankIdOptions] = useState([]);
  // const [error, setError] = useState('');
  
  
  const [status, setStatus] = useState({ StatusCode: "", StatusDesc: "" });

  const [frst_colltn_dt, setfrst_colltn_dt] = useState();
  const [fnl_colltn_dt, setfnl_colltn_dt] = useState();
  const [colltn_until_cncl, setColltn_until_cncl] = useState(true);
  const [account_type, setTOS] = useState("Savings");

  const [iagree, setIagree] = useState(false);

  const [error, setError] = useState(true);
  const [responseData, setResponseData] = useState(null); 
const [data, setData] = useState({});
const [submitCount, setSubmitCount] = useState(0);




  const [isbank_account_noMatching, setIsbank_account_noMatching] = useState(true);
  const handlebank_account_noChange = (e) => {
    setbank_account_no(e.target.value);
    setIsbank_account_noMatching(e.target.value === bank_account_no_confirmation);
  };
 
  const handleVerifybank_account_noChange = (e) => {
    setbank_account_no_confirmation(e.target.value);
    setIsbank_account_noMatching(e.target.value === bank_account_no);
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

 
  useEffect(() => {
    const fetchBankIdOptions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getBankList?bank_type=Esign');
        const { banks } = response.data.data;
        setBankIdOptions(banks);
      } catch (error) {
        console.error('Failed to fetch bank ID options:', error);
      }
    };

    fetchBankIdOptions();
  }, []);

  useEffect(() => {
    const fetchCategoryIdOptions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getCategoryList');
        const { categories } = response.data.data;
        setCategoryIdOptions(categories);
      } catch (error) {
        console.error('Failed to fetch category list:', error);
      }
    };

    fetchCategoryIdOptions();
  }, []);

  const handlesubmit = async(e) => {
    e.preventDefault();


  setSubmitCount(submitCount + 1);

  console.log(`Submit button clicked ${submitCount} times`);

    const data={
      "account_holder_name":account_holder_name,
     
      "email":email,
      "mobile_no":mobile_no,
     
      "bank_account_no":bank_account_no,
      "bank_account_no_confirmation":bank_account_no_confirmation,
      
    "ifsc_code":ifsc_code,
    "colltn_amt":colltn_amt,
    //  "loan_no":loan_no,
      "account_type":account_type,
      "seq_tp":seq_tp,
      "frqcy":frqcy,
      "auth_type":auth_type,
      "addnl2":addnl2,
      "addnl3":addnl3,  
      "addnl4":addnl4,
      "addnl5":addnl5,
      "debit_type":debit_type,
      "category_id":category_id,
      "bank_id":bank_id,
      "frst_colltn_dt":frst_colltn_dt,
      "fnl_colltn_dt":fnl_colltn_dt,
      "colltn_until_cncl":colltn_until_cncl,
     
    };
   
    
    try {
      const response = await axios.post('http://localhost:4000/Suvico', data);
      const bankResponse = response.data.bankResponse; 
      console.log(bankResponse);
    
    
      toast.dismiss();
    
      const toastMessage = (
        <div>
          <h1>Bank Response</h1>
          <h1>Status: {bankResponse.StatusDesc}</h1>
          {/* <h1>Code: {bankResponse.StatusCode}</h1> */}
          {/* {bankResponse.data && bankResponse.data.url && (
            <h1>
              URL:{' '}
              <a href={bankResponse.data.url} target="_blank" rel="noopener noreferrer">
                {bankResponse.data.url}
              </a>
            </h1>
          )} */}
        </div>
      );
    
      toast.info(toastMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        pauseOnHover: true,
        onClose: () => {
          setData({});
    
          if (bankResponse.data && bankResponse.data.url) {
            setTimeout(() => {
              window.open(bankResponse.data.url, '_blank');
              navigate('/');
            }, 2000);
          }
        },
      });
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again later.');
    }
  };    
      
 
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

      <section className="bg-success mb-40">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
           
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

           

                        <div className="row mb-4">
                          
            
                            <div className="">
                              <TextField
                                type="text" placeholder="First Name"
                                fullWidth id="fullWidth"
                                value={account_holder_name}
                                label="account_holder_name"
                                onChange={(e) => setaccount_holder_name(e.target.value)} required
                              />
                             
                            
                          </div>

 
                          {/* <div className="col-md-6 mb-4 ">
                            <div className="">
                              <TextField
                                type="text" placeholder="Loan no"
                                fullWidth id="fullWidth"
                                value={loan_no}
                                label="Loan No"
                                onChange={(e) => setLoan_no(e.target.value)} required
                              />
                             
                            </div>
                          </div>   */}
                          {/* <div className="col-md-6 mb-4 ">
                            <div className="">
                              <TextField
                                type="text" placeholder="Auth Type"
                                fullWidth id="fullWidth"
                                value={auth_type}
                                label="auth type"
                                onChange={(e) => setAuth_type(e.target.value)} required
                              />
                             
                            </div>
                          </div>  */}
                          <div className="col-md-6 mb-4 hidden">
                            <div className="">
                              <TextField
                                type="text" placeholder="addnl2"
                                fullWidth id="fullWidth"
                                value={addnl2}
                                label="addln2"
                                onChange={(e) => setAddnl2(e.target.value)} required
                              />
                             
                            </div>
                          </div> 
                          <div className="col-md-6 mb-4 hidden">
                            <div className="">
                              <TextField
                                type="text" placeholder="addnl3"
                                fullWidth id="fullWidth"
                                value={addnl3}
                                label="addnl3"
                                onChange={(e) => setAddnl3(e.target.value)} required
                              />
                             
                            </div>
                          </div> 
                          <div className="col-md-6 mb-4 hidden">
                            <div className="">
                              <TextField
                                type="text" placeholder="addnl4"
                                fullWidth id="fullWidth"
                                value={addnl4}
                                label="addnl4"
                                onChange={(e) => setAddnl4(e.target.value)} required
                              />
                             
                            </div>
                          </div> 
                          <div className="col-md-6 mb-4 hidden">
                            <div className="">
                              <TextField
                                type="text" placeholder="addnl5"
                                fullWidth id="fullWidth"
                                value={addnl5}
                                label="addnl5"
                                onChange={(e) => setAddnl5(e.target.value)} required
                              />
                             
                            </div>
                          </div> 
                          {/* <div className="col-md-6 mb-4 ">
                          <div className="">
                              <TextField
                                type="text" placeholder="Last Name" 
                                fullWidth id="fullWidth"
                                value={lastname}
                                label="lastname"
                                onChange={(e) => setLastname(e.target.value)}
                              /> 
                            </div>
                          </div> */}
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
              value={mobile_no}
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


  
                      
<div className="row mt-4 hidden">
  <div className="mb-4 pb-2">
    <div className="">
      <TextField
        type="text"
        placeholder="Sequence type"
        fullWidth
        id="fullWidth"
        value={seq_tp} // Use the correct state variable for the value
        label="Sequence type"
        onChange={(e) => setSeq_tp(e.target.value)}
        required
      />
    </div>
  </div>
  <div className="pb-2 hidden">
    <div className="">
      <TextField
       type=""
        placeholder="Debit type"
        fullWidth
        id="fullWidth"
        value={debit_type} // Use the correct state variable for the value
        label="Debit type"
        onChange={(e) => setDebit_type(e.target.value)}
        
      />
    </div>
  </div>
</div>


                     


                      
            <div className="row mt-4 hidden">
                          <div className="col">
                          <div className="">
                              <TextField
                               type="text" placeholder="frequency"
                             
                               fullWidth id="fullWidth"
                               value={frqcy}
                               label="Frequency"
                               onChange={(e) => setfrqcy(e.target.value)}
                                required
                              />
                             
                            </div>
                         
                          </div>
                        </div>

                        <div className="row mt-4 hidden">
                          <div className="col">
                          <div className="">
                              <TextField
                               type="text" placeholder="auth_type"
                             
                               fullWidth id="fullWidth"
                               value={auth_type}
                               label="auth_type"
                               onChange={(e) => setAuth_type(e.target.value)}
                                required
                              />
                             
                            </div>
                         
                          </div>
                        </div>

                        <div className="row mt-4">
  <div className="col">
    <div className="">
      <TextField
        type="text"
        placeholder="Category Id"
        fullWidth
        id="fullWidth"
        value={category_id}
        label="Category Id"
        onChange={(e) => setCategoryId(e.target.value)}
        select
        defaultValue="Loan installment payment"
      >
        {categoryIdOptions.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.description}
          </MenuItem>
        ))}
      </TextField>
    </div>
  </div>
</div>


                        <div className="row mt-4">
      <div className="col">
        <div className="">
          <TextField
            type="text"
            placeholder="Bank Id"
            fullWidth
            id="fullWidth"
            value={bank_id}
            label="Bank Id"
            onChange={(e) => setBankId(e.target.value)}
            required
            select
          >
            {bankIdOptions.map((bank) => (
              <MenuItem key={bank.id} value={bank.id}>
                {bank.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
    </div>
                        <div className="row mt-4 hidden">
                          <div className="col">
                          <div className="">
                              <TextField
                               type="text" placeholder="colltn_until_cncl"
                               fullWidth id="fullWidth"
                               value={colltn_until_cncl}
                               label="colltn_until_cncld"
                               onChange={(e) => setColltn_until_cncl(e.target.value)}
                               required
                              />
                             
                            </div>
                         
                          </div>
                        </div>


                                      
                        <div className="mb-4 pb-2 mt-4">
  <div className=" py-2">
    <div className="form-outline border border-dark position-relative">
      <select
   
        className="form-control form-control-lg"
        aria-label="Default select example"
        value={account_type}
        label="Account type"
        onChange={(e) => setTOS(e.target.value)}
        required
        defaultValue="Savings"
      >
           
        <option className='bg-[#d5d53f] h6'>Account type</option>
        <option value="Savings" className='bg-[#d5d53f] h6'> Savings</option>
        <option value="Current" className='bg-[#d5d53f] h6'>Current</option>
      </select>
      <i className="fas fa-caret-down position-absolute top-50 end-2 translate-middle-y"></i>
      
    </div>
  </div>
</div>



                      </div>
                    </div>

                    {/*White Section Over */}

                    <div className="col-lg-6 bg-[#d5d53f] text-light">
                      <div className="p-5">
                        <h3 className="fw-normal mb-5 text-[indigo] text-3xl">Banking Details</h3>

                      
                          
                        
                          <div className="">
                       
                              
                          </div> 
                        


                          <div className="mt-4 ">
                          <TextField
                                type="number" 
                                // id="demo-helper-text-misaligned"
                                fullWidth id="fullWidth"
                                value={bank_account_no}
                                label="Account Number"
                                // onChange={(e) => setbank_account_no(e.target.value)}
                                onChange={handlebank_account_noChange}
                                required
                              />

                          </div>
                          {bank_account_no.length > 0 && (bank_account_no.length < 8 || bank_account_no.length > 17) && (
        <p style={{ color: 'red' }}>Account number should be between 8 and 17 digits</p>
      )}
              

                          <div className="mt-4 ">
                          <TextField
                                type="number" 
                              
                                fullWidth id="fullWidth"
                                
                                label="Verify Account Number"
                                onChange={handleVerifybank_account_noChange}
                                // onChange={(e) => setbank_account_no_confirmation(e.target.value)}
                                required
                              />
                         
                        </div>

                        {!isbank_account_noMatching && (
        <p style={{ color: 'red' }}>Account numbers do not match</p>
      )}
                
                       


                           <div className="flex flex-row">
                            <div className="mt-4  col-md-6 ">
                          <TextField
                                type="text" 
                                id="demo-helper-text-misaligned"
                                // fullWidth id="fullWidth"
                                value={ifsc_code}
                                label="IFSC_Code/MICR"
                               onChange={(e) => setifsc_code(e.target.value)}
                                
                                required
                              />
                          
                          </div>
                         
                            <div className="mt-4  col-md-6 ml-4">
                             <TextField
                                type="number" 
                                id="demo-helper-text-misaligned"
                                // fullWidth id="fullWidth"
                                value={colltn_amt}
                                label="Amount in Digits"
                                onChange={(e) => setcolltn_amt(e.target.value)}
                                required
                              />
                              </div>
                          </div>
                          
        


                       <div className=" mt-4">
                          
                            
                          
                       <TextField
                                type="date" 
                                // id="demo-helper-text-misaligned"
                                fullWidth id="fullWidth"
                                value={frst_colltn_dt}
                                label="First Collection date"
                                onChange={(e) => setfrst_colltn_dt(e.target.value)}
                                
                                required
                              />
                  
                          
                        </div> 
                        
                        <div className=" mt-4">
                    
                        <TextField
  type="date"
  fullWidth
  id="fullWidth"
  value={fnl_colltn_dt}
  label="Final Collection date"
  onChange={(e) => setfnl_colltn_dt(e.target.value)}
  inputProps={{ min: frst_colltn_dt }}
  required
/>
                     
                             
                           </div> 

                    


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
{/* 
                        <input
                          type="submit"
                          className="btn btn-primary btn-lg"
                          data-mdb-ripple-color="dark"
                          
                       /> */}

<button   className="btn btn-primary btn-lg" type="submit"   data-mdb-ripple-color="dark">Submit</button>
                      
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
