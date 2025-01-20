import React from 'react';
import "./Contact.css";
import map from "../Assets/map.svg"
import Bubble from '../Bubble/Bubble';
// import arrow_middle from "../Assets/Arrow_middle.png";


export const Contact = () => {
  return (
    <div className='contact' id='contact'>
      <Bubble/>
          <section className='contact-section'>
             <div> <h2 >CONTACT</h2></div> 
              <div className="contact-container">
                  <form  action="" className='the-form'>
                      <div><h1>Send A Message</h1></div>
                      <br />
                      <div className='contact-form'>
                      <label htmlFor="">First Name</label>
                      <input type="text" id='fname' name='firstname' placeholder='Enter Your First Name' />
                       <br />
                      <label htmlFor="">Last Name</label>
                      <input type="text" id='lname' name='lasttname' placeholder='Enter Your Last Name' />
                      <br />
                      <label for="country">Country</label>
                      <select id="country" name="country">
                      <option value="nigeria">Nigeria</option>
                   <option value="australia">Australia</option>
                  <option value="canada">Canada</option>
                     <option value="usa">USA</option>
                      </select>
                      <br />
                      <label htmlFor="subject">Message</label>
                      <br />
                      <textarea id="subject" name="subject" placeholder='Enter Your Message........'></textarea>
                      <br />
                          <input className='button' type="submit" value='Send' />
                          </div>
                  </form>
                  <br />
                  <div className="contact-map">
                  <img  src={map} alt="" />
                  </div>
                
             </div>
          </section>
          {/* <img className="arrow_middle" src={arrow_middle} alt="" /> */}

    </div>
  )
}
