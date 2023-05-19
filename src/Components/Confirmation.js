import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate, Link, Navigate } from "react-router-dom";
export default function Confirmation() {

  const location = useLocation();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);
  const [timeLeft, setTimeLeft] = useState(5);
  const intervalRef = useRef();
  const [confirmation, setConfirmation] = useState(false)
  const [useremail, setUserEmail] = useState("")
  // Add a ref to store the interval id



  useEffect(() => {
    if (location.state !== null) {
      setConfirmation(location.state.status)
      console.log(location)
      setUserEmail(location.state.data.email)
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [location]);

  // Add a listener to `timeLeft`
  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/")
    }
  });


  return (
    <div>
      {confirmation === false ? <div className="container-fluid border border-primary m-2">
        <center>

          <h3>Invalid Entry</h3>


          <p>Wait before redirecting to home {timeLeft} </p>
        </center>
      </div>
        :

        <div className="container-fluid border border-primary m-2">
          <center>

            <h3>Thank You For Registering </h3>
            
            <p>Wait before redirecting to home {timeLeft} </p>
          </center>
        </div>
      }
    </div>
  )
}
