import React from 'react'
import img1 from "../Images/1.svg"
import img2 from "../Images/z10.jpg"

export default function Carousel() {
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide bg-white mt-4" data-ride="carousel">
      <div className="carousel-inner">
      <div className="carousel-item active d-flex justify-content-center align-items-center">
  <div>
    <img className="d-block " src={img2} alt="First slide" />
    <marquee><span className='text-white bg-success p-1'>Quick and Effortless Payment Of Utility Bills.</span></marquee>
  </div>
</div>

        {/* <div className="carousel-item">
        <img className="d-block  " src={img1} alt="Second slide" />
        </div> */}

      </div>

    </div>
  )
}
