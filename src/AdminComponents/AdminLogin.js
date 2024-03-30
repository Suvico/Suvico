import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { authenticate, isAuthenticated } from '../auth/index'
import { signin } from '../auth'
import './style.css'
import { API } from '../backend'

export default function AdminLogin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const navigate = useNavigate()
  const [redirect, setRedirect] = useState(false)
  const user = isAuthenticated()

  const SigninAdmin = () => {
   
    signin({ email, password }).then(response => {
      if (response.error) {
        setError(response.error)
      } else {
        authenticate(response, () => {
          navigate(`/admin/dashboard/`)

        })
      }


    }).catch(err => {

      setError(err)
    })
  }



  return (
    <section class="vh-100">

      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid" alt="Sample image" />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 border border-dark p-4">
            <center>
              <form>
                <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p class="lead fw-normal mb-0 me-3 p-2 text-bg-light text-white "><h2>Sign in Admin</h2></p>

                </div>

                {error && <div class="alert alert-danger" role="alert">
                  {error}
                </div>}

                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control form-control-lg border border-dark"
                    placeholder="Enter a valid email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>


                <div class="form-outline mb-3">
                  <input type="password" id="form3Example4" class="form-control form-control-lg  border border-dark"
                    placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <label class="form-label" for="form3Example4">Password</label>
                </div>

                {/* <div class="d-flex justify-content-between align-items-center">

            <div class="form-check mb-0">
              <input class="form-check-input me-2 " type="checkbox" value="" id="form2Example3" />
              <label class="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" class="text-body">Forgot password?</a>
          </div> */}

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button type="button" class="btn btn-primary btn-lg"
                    style={{ "padding-left": "2.5rem", "padding-right": "2.5rem;" }} onClick={SigninAdmin}>Login</button>
                  <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                    class="link-danger" >Register</a></p>
                </div>

              </form>
            </center>
          </div>
        </div>
      </div>

    </section>
  )
}
