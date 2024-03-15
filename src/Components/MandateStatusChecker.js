import React, { useState } from 'react';
import Footer from "./Footer";


const MandateStatusChecker = () => {
  const [refNo, setRefNo] = useState('');
  const [umn, setUmn] = useState('');
  const [showResponseBox, setShowResponseBox] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform an AJAX request to check the status, replace the URL with your actual endpoint
    try {
      const response = await fetch('http://localhost:4000/api/checkMandateStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refNo, umn }),
      });

      const data = await response.json();
      const formattedMessage = `Status: ${data.status}\n` +
                               `StatusDesc: ${data.StatusDesc}\n` +
                               `ReferenceNumber: ${data.ReferenceNumber}\n` +
                               `UMN: ${data.umn}\n` 
    //   `Make sure to take a screenshot or save the ReferenceNumber/UMN for Future Purpose.`
     ;

setResponseMessage(formattedMessage);
    //   setResponseMessage(`Status: ${data.StatusDesc}`);
      setShowResponseBox(true);

      // If successful, clear the form
      if (data.StatusCode === 'NP000') {
        setRefNo('');
        setUmn('');
      }
    } catch (error) {
      console.error('Error fetching status:', error);
      setResponseMessage('Error: Failed to fetch status');
      setShowResponseBox(true);
    }
  };

  return (
    <div className="container mt-5 mx-auto">
         <h1 className="mb-4 text-center text-bold text-decoration-underline" style={{ fontSize: "28px" }}>Mandate Status Checker</h1>
    
      <form onSubmit={handleSubmit}>
        <div className="col-lg-6 mb-3">
          <label htmlFor="refNo" className="form-label">Reference Number:</label>
          <input
            type="text"
            className="form-control"
            id="refNo"
            value={refNo}
            onChange={(e) => setRefNo(e.target.value)}
            
          />
        </div>
        <div className="col-lg-6 mb-3">
          <label htmlFor="umn" className="form-label">Unique Mandate Number:</label>
          <input
            type="text"
            className="form-control"
            id="umn"
            value={umn}
            onChange={(e) => setUmn(e.target.value)}
            
          />
        </div>
        <button type="submit" className="btn btn-custom mt-2 btn-md">Check Status</button>
      </form>

      
{showResponseBox && (
        <div className="response-box">
          <div className="response-content">
            <p>{responseMessage}</p>
            <button onClick={() => setShowResponseBox(false)}>Close</button>
          </div>
        </div>
        
      )}

   
    </div>

    
  );
};

export default MandateStatusChecker;
