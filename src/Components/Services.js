import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import OtherServices from './OtherServices';

export default function Services() {
  return (
    <div>
      <div className="container mt-5 w-100 shadow-5-strong p-2">
        <h2 className="p-2 text-primary mb-4" style={{fontSize:"30px"}}><center><b>Check Our Services</b></center></h2>
        <div className='row'>
          <div className='col-12 col-md-4 p-2'>
            <div className="card text-center">
              <div className="card-header text-white bg-primary"><strong>Panchang Services</strong></div>
              <div className="card-body">
                <p className="card-text text-justify">Stay attuned to celestial events and auspicious timings with our Panchang services, ensuring alignment with cosmic rhythms for auspicious beginnings and endeavors.</p>
                <Link to="/panchang" className="btn btn-outline-primary">Read More</Link>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 p-2'>
            <div className="card text-center">
              <div className="card-header text-white bg-primary"><strong>Dosha Analysis</strong></div>
              <div className="card-body">
                <p className="card-text text-justify">Analyze your Doshas to understand the imbalances in your life and receive guidance on how to harmonize them for better well-being.</p>
                <Link to="/dosha" className="btn btn-outline-primary">Read More</Link>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 p-2'>
            <div className="card text-center">
              <div className="card-header text-white bg-primary"><strong>Numerology</strong></div>
              <div className="card-body">
                <p className="card-text text-justify">Explore the mystical world of numbers and how they influence your life through our personalized numerology services.</p>
                <Link to="/numerology" className="btn btn-outline-primary">Read More</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className='row'>
          <div className='col-12 col-md-4 p-2'>
            <div className="card text-center">
              <div className="card-header text-white bg-primary"><strong>Match Making</strong></div>
              <div className="card-body">
                <p className="card-text text-justify">Discover the compatibility between partners with our comprehensive match-making services, based on astrological insights.</p>
                <Link to="/match-making" className="btn btn-outline-primary">Read More</Link>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 p-2'>
            <div className="card text-center">
              <div className="card-header text-white bg-primary"><strong>Today's Horoscope</strong></div>
              <div className="card-body">
                <p className="card-text text-justify">Get insights into your day with our daily horoscope service, tailored to guide you through the day’s opportunities and challenges.</p>
                <Link to="/todayshoroscope" className="btn btn-outline-primary">Read More</Link>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 p-2'>
            <div className="card text-center">
              <div className="card-header text-white bg-primary"><strong>Weekly Horoscope</strong></div>
              <div className="card-body">
                <p className="card-text text-justify">Plan your week ahead with our detailed weekly horoscope, offering guidance based on the celestial movements of the week.</p>
                <Link to="/weeklyhoroscope" className="btn btn-outline-primary">Read More</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Third Row */}
        <div className='row'>
          <div className='col-12 col-md-4 p-2'>
            <div className="card text-center">
              <div className="card-header text-white bg-primary"><strong>Yearly Horoscope</strong></div>
              <div className="card-body">
                <p className="card-text text-justify">Prepare for the year ahead with our yearly horoscope, offering insights and predictions for a successful and fulfilling year.</p>
                <Link to="/yearlyhoroscope" className="btn btn-outline-primary">Read More</Link>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 p-2'>
            <div className="card text-center">
              <div className="card-header text-white bg-primary"><strong>Talk to Astrologer</strong></div>
              <div className="card-body">
                <p className="card-text text-justify">Connect with experienced astrologers for personalized consultations to guide you through life's challenges and opportunities.</p>
                <Link to="" className="btn btn-outline-primary">Read More</Link>
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
