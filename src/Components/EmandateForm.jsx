import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TextField, MenuItem } from "@mui/material";

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
    MsgId: "",
    Customer_EmailId: "",
    Customer_Mobile: "",
    Customer_TelphoneNo: "",
    Customer_AccountNo: "",
    Customer_StartDate: "",
    Customer_ExpiryDate: "",
    Customer_DebitAmount: "500",
    Customer_MaxAmount: "",
    Customer_DebitFrequency: "MNTH",
    Customer_SequenceType: "RCUR",
    Short_Code: "SUVICO",
    Customer_Reference1: "",
    Customer_Reference2: "",
    Customer_InstructedMemberId: "",
    Channel: "Net",
    UtilCode: "NACH00000000000020",
    Filler1: "",
    Filler2: "",
    Filler3: "",
    Filler4: "",
    Filler5: "S",
    Merchant_Category_Code: "U099"
  });

  const [isAccountMatching, setIsAccountMatching] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [bankIdOptions, setBankIdOptions] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");

  const debitFrequencies = [
    // { value: "ADHO", label: "As and when presented" },
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

  // Fetch banks from backend
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/bank/live-banks"); 
        setBankIdOptions(res.data.map(b => ({
          id: b.bankId,
          name: b.bankName,
          netbankFlag: b.netbankFlag,
          aadhaarFlag: b.aadhaarFlag,
          debitcardFlag: b.debitcardFlag
        })));
      } catch (err) {
        console.error("Failed to fetch banks:", err);
        toast.error("Unable to load bank list");
      }
    };
    fetchBanks();
  }, []);

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
    startDate.setFullYear(startDate.getFullYear() + 10); // +10 years
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

  console.log("Form Data before validation:", formData);

  if (!isAccountMatching) {
    console.error("Account numbers do not match");
    return toast.error("Account numbers do not match");
  }
  if (!isPhoneValid) {
    console.error("Invalid phone number");
    return toast.error("Invalid phone number");
  }

  // Checksum string: accountNo|startDate|endDate|debitAmount|maxAmount
 const checksumPlain = [
  formData.Customer_AccountNo,
  formData.Customer_StartDate,
  formData.Customer_ExpiryDate,
  parseFloat(formData.Customer_DebitAmount || 0).toFixed(2),
  formData.Customer_MaxAmount ? parseFloat(formData.Customer_MaxAmount).toFixed(2) : ""
].join("|");


  const checksum = sha256_hex(checksumPlain);
  console.log("Checksum string:", checksumPlain);
  console.log("Checksum (SHA256):", checksum);

  const payload = {
    MsgId: "SUV" + Date.now(), 
    Customer_Name: encryptAES_ECB_hex(formData.Customer_Name),
    Customer_Mobile: encryptAES_ECB_hex(formData.Customer_Mobile),
    Customer_TelphoneNo: "",
    Customer_EmailId: encryptAES_ECB_hex(formData.Customer_EmailId),
    Customer_AccountNo: encryptAES_ECB_hex(formData.Customer_AccountNo),
    Customer_StartDate: formData.Customer_StartDate,
    Customer_ExpiryDate: formData.Customer_ExpiryDate,
    Customer_DebitAmount: formData.Customer_DebitAmount
      ? parseFloat(formData.Customer_DebitAmount).toFixed(2)
      : "0.00",
    Customer_MaxAmount: formData.Customer_MaxAmount
      ? parseFloat(formData.Customer_MaxAmount).toFixed(2)
      : "",
    Customer_DebitFrequency: formData.Customer_DebitFrequency,
    Customer_SequenceType: formData.Customer_SequenceType,
    Customer_InstructedMemberId: formData.Customer_InstructedMemberId,
    Short_Code: encryptAES_ECB_hex("SUVICO"),
    Merchant_Category_Code: "U099",
    Customer_Reference1: encryptAES_ECB_hex(formData.Customer_Reference1),
    Customer_Reference2: encryptAES_ECB_hex(formData.Customer_Reference2),
    Channel: formData.Channel,
    UtilCode: encryptAES_ECB_hex("NACH00000000000020"),
    Filler1: formData.Filler1,
    Filler2: formData.Filler2,
    Filler3: formData.Filler3,
    Filler4: formData.Filler4,
    Filler5: formData.Filler5,
    Filler6: selectedBank,
    CheckSum: checksum
  };

  console.log("Payload to send:", payload);

  try {
    // Save mandate
    const response = await axios.post("http://localhost:4000/mandate/mandates", payload);
    console.log("Save response:", response.data);
    toast.success("Mandate saved successfully!");

    // Redirect to HDFC eMandate
    const redirectUrl = "https://emandateut.hdfcbank.com/Emandate.aspx";
    console.log("Redirecting to:", redirectUrl);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = redirectUrl;

    Object.entries(payload).forEach(([k, v]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = k;
      input.value = v;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    console.log("Submitting form...");
    form.submit();

  } catch (err) {
    console.error("Error saving mandate or redirecting:", err);
    toast.error("Failed to save mandate or redirect.");
  }
};


  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-4">e-Mandate Form</h2>
      <form onSubmit={handleSaveAndRedirect}>
        <TextField label="Account Holder Name" value={formData.Customer_Name}
          onChange={(e) => setFormData({ ...formData, Customer_Name: e.target.value })}
          fullWidth required className="mb-4" />

        <TextField label="Email" value={formData.Customer_EmailId}
          onChange={(e) => setFormData({ ...formData, Customer_EmailId: e.target.value })}
          fullWidth className="mb-4" />

        <TextField label="Mobile Number" value={formData.Customer_Mobile}
          onChange={handlePhoneChange}  required fullWidth className="mb-4" />
        {!isPhoneValid && <p className="text-red-600">Phone number must be 10 digits</p>}

        <TextField label="Bank Account Number" value={formData.Customer_AccountNo}
          onChange={handleAccountChange} fullWidth required className="mb-4" />

        <TextField label="Confirm Account Number" value={formData.Customer_AccountNoConfirm || ""}
          onChange={handleAccountConfirmChange} fullWidth required className="mb-4" />
        {!isAccountMatching && <p className="text-red-600">Account numbers do not match</p>}

        <TextField label="IFSC / Bank Code" value={formData.Customer_InstructedMemberId}
          onChange={(e) => setFormData({ ...formData, Customer_InstructedMemberId: e.target.value })}
          fullWidth required className="mb-4" />

     <TextField
  label="First Collection Date"
  type="date"
  value={formData.Customer_StartDate}
  onChange={handleStartDateChange}
  fullWidth
  required
  className="mb-4"
  InputLabelProps={{ shrink: true }}
  inputProps={{
    min: new Date().toISOString().split("T")[0] // cannot select before today
  }}
/>

{/* 
        <TextField label="Final Collection Date" type="date" value={formData.Customer_ExpiryDate}
          onChange={(e) => setFormData({ ...formData, Customer_ExpiryDate: e.target.value })}
          fullWidth className="mb-4" InputLabelProps={{ shrink: true }} /> */}

 <TextField
  label="Debit Amount"
  type="number"
  value={formData.Customer_DebitAmount}
  onChange={(e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) value = 1; // minimum 1
    setFormData({
      ...formData,
      Customer_DebitAmount: value, // integer value
    });
  }}
  fullWidth
  required
  className="mb-4"
  inputProps={{ min: 1, step: 1 }} // whole number enforcement
