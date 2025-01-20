import React from 'react';
import "./Footer.css";  






export const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
      <div>
            <section className="footer-section">
              <div className="footer">
                  <div className=' '>
                      <div className='footer-copyright'>
                      <div className="social-icons">
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
