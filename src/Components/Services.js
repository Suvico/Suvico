import React from 'react'
import temp1 from "../Images/temp1.jpg"
import Footer from './Footer'
import OtherServices from './OtherServices'

export default function Services() {
  return (


    <div>
    <div className="container mt-5 w-100 shadow-5-strong p-2">
      <h2 className="p-2 text-primary mb-4" style={{fontSize:"30px"}}><center><b>Our Services</b></center></h2>
      <div className='row '>
      <div className='col-12 col-md-4 p-2'>
          <div className="card text-center">
            <div className="card-header text-white bg-primary"><strong>Astrology</strong></div>
            <div className="card-body">

              <p className="card-text text-justify">Unlock the secrets of the cosmos with our personalized astrology services, guiding you through the celestial wonders that shape your destiny and Journey.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <a href="#" className="btn btn-outline-primary">Read More</a>
            </div>

          </div>

        </div>
        <div className='col-12 col-md-4 p-2'>
          <div className="card text-center">
            <div className="card-header text-white bg-primary"><strong>Panchang Services</strong></div>
            <div className="card-body">

              <p className="card-text text-justify ">Stay attuned to celestial events and auspicious timings with our Panchang services, ensuring alignment with cosmic rhythms for auspicious beginnings and endeavors.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;</p>
              <a href="#" className="btn btn-outline-primary">Read More</a>
            </div>

          </div>
        </div>
        <div className='col-12 col-md-4 p-2 '>
          <div className="card text-center">
            <div className="card-header text-white bg-primary"><strong>Kundli Horoscope Analysis</strong></div>
            <div className="card-body">

              <p className="card-text text-justify">Delve into the intricacies of your Kundli with comprehensive horoscope analyses, unveiling the cosmic forces shaping your destiny. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
              <a href="#" className="btn btn-outline-primary">Read More</a>
            </div>

          </div>
        </div>
      

      </div>

      {/* This is 
    row two*/}
      <div className='row'>
        <div className='col-12 col-md-4 p-2'>
          <div className="card text-center">
            <div className="card-header text-white bg-primary"><strong>Career Path Guidance</strong></div>
            <div className="card-body">

              <p className="card-text text-justify">Align your career aspirations with astrological insights to unlock your professional potential and find fulfillment.</p>
              <a href="#" className="btn btn-outline-primary">Read More</a>
            </div>

          </div>
        </div>
        <div className='col-12 col-md-4 p-2 '>
          <div className="card text-center">
            <div className="card-header text-white bg-primary"><strong>Relationship Compatibility Analysis</strong></div>
            <div className="card-body">

              <p className="card-text text-justify">Uncover the cosmic dynamics of your relationships with in-depth compatibility analysis for deeper connections and harmony.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <a href="#" className="btn btn-outline-primary">Read More</a>
            </div>

          </div>
        </div>
        <div className='col-12 col-md-4 p-2'>
          <div className="card text-center">
            <div className="card-header text-white bg-primary"><strong>Spiritual Growth and Enlightenment</strong></div>
            <div className="card-body">

              <p className="card-text text-justify">Embark on a transformative journey of self-discovery and spiritual enlightenment guided by the wisdom of astrology. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;</p>
              <a href="#" className="btn btn-outline-primary">Read More</a>
            </div>

          </div>

        </div>

      </div>
      </div>

      <div>
         {/* <OtherServices /> */}
      </div>
     

       </div>



  )
}
