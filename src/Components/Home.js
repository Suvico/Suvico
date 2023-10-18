import React from 'react'
import About from './About'
import Carousel from './Carousel'
import ContactUs from './ContactUs'
import Footer from './Footer'
import Services from './Services'
export default function Home() {
  return (
    <div className='container-fluid px-0'>
     
      <div className='container'><Carousel /></div>
      <div className='container'><About /></div>
      <div className='container'> <Services /></div>

      <ContactUs />
    <Footer/>

    </div>
  )
}
