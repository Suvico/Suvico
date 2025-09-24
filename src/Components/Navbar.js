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
            <Link to="/"><span className='text-white bg-success p-3 font-monospace rounded-circle  '>Suvico</span></Link>

          </span>

         
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="fa fa-bars"></span>
          </button>

          <div className="collapse navbar-collapse" style={{visibility:"visible"}} id="navbarCollapse">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0"style={{ display: "flex",justifyContent: "flex-end"}}>
              <li className="nav-item ">
                <Link className="nav-link " to="/">Home</Link>
              </li>
              {!isAuthenticated() && <li className="nav-item">
                <Link className="nav-link  " to="/about">About Us</Link>
              </li>}
              {!isAuthenticated() && <li className="nav-item">
                <Link className="nav-link  " to="/services">Services</Link>
              </li>}
              {!isAuthenticated() && <li className="nav-item">
                <Link className="nav-link  " to="/contactus">Contact Us</Link>
              </li>}
              {isAuthenticated() && isAuthenticated().user.role === 1 &&
                <li className="nav-item">
                  <Link className="nav-link  " to="/admin/dashboard">Admin-DashBoard</Link>
                </li>}
              {isAuthenticated() && isAuthenticated().user.role === 1 &&
                <li className="nav-item">
                  <Link className="nav-link  " to="/contacts/all">Contacts</Link>
                </li>}
                <li className="nav-item">
                  <Link className="nav-link  " to="/signup">Register</Link>
                </li>
               
                
                {/* <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Mandate
                </span>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/Upisignup">UPI Mandate</Link></li>
                  <li><Link className="dropdown-item" to="/signup">Aadhar Mandate</Link></li>
                  <li><Link className="dropdown-item" to="/MandateStatusChecker">Mandate Status</Link></li>
                </ul>
              </li> */}


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

           
          </div>

        </div>

      </nav>


    </div>
  )
}