/>


{/* 
        <TextField label="Max Amount" type="number" value={formData.Customer_MaxAmount}
          onChange={(e) => setFormData({ ...formData, Customer_MaxAmount: e.target.value })}
          fullWidth className="mb-4" /> */}

        <TextField select label="Bank" value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
          fullWidth required className="mb-4">
          {bankIdOptions.map(b => (
         <MenuItem key={b.id} value={b.id}>
  {b.name} {" "}
  {(() => {
    const activeChannels = [];
    if (b.netbankFlag === "Active") activeChannels.push("Netbanking");
    if (b.debitcardFlag === "Active") activeChannels.push("Debit");
    if (b.aadhaarFlag === "Active") activeChannels.push("Aadhaar");
    return activeChannels.length ? `(${activeChannels.join(", ")})` : "";
  })()}
</MenuItem>


          ))}
        </TextField>

        <TextField select label="Debit Frequency" value={formData.Customer_DebitFrequency}
          onChange={(e) => setFormData({ ...formData, Customer_DebitFrequency: e.target.value })}
          fullWidth required className="mb-4">
          {debitFrequencies.map(freq => (
            <MenuItem key={freq.value} value={freq.value}>{freq.label}</MenuItem>
          ))}
        </TextField>

        {/* <TextField select label="Sequence Type" value={formData.Customer_SequenceType}
          onChange={(e) => setFormData({ ...formData, Customer_SequenceType: e.target.value })}
          fullWidth required className="mb-4">
          {sequenceTypes.map(seq => (
            <MenuItem key={seq.value} value={seq.value}>{seq.label}</MenuItem>
          ))}
        </TextField> */}

        {/* <TextField label="Reference1" value={formData.Customer_Reference1}
          onChange={(e) => setFormData({ ...formData, Customer_Reference1: e.target.value })}
          fullWidth className="mb-4" />

        <TextField label="Reference2" value={formData.Customer_Reference2}
          onChange={(e) => setFormData({ ...formData, Customer_Reference2: e.target.value })}
          fullWidth className="mb-4" /> */}
{/* 
        <TextField label="UtilCode" value={formData.UtilCode}
          onChange={(e) => setFormData({ ...formData, UtilCode: e.target.value })}
          fullWidth className="mb-4" /> */}

        {/* <TextField label="Filler1" value={formData.Filler1}
          onChange={(e) => setFormData({ ...formData, Filler1: e.target.value })} fullWidth className="mb-4" /> */}

       <TextField select label="Channel" value={formData.Channel} 
  onChange={(e) => setFormData({ ...formData, Channel: e.target.value })}
  fullWidth required className="mb-4">
  <MenuItem value="Net">Net Banking</MenuItem>
  <MenuItem value="Debit">Debit Card</MenuItem>
  <MenuItem value="Aadhaar">Aadhaar</MenuItem>
</TextField>

        {/* Filler5 */}
        <TextField select label="Account Type" value={formData.Filler5} onChange={(e) => setFormData({ ...formData, Filler5: e.target.value })}
          fullWidth required className="mb-4">
          <MenuItem value="S">Savings</MenuItem>
          <MenuItem value="C">Current</MenuItem>
          <MenuItem value="O">Other</MenuItem>
        </TextField>

        <button type="submit" className="btn btn-primary">Save & Redirect</button>
      </form>
    </div>
  );
}
