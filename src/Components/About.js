import React from 'react'
import Footer from './Footer'
import img1 from '../Images/about.jpeg.png'

export default function About() {
  return (<div className='container-fluid border border-dark p-2 m-2'>
    <div className='container p-4 border shadow-4-light mt-2 d-block'>
        <h4>About Us</h4><hr/>
        <p>With a solution to all types of payment processing needs, Suvico aims to help the merchants expand their sales by enabling them to accept payments in the offline &emerging online world. Suvico as an omni-channel payment processing platform with competitive products & services such as Payment Gateway, Digital POS, MPOS, Mini ATM, and other disruptive and revolutionary products, helps merchants accept customer payments across all sales channels & devices whether via the telephone, mobile, online or face to face.
</p>

    </div>
    <center>
<img src={img1} alt="About" className='container p-5 '/></center>
    <div className='container p-4 border shadow-4-light mt-2 d-block'>
        <h4>About Suvico</h4><hr/>
        <p>
Suvico Solution Private Limited was established in the year 2020. We are a leading Payment Facilitator, Service Provider of Card Swiping Machine, Digital POS, Mini ATM, Mantra &Morpho Device, BBPS Service DMT, AEPS, Bharat QR and Digital payment solution etc. We have followed customer-centric policies and striven to gain excellence in our specified stream. These working attributes have made our name trusted and to become customers’ favourite.


With a solution to all types of payment processing needs, Suvico aims to help the merchants expand their sales by enabling them to accept payments in the offline &emerging online world. Suvico as an omni-channel payment processing platform with competitive products & services such as Payment Gateway, Digital POS, MPOS, Mini ATM, and other disruptive and revolutionary products, helps merchants accept customer payments across all sales channels & devices whether via the telephone, mobile.</p>

    </div>
    <Footer/>
    </div>
  )
}
