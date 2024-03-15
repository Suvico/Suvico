import React from 'react'
import temp1 from "../Images/temp1.jpg"
import Footer from './Footer'
import OtherServices from './OtherServices'
export default function Services() {
  return (


    <div>
    <div className="container mt-5 w-100 shadow-5-strong p-2">
      <h2 className="p-2 text-success mb-4" style={{fontSize:"30px"}}><center><b>Our Services</b></center></h2>
      <div className='row'>
      <div className='col-12 col-md-4 p-2'>
          <div className="card text-center">
            <div className="card-header text-black bg-success"><strong>Astrology</strong></div>
            <div className="card-body">

              <p className="card-text">Unlock the secrets of the cosmos with our personalized astrology services, guiding you through the celestial wonders that shape your destiny and Journey.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <a href="#" className="btn btn-outline-success">Read More</a>
            </div>

          </div>

        </div>
        <div className='col-12 col-md-4 p-2'>
          <div className="card text-center">
            <div className="card-header text-black bg-success"><strong>AEPS</strong></div>
            <div className="card-body">

              <p className="card-text ">Aadhar Enabled Payment System (AEPS) is a sort of installment
                framework that depends on the Unique Identification Number and permits Aadhar Card.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;</p>
              <a href="#" className="btn btn-outline-success">Read More</a>
            </div>

          </div>
        </div>
        <div className='col-12 col-md-4 p-2 '>
          <div className="card text-center">
            <div className="card-header text-black bg-success"><strong>BBPS</strong></div>
            <div className="card-body">

              <p className="card-text">Bharat Bill Bayment System facilitates the installment of bills and enhances the security & speed of pay. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
              <a href="#" className="btn btn-outline-success">Read More</a>
            </div>

          </div>
        </div>
        {/* <div className='col-12 col-md-4 p-2'>
          <div className="card text-center">
            <div className="card-header text-black bg-success"><strong>DMT</strong></div>
            <div className="card-body">

              <p className="card-text">Domestic Money Transfer (DMT) benefit is an enormous market in India
                which got much lift with current increment in advanced exchanges. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <a href="#" className="btn btn-outline-success">Read More</a>
            </div>

          </div>

        </div> */}

      </div>

      {/* This is 
    row two*/}
      <div className='row'>
        <div className='col-12 col-md-4 p-2'>
          <div className="card text-center">
            <div className="card-header text-black bg-success"><strong>FASTag</strong></div>
            <div className="card-body">

              <p className="card-text">FasTag is a device that employs Radio Frequency Identification (RFID)
                technology for makaing toll payments directly from a prepaid account linked to it.</p>
              <a href="#" className="btn btn-outline-success">Read More</a>
            </div>

          </div>
        </div>
        <div className='col-12 col-md-4 p-2 '>
          <div className="card text-center">
            <div className="card-header text-black bg-success"><strong>Gas Booking</strong></div>
            <div className="card-body">

              <p className="card-text">Suvico provides you to easy gas booking service. Booking an LPG Cylinder
                can now be done from the comfort of your home at the click of button.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <a href="#" className="btn btn-outline-success">Read More</a>
            </div>

          </div>
        </div>
        <div className='col-12 col-md-4 p-2'>
          <div className="card text-center">
            <div className="card-header text-black bg-success"><strong>Travel</strong></div>
            <div className="card-body">

              <p className="card-text">We provide cheap flight tickets, hotels, bus ticket holiday package. Avail complete
                travel solutions for lifetime journey. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <a href="#" className="btn btn-outline-success">Read More</a>
            </div>

          </div>

        </div>

      </div>
      </div>

      <div>
         <OtherServices />
      </div>
     

       </div>



  )
}
