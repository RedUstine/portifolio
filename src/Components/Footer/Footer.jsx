import React,{useEffect} from 'react';
import "./Footer.css";  
import Aos from "aos";
import "aos/dist/aos.css";







export const Footer = () => {
    const date = new Date();
  const year = date.getFullYear();
  useEffect(()  => {
    Aos.init(
        {
            duration: 2500,
            easing: "ease-out-cubic"
        });
    Aos.refresh({
       duration: 2000,
            easing: "ease-out-cubic"
    })
},[]);
  return (
      <div>
            <section className="footer-section">
              <div data-aos="fade-up" className="footer">
                  <div data-aos="fade-right" className=' '>
                      <div data-aos="fade-left" className='footer-copyright'>
                      <div data-aos="fade-up" className="social-icons">
            <a href="http://www.github.com">
              <i class="bx bxl-github"></i>
            </a>
            <a href="linkedin.com">
              <i class="bx bxl-linkedin"></i>
            </a>
            <a href="instagram.com">
              <i class="bx bxl-instagram-alt"></i>
            </a>
            <a href="twitter.com">
              <i class="bx bxl-twitter"></i>
            </a>
          </div>
                 <hr/> 
                  <p>Copyright @ {year} - All Right Reserved</p>
                </div>
                </div>
              </div>
              </section>
    </div>
  )
}
