import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllContacts, isAuthenticated,removeContact } from '../auth'
import Footer from '../Components/Footer'
export default function GetContacts() {

  const userId = isAuthenticated().user._id
  const token = isAuthenticated().token
  const [contacts, setContacts] = useState([{}])
  const [error, setError] = useState()
  const [success, setSuccess] = useState('')
  const [reload, setReload] = useState(false)
  const navigate = useNavigate()
 

  useEffect(() => {
    getAllContacts(userId, token).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setContacts(data)
      }
    })
  }, [reload])

  const deleteContact=(id)=>{
    
    removeContact(userId,token,{id:id}).then((data)=>{
        if(data)
        {
          setError('')
          setSuccess("Deletion Successfull")
          setReload(!reload)
        }
    }).catch()
    

  }

  return (
    <div className='overflow-auto '>
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
      {
        contacts.map((data, index) => {
          return (

            <div key={index} className='container-fluid row border border dark p-2 m-2 mt-2  font-monospace border-3 '>
              <div className='col-8'>
                <span><b>Name</b>:{data.firstname} {data.lastname}</span>
                <br />
                <span><b>Email</b>:{data.email}</span>
              </div>
              <div className='col-4 align-content-center '><button className='btn btn-primary' onClick={() => {
                navigate('/contact/user/detail', { state: { data: data } })
              }}>View Details</button>
              <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteContact(data._id);
                  }}
                >
                  Delete{" "}
                </button></div>
            </div>
          )
        })
      }
        <Footer/>
    </div>
  )
}
