import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth'

export default function Navbar(){
  const navigate = useNavigate()
  const user = isAuthenticated()
  return ( 
   <div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <div className="container">

          <span className="navbar-brand me-2" >
            <Link to="/"><span className='text-white bg-dark p-3 font-monospace rounded-circle  '>Suvico</span></Link>

          </span>

          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="" id="navbarButtonsExample">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <Link className="nav-link text-black" to="/">Home</Link>
              </li>
              {!isAuthenticated() && <li className="nav-item">
                <Link className="nav-link text-black" to="/about">About Us</Link>
              </li>}
              {!isAuthenticated() && <li className="nav-item">
                <Link className="nav-link text-black" to="/services">Services</Link>
              </li>}
              {!isAuthenticated() && <li className="nav-item">
                <Link className="nav-link text-black" to="/contactus">Contact Us</Link>
              </li>}
              {isAuthenticated() && isAuthenticated().user.role === 1 &&
                <li className="nav-item">
                  <Link className="nav-link text-black" to="/admin/dashboard">Admin-DashBoard</Link>
                </li>}
              {isAuthenticated() && isAuthenticated().user.role === 1 &&
                <li className="nav-item">
                  <Link className="nav-link text-black" to="/contacts/all">Contacts</Link>
                </li>}


              {isAuthenticated() && (
                <li className="nav-item">
                  <span
                    className="nav-link text-warning"
                    onClick={() => {
                      signout(() => {
                        // history.push("/");
                        navigate("/");
                      });
                    }}
                  >
                    Signout
                  </span>
                </li>)}

            </ul>

            <div className="d-flex align-items-center">

              <button type="button" className="btn btn-primary me-3 text-black" onClick={() => { navigate("/signup") }}>
                Register Now
              </button>
              <span
                className="btn btn-dark px-3"
                href="https://github.com/mdbootstrap/mdb-ui-kit"
                role="button"
              ><i className="fab fa-facebook-f"></i
              ></span>
              <span
                className="btn btn-dark px-3 m-1"
                href="https://github.com/mdbootstrap/mdb-ui-kit"
                role="button"
              ><i className="fab fa-twitter"></i></span>
              <span
                className="btn btn-dark px-3"
                href="https://github.com/mdbootstrap/mdb-ui-kit"
                role="button"
              ><i className="fab fa-instagram"></i></span>
            </div>
          </div>

        </div>

      </nav>


    </div>
  )
}
