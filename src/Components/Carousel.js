import React from 'react'
import img1 from "../Images/1.svg"
import img2 from "../Images/carousel.svg"

export default function Carousel() {
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide bg-white mt-4" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={img2} alt="First slide" />
          <marquee><span className='text-white bg-primary p-1'>Quick and Effortless Payment Of Utility Bills</span>
          </marquee>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={img2} alt="Second slide" />
        </div>

      </div>

    </div>
  )
}
