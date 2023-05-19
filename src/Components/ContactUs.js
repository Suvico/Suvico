import React, { useState } from 'react'
import { fillContacts } from '../auth'
import Footer from './Footer'

export default function ContactUs() {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [state, setStates] = useState('')
    const [district, setDistrict] = useState('')
    const [email, setEmail] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const sendQuery = () => {
        console.log('hii')
        fillContacts({ firstname, lastname, state, district, email, phoneno, message }).then((data) => {
            console.log(data)
            if (data.error) {
                setError(data.error)
            } else {
                setSuccess("Successfully Sent ")
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='container p-4 mt-4 shadow-5-strong '>

            <section class="mb-4">


                <h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>

                <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
                    a matter of hours to help you.</p>

                <div class="row">
                    {error && <div class="alert alert-danger" role="alert">
                        {error}
                    </div>}

                    <div class="col-md-9 mb-md-0 mb-5">
                        {success && <div class="alert alert-success" role="alert">
                            {success}
                        </div>}
                        <form id="contact-form" name="contact-form" action="mail.php" method="POST">


                            <div class="row">


                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                    <label for="name" class="">First Name</label>
                                       
                                        <input type="text" id="name" name="name" class="form-control" value={firstname} onChange={(e) => { setFirstname(e.target.value) }} />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                    <label for="email" class="">Last Name</label>
                                       
                                        <input type="text" id="email" name="email" class="form-control" value={lastname} onChange={(e) => { setLastname(e.target.value) }} />
                                    </div>
                                </div>


                            </div>
                            <div class="row">


                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                    <label for="name" class="">State</label>
                                       
                                        <input type="text" id="name" name="name" class="form-control" value={state} onChange={(e) => { setStates(e.target.value) }} />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                    <label for="email" class="">District</label>
                                       
                                        <input type="text" id="email" name="email" class="form-control" value={district} onChange={(e) => { setDistrict(e.target.value) }} />
                                    </div>
                                </div>


                            </div>

                            <div class="row">


                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                    <label for="name" class="">Email</label>
                                       
                                        <input type="email" id="name" name="name" class="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                    <label for="email" class="">Phone No</label>
                                        
                                        <input type="text" id="email" name="email" class="form-control" value={phoneno} onChange={(e) => { setPhoneno(e.target.value) }} />
                                    </div>
                                </div>


                            </div>



                            <div class="row">


                                <div class="col-md-12">

                                    <div class="md-form">
                                    <label for="message">Your message</label>
                                       
                                        <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea" value={message} onChange={(e) => { setMessage(e.target.value) }}></textarea>
                                    </div>

                                </div>
                            </div>


                        </form>

                        <div class="text-center text-md-left">
                            <button class="btn btn-primary" onClick={sendQuery}>Send</button>
                        </div>
                        <div class="status"></div>
                    </div>

                    <div class="col-md-3 text-center">
                        <ul class="list-unstyled mb-0">
                            <li><i class="fas fa-map-marker-alt fa-2x"></i>
                                <p>385 Krishi Kunj Near IARI Pusa Delhi 110012</p>
                            </li>

                            
                            <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                                <p>support@suvicosolutions.com</p>
                            </li>
                        </ul>
                    </div>


                </div>

            </section>

          

        </div>
    )
}
