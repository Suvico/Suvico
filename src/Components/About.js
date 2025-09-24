import React from 'react'
import Footer from './Footer'
import img1 from '../Images/about.jpg'

export default function About() {
  return (
  
//   <div className='container-fluid border border-dark p-2 m-2'>
//     <div className='container p-4 border shadow-4-light mt-2 d-block'>
//         <h4>About Us</h4><hr/>
//         <p>With a solution to all types of payment processing needs, Suvico aims to help the merchants expand their sales by enabling them to accept payments in the offline &emerging online world. Suvico as an omni-channel payment processing platform with competitive products & services such as Payment Gateway, Digital POS, MPOS, Mini ATM, and other disruptive and revolutionary products, helps merchants accept customer payments across all sales channels & devices whether via the telephone, mobile, online or face to face.
// </p>

//     </div>
//     <center>
// <img src={img1} alt="About" className='container p-5 '/></center>
//     <div className='container p-4 border shadow-4-light mt-2 d-block'>
//         <h4>About Suvico</h4><hr/>
//         <p>
// Suvico Solution Private Limited was established in the year 2020. We are a leading Payment Facilitator, Service Provider of Card Swiping Machine, Digital POS, Mini ATM, Mantra &Morpho Device, BBPS Service DMT, AEPS, Bharat QR and Digital payment solution etc. We have followed customer-centric policies and striven to gain excellence in our specified stream. These working attributes have made our name trusted and to become customers’ favourite.


// With a solution to all types of payment processing needs, Suvico aims to help the merchants expand their sales by enabling them to accept payments in the offline &emerging online world. Suvico as an omni-channel payment processing platform with competitive products & services such as Payment Gateway, Digital POS, MPOS, Mini ATM, and other disruptive and revolutionary products, helps merchants accept customer payments across all sales channels & devices whether via the telephone, mobile.</p>

//     </div>
<div>
<div className="container px-0 py-3  wow fadeInUp" data-wow-delay="0.1s">
<div className="container px-0 py-2">
    <div className="row g-5">
        <div className="col-lg-7">
            <div className="section-title position-relative pb-3 mb-5">
                <h5 className="fw-bold text-success text-uppercase mb-3" style={{fontSize:"30px"}}>About Us</h5>
             
            <p className="mb-4 text-justify">Trust, reliability, and excellence define our journey at Suvico Solution, where we make digital payments effortless for all. With a solution to all types of payment processing needs, Suvico aims to help the merchants expand their sales by enabling them to accept payments in the offline &emerging online world. Suvico as an omni-channel payment processing platform with competitive products & services such as Payment Gateway, Digital POS, MPOS, Mini ATM, and other disruptive and revolutionary products, helps merchants accept customer payments across all sales channels & devices whether via the telephone, mobile, online or face to face.</p>
             <p className="mb-4 text-justify">Suvico Solution Private Limited was established in the year 2020. We are a leading Payment Facilitator, Service Provider of Card Swiping Machine, Digital POS, Mini ATM, Mantra &Morpho Device, BBPS Service DMT, AEPS, Bharat QR and Digital payment solution etc. We have followed customer-centric policies and striven to gain excellence in our specified stream. These working attributes have made our name trusted and to become customers’ favourite.
             At Suvico Solution, we understand the significance of Bharat QR, a revolutionary payment method that simplifies QR code-based transactions, promoting a cashless economy. We continuously innovate and adapt our services to align with the dynamic landscape of digital payments, ensuring that our clients stay ahead in the competitive market.
      
</p>
{/* <p className='mb text-justify'>       As a trusted name in the industry, Suvico Solution has earned accolades from clients and partners alike. Our dedication to quality and reliability has fostered long-lasting relationships and has made us a preferred choice for businesses looking for seamless and secure payment solutions.
Our commitment to excellence and customer satisfaction is the cornerstone of our success. We go above and beyond to understand our clients' needs, providing personalized solutions and dedicated support to drive their growth and success.
</p> */}



        </div>
       
    </div>
    <div className="col-lg-5" style={{minHeight: "500px"}}>
            <div className="position-relative h-100">
                <img className="position-absolute w-100 h-100 rounded wow zoomIn border  border-success" data-wow-delay="0.9s" src={img1} style={{objectFit: "cover"}}/>
            </div>
        </div>
</div>

</div>

</div>
    
   </div>
  )
}
