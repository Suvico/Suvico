import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";


const AES_KEY = process.env.REACT_APP_AES_KEY || "k2hLr4X0ozNyZByj5DT66edtCEee1x+6";

// AES encryption helper
function encryptAES_ECB_hex(plain) {
  if (!plain) return "";
  const key = CryptoJS.enc.Utf8.parse(AES_KEY);
  const encrypted = CryptoJS.AES.encrypt(plain, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return "\\x" + encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

// SHA256 checksum helper
function sha256_hex(data) {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

export default function EMandateForm() {
  const [formData, setFormData] = useState({
    Customer_Name: "",
    Customer_EmailId: "",
    Customer_Mobile: "",
    Customer_TelphoneNo: "",
    Customer_AccountNo: "",
    Customer_StartDate: "",
    Customer_ExpiryDate: "",
    Customer_DebitAmount: "500",
    Customer_MaxAmount: "",
    Customer_DebitFrequency: "ADHO",
    Customer_SequenceType: "RCUR",
    Customer_Reference1: "",
    Customer_Reference2: "",
    Customer_InstructedMemberId: "",
    Channel: "Net",
    Filler1: "",
    Filler2: "",
    Filler3: "",
    Filler4: "",
    Filler5: "S",
    Merchant_Category_Code: "U099"
  });

  const [isAccountMatching, setIsAccountMatching] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  // const [bankIdOptions, setBankIdOptions] = useState([]);
  // const [selectedBank, setSelectedBank] = useState("");
 
const navigate = useNavigate();
  const debitFrequencies = [
    { value: "ADHO", label: "As and when presented" },
    // { value: "INDA", label: "Intra-day" },
    { value: "DAIL", label: "Daily" },
    { value: "WEEK", label: "Weekly" },
    { value: "MNTH", label: "Monthly" },
    { value: "BIMN", label: "Bi-Monthly" },
    { value: "QURT", label: "Quarterly" },
    { value: "MIAN", label: "Half yearly" },
    { value: "YEAR", label: "Yearly" }
  ];

  const sequenceTypes = [
    { value: "RCUR", label: "Recurring" },
    { value: "OOFF", label: "One Off" }
  ];
// https://suvico-backend.vercel.app/emandate/callback
  // Fetch banks from backend
//   useEffect(() => {
//     const fetchBanks = async () => {
//       try {
//         const res = await axios.get("https://suvico-backend.vercel.app/bank/live-banks", {
//   headers: { 'Cache-Control': 'no-cache' }
// });

//         setBankIdOptions(res.data.map(b => ({
//           id: b.bankId,
//           name: b.bankName,
//           netbankFlag: b.netbankFlag,
//           aadhaarFlag: b.aadhaarFlag,
//           debitcardFlag: b.debitcardFlag
//         })));
//       } catch (err) {
//         console.error("Failed to fetch banks:", err);
//         toast.error("Unable to load bank list");
//       }
//     };
//     fetchBanks();
//   }, []);

  // Handlers
  const handleAccountChange = (e) => {
    setFormData({ ...formData, Customer_AccountNo: e.target.value });
    setIsAccountMatching(e.target.value === formData.Customer_AccountNoConfirm);
  };

  const handleAccountConfirmChange = (e) => {
    setFormData({ ...formData, Customer_AccountNoConfirm: e.target.value });
    setIsAccountMatching(e.target.value === formData.Customer_AccountNo);
  };

  const handlePhoneChange = (e) => {
    setFormData({ ...formData, Customer_Mobile: e.target.value });
    setIsPhoneValid(/^\d{10}$/.test(e.target.value));
  };

  const handleStartDateChange = (e) => {
  const start = e.target.value;
  let expiry = "";

  if (start) {
    const startDate = new Date(start);
    startDate.setFullYear(startDate.getFullYear() + 40); // +40 years
    expiry = startDate.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  setFormData({
    ...formData,
    Customer_StartDate: start,
    Customer_ExpiryDate: expiry,
  });
};



const handleSaveAndRedirect = async (e) => {
  e.preventDefault();

  if (!isAccountMatching) {
    return toast.error("Account numbers do not match");
  }
  if (!isPhoneValid) {
    return toast.error("Invalid phone number");
  }

  const payload = {
    ...formData,
    ...(formData.Channel === "Aadhaar" && { Filler7: "OTP" }),
  };

  try {
    // Send to backend (backend saves + returns auto-submit form)
    //https://suvico-backen-git-4906da-sushantkumarsuman007gmailcoms-projects.vercel.app/emandate/callback
    //https://suvico-backend.vercel.app/
    const res = await fetch("https://suvico-backen-git-4906da-sushantkumarsuman007gmailcoms-projects.vercel.app/emandate/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const html = await res.text();

    // Replace current page with returned HTML (auto-submits to HDFC)
    document.open();
    document.write(html);
    document.close();

  
  } catch (err) {
    console.error("Error initiating mandate:", err);
    toast.error("Failed to initiate mandate");
  }
};



  return (
<div className="container mx-auto p-4">
  <ToastContainer />
  {/* <h2 className="text-3xl font-bold mb-4">e-Mandate Form</h2> */}
  <form onSubmit={handleSaveAndRedirect}>
    {/* 1-column on small, 2-column on medium+ */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextField
        label="Account Holder Name"
        value={formData.Customer_Name}
        onChange={(e) => setFormData({ ...formData, Customer_Name: e.target.value })}
        fullWidth
        required
      />
      <TextField
        label="Email(optional)"
        value={formData.Customer_EmailId}
        onChange={(e) => setFormData({ ...formData, Customer_EmailId: e.target.value })}
        fullWidth
      />

      <TextField
        label="Mobile Number"
        value={formData.Customer_Mobile}
        onChange={handlePhoneChange}
        required
        fullWidth
      />
       <TextField select label="Account Type" value={formData.Filler5}
        onChange={(e) => setFormData({ ...formData, Filler5: e.target.value })}
        fullWidth
        required
      >
        <MenuItem value="S">Savings</MenuItem>
        <MenuItem value="C">Current</MenuItem>
        <MenuItem value="O">Other</MenuItem>
      </TextField>

    
      <TextField
        label="Bank Account Number"
        value={formData.Customer_AccountNo}
        onChange={handleAccountChange}
        fullWidth
        required
      />

        <TextField
        label="Confirm Account Number"
        value={formData.Customer_AccountNoConfirm || ""}
        onChange={handleAccountConfirmChange}
        fullWidth
        required
      />
      {!isAccountMatching && <p className="text-red-600 md:col-span-2">Account numbers do not match</p>}

  {/* <TextField select label="Bank" value={selectedBank}
        onChange={(e) => setSelectedBank(e.target.value)}
        fullWidth
        required
      >
        {bankIdOptions.map(b => (
          <MenuItem key={b.id} value={b.id}>
            {b.name} {(() => {
              const activeChannels = [];
              if (b.netbankFlag === "Active") activeChannels.push("Netbanking");
              if (b.debitcardFlag === "Active") activeChannels.push("Debit");
              if (b.aadhaarFlag === "Active") activeChannels.push("Aadhaar");
              return activeChannels.length ? `(${activeChannels.join(", ")})` : "";
            })()}
          </MenuItem>
        ))}
      </TextField> */}

   <TextField
  label="IFSC Code"
  value={formData.Customer_InstructedMemberId}
  onChange={(e) => setFormData({ ...formData, Customer_InstructedMemberId: e.target.value })}
  fullWidth
  required
  inputProps={{ maxLength: 11 }}
  error={formData.Customer_InstructedMemberId && formData.Customer_InstructedMemberId.length !== 11}
  helperText={
    formData.Customer_InstructedMemberId && formData.Customer_InstructedMemberId.length !== 11
      ? "IFSC Code must be exactly 11 characters"
      : ""
  }
/>


     
      <TextField
        label="Debit Amount"
        type="number"
        value={formData.Customer_DebitAmount}
        onChange={(e) => {
          let value = parseInt(e.target.value, 10);
          if (isNaN(value) || value < 1) value = 1;
          setFormData({ ...formData, Customer_DebitAmount: value });
        }}
        fullWidth
        required
        inputProps={{ min: 1, step: 1 }}
      />

 <TextField
        label="First Collection Date"
        type="date"
        value={formData.Customer_StartDate}
        onChange={handleStartDateChange}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: new Date().toISOString().split("T")[0] }}
      />
    
      <TextField select label="Channel" value={formData.Channel}
        onChange={(e) => setFormData({ ...formData, Channel: e.target.value })}
        fullWidth
        required
      >
        <MenuItem value="Net">Net Banking</MenuItem>
        <MenuItem value="Debit">Debit Card</MenuItem>
        <MenuItem value="Aadhaar">Aadhaar</MenuItem>
      </TextField>

      <TextField select label="Debit Frequency" value={formData.Customer_DebitFrequency}
        onChange={(e) => setFormData({ ...formData, Customer_DebitFrequency: e.target.value })}
        fullWidth
        required
        disabled={formData.Customer_DebitFrequency === "ADHO"}
      >
        {debitFrequencies.map(freq => (
          <MenuItem key={freq.value} value={freq.value}>{freq.label}</MenuItem>
        ))}
      </TextField>


      
    <TextField
  label="Agent ID"
  value={formData.Filler2}
  onChange={(e) =>
    setFormData({ ...formData, Filler2: e.target.value })
  }
  fullWidth

/>
     
    </div>


    <div className="mt-4">
      <button type="submit" className="btn btn-primary">Register</button>
    </div>
  </form>
</div>

 


    
  );
}
