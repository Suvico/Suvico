import React from 'react'
import temp1 from "../Images/ac1.jpg"
import db1 from "../Images/db1.jpg"
import db2 from "../Images/db2.jpg"
import db3 from "../Images/db3.jpg"
import db4 from "../Images/db4.jpg"
import bp1 from "../Images/bp1.jpg"
import bp2 from "../Images/bp2.jpg"
import bp3 from "../Images/bp3.jpg"
import ac1 from "../Images/ac1.jpg"
import ac2 from "../Images/ac2.jpg"

export default function OtherServices() {
  return (
    <div className='shadow-3-strong p-2'>
      <div className='bg-light
    p-2 row border border-secondary '>

        <h3 className='text-white font-monospace bg-dark p-2'>Digital Banking</h3>
        <div className='col border border-secondary p-2'>
          <center><img
            src={db1}
            class="img-fluid rounded-pill "
            alt="Townhouses and Skyscrapers"
          />
            <span></span>
          </center>
        </div>
        <div className='col border border-secondary p-2'>
          <center><img
            src={db2}
            class="img-fluid rounded-pill "
            alt="Townhouses and Skyscrapers"
          />
          </center>
        </div>
        <div className='col border border-secondary p-2'>
          <center><img
            src={db3}
            class="img-fluid rounded-pill "
            alt="Townhouses and Skyscrapers"
          />
          </center>
        </div>

        <div className='col border border-secondary p-2' >
          <center><img
            src={db4}
            class="img-fluid rounded-pill "
            alt="Townhouses and Skyscrapers"
            width={200}
          />
          </center>
        </div></div>
      {/*Row 1 Done*/}
      <div className='bg-light
    p-2 row border border-secondary '>

        <h3 className='text-white font-monospace bg-dark p-2'>Bill Pay And Travel Services</h3>
        <div className='col border border-secondary p-2'>
          <center><img
            src={bp1}
            class="img-fluid rounded-pill "
            alt="Townhouses and Skyscrapers"
          />
            <span></span>
          </center>
        </div>
        <div className='col border border-secondary p-2'>
          <center><img
            src={bp2}
            class="img-fluid rounded-pill "
            alt="Townhouses and Skyscrapers"
          />
          </center>
        </div>
        <div className='col border border-secondary p-2'>
          <center><img
            src={bp3}
            class="img-fluid rounded-pill "
            alt="Townhouses and Skyscrapers"
          />
          </center>
        </div>

      </div>

      {/* Row 3 */}

      <div className='bg-light
    p-2 row border border-secondary '>

        <h3 className='text-white font-monospace bg-dark p-2'>Assisted E-Commerce</h3>
        <div className='col border border-secondary p-2'>
          <center><img
            src={ac1}
            class="img-fluid rounded-pill "
            alt="Townhouses and Skyscrapers"
            width={150}
            height={150}
          />
            <span></span>
          </center>
        </div>
        <div className='col border border-secondary p-2'>
          <center><img
            src={ac2}
            class="img-fluid rounded-pill "
            alt="Townhouses and Skyscrapers"
            width={150}
            height={150}
          />
          </center>
        </div>


      </div>



    </div>
  )
}
