import React from 'react'
import { useLocation } from 'react-router-dom';
export default function UserCard() {
  const location = useLocation()

  const statusVerify = () => {
    if (location.state !== null) {
      if (location.state.data.mandateStatus) {
        return <button className='btn btn-success p-2'>Verified</button>
      } else {
        return <button className='btn btn-danger p-2'>Not Verified</button>
      }
    }
  }

  return (

    <div>
      {location.state !== null ? <div className='container border border-dark mt-2 p-2'>

        <span className='p-2'>
          <b> Name</b>:{location.state.data.firstname}{location.state.data.lastname}
        </span>
        <br />
        <span className='p-2'>
          <b> Date Of Birth</b>:{location.state.data.dob}
        </span>
        <br />
        <span className='p-2'>
          <b>Email </b>:{location.state.data.email}
        </span>
        <br />
        <span className='p-2'>
          <b>Phone No</b>:{location.state.data.phoneno}
        </span>
        <br />
        <span className='p-2'>
          <b>Address</b>:{location.state.data.address}
        </span>
        <br />
        <span className='p-2'>
          <b>Aadhar No</b>:{location.state.data.aadharno}
        </span>
        <br />
        <span className='p-2'>
          <b> PAN No</b>:{location.state.data.panno}
        </span>
        <br />
        <span className='p-2'>
          <b> Account No</b>:{location.state.data.accountno}
        </span>
        <br />
        <span className='p-2'>
          <b>Bank Name</b>:{location.state.data.name_of_bank}
        </span>
        <br />
        <span className='p-2'>
          <b>  IFSC</b>:{location.state.data.ifsc}
        </span>
        <br />
        <span className='p-2'>
          <b>  Amount</b>:{location.state.data.amountdigits}
        </span>
        <br />
        <span className='p-2'>
          <b>  Service</b>:{location.state.data.name_of_service}
        </span>
        <br />
        <span className='p-2'>
          <b>  Sunshine</b>:{ " "+location.state.data.sunshine}
        </span>
        <br />
        <span className='p-2'>
          <b>Mandate Id</b>:{location.state.data.mandateId}
        </span>
        <br />
        <span className='p-2'>
          <b>  Mandate Status</b>:{statusVerify()}
        </span>
        <br />


      </div> : <div> Invalid Access</div>}</div>

  )
}
