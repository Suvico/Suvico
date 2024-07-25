import React, { useState } from 'react';
import { fillContacts } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    state: '',
    district: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:4000/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
     
        toast.success('Form submitted successfully!', {
          autoClose: 3000,
        });

        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          state: '',
          district: '',
          message: '',
        });
      })
      .catch((error) => {
       
        toast.error('Error submitting form. Please try again.', {
          autoClose: 3000,
        });
        console.error('Error sending form data:', error);
      });
  };


  return (
    <div class="container-fluid py-2 wow fadeInUp bg-light" data-wow-delay="0.1s">
      <ToastContainer />
    <div class="container py-5">
        <div class="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{maxWidth: "700px"}}>
            <h3 class="fw-bold text-primary text-uppercase mb-3" style={{fontSize:"30px"}}>Contact Us</h3>
            <h3 class="mb-0">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you</h3>
        </div>
      
        <div className="row g-5 mb-5">
<div className="col-lg-4">
<div className="d-flex align-items-center wow fadeIn" data-wow-delay="0.1s">
  <div className="  d-flex align-items-center justify-content-center rounded" style={{width: 50, height: 50}}>
    <i className="fa fa-phone-alt fa-lg text-dark" />
  </div>
  <div className="ps-1">
    <h5 className="mb-2">Call to ask any question</h5>
    <h5 className="text-primary mb-0">+91 9353510555</h5>
  </div>
</div>
</div>

<div className="col-lg-4">
<div className="d-flex align-items-center wow fadeIn" data-wow-delay="0.4s">
  <div className=" d-flex align-items-center justify-content-center rounded" style={{width: 50, height: 50}}>
    <i className="fa fa-duotone fa-envelope fa-lg  text-dark" />
  </div>
  <div className="ps-1">
                        <h5 className="mb-2">Email us to ask any question</h5>
                        <h5 className="text-primary mb-0">support@suvicosolutions.com</h5>
                    </div>
</div>
</div>
<div className="col-lg-4">
<div className="d-flex align-items-center wow fadeIn" data-wow-delay="0.8s">
  <div className=" d-flex align-items-center justify-content-center rounded" style={{width: 50, height: 50}}>
    <i className="fa fa-map-marker-alt  fa-lg text-dark" />
  </div>
  <div className="ps-1">
    <h5 className="mb-2">Visit our office</h5>
    <h5 className="text-primary mb-0">385 Krishi Kunj Near IARI Pusa Delhi 110012</h5>
  </div>
</div>
</div>
</div>

        <div className="row g-5">
          <div className="col-lg-6 wow slideInUp" data-wow-delay="0.3s">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control border-0 bg-secondary px-4"
                    placeholder="First Name"
                    required
                    style={{height: 55}}
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control border-0 bg-secondary px-4"
                    placeholder="Last Name"
                    style={{height: 55}}
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    className="form-control border-0 bg-secondary px-4"
                    placeholder="Phone"
                    required
                    style={{height: 55}}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control border-0 bg-secondary px-4"
                    placeholder="Your Email"
                    required
                    style={{height: 55}}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control border-0 bg-secondary px-4"
                    placeholder="State"
                    required
                    style={{height: 55}}
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control border-0 bg-secondary px-4"
                    placeholder="District"
                    required
                    style={{height: 55, backgroundColor:"black"}}
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control border-0 bg-secondary px-4 py-3"
                    rows={4}
                    placeholder="Message"
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <button className="btn w-100 py-3 bg-primary text-white" type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-lg-6 wow slideInUp" data-wow-delay="0.6s">
               <iframe className="position-relative rounded w-100 h-100" 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14025.241364731526!2d77.19914492206215!3d28.685380007744314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd7cd7b0c947%3A0x79fbc5c158c3c823!2s385%20Krishi%20Kunj%20Near%20IARI%20Pusa%2C%20Delhi%2C%20110012!5e0!3m2!1sen!2sin!4v1669058882838!5m2!1sen!2sin
               "
               frameborder="0"   style={{minHeight: 350, border: 0}} allowFullScreen aria-hidden="false" tabIndex={0} />

            </div>
        </div>
      </div>
    </div>
  );
}
