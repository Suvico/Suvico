import React from 'react'
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate=useNavigate()
  return (


    <footer className="text-center text-dark bg-light shadow-5-strong " style={{ "backgroundColor": "#f1f1f1" }}>
      <div className="container pt-2 ">
        <section className="mb-1">
          <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          ><i className="fab fa-facebook-f"></i></a>

          <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          ><i className="fab fa-twitter"></i></a>

          <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="mailto:support@suvicosolutions.com"
            role="button"
            data-mdb-ripple-color="dark"
          ><i className="fab fa-google"></i
          ></a>

          <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          ><i className="fab fa-instagram"></i
          ></a>

          <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          ><i className="fab fa-linkedin"></i
          ></a>
          <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          ><i className="fab fa-github"></i
          ></a>
        </section>
      </div>



      <div className="text-center text-dark p-3 bg-success" style={{ "backgroundColor": "rgba(0, 0, 0, 0.2)" }}>
        Grow Your Business With <strong>SUVICO </strong>
        <button className='btn btn-dark align-baseline rounded-8' onClick={()=>navigate('/signup')}>Sign Up!</button>

      </div>

    </footer>


  )
}
