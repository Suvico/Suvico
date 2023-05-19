import axios from 'axios';
import React, { useState } from 'react'
import {API} from "../backend"
export default function Unsubscribe() {

  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState()


  const unsubscribeUser = async () => {

    try {
      const response = await axios.post(`${API}/unsubscribe/user`, { email: email }, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.error) {
        setError("Error in unsubscribing, retry")
      } else {
        setSuccess("User Successfully Unsubscribed")

      }
    } catch (error) {
      setError(error)
    }


  }

  return (
    <div className='border border-primary p-4'>
      {success && (
        <div class="alert alert-success" role="alert">
          {success}
        </div>
      )}

      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className='container border border-success p-4'>
        <h3 className='border border-dark p-2'>Unsubscribe Your Account</h3>
        <div className='row mt-4'>
          <div className='col'>
            <label className='h3'>Enter your id:</label>
            <div className="form-outline">
              <input type="text" className="form-control form-control-lg border border-dark" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label className="form-label">Email</label>
            </div>
          </div>

        </div>
        <br></br>
        <center>
          <button className='btn btn-danger' onClick={unsubscribeUser}>Unsubscribe</button>
        </center>
      </div>
    </div>
  )
}
