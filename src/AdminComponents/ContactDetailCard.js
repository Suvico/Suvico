import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ContactDetailCard() {

  const location = useLocation()
  console.log(location.state)
  return (

    <div >
      {location.state !== null ? <div className='container border border-dark mt-2 p-2'>

        <span className='p-2'>
          <b> Name</b>:{location.state.data.firstname}{location.state.data.lastname}
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
          <b>State</b>:{location.state.data.state}
        </span>
        <br />
        <span className='p-2'>
          <b>District</b>:{location.state.data.district}
        </span>
        <br />
        <span className='p-2'>
          <b> Message</b>:{location.state.data.message}
        </span>
        <br />

        <br />

      </div> : <div> Invalid Access</div>}</div>

  )
}
