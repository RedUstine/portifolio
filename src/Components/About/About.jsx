import React, { useEffect } from "react";
import "./About.css";
import profile from "../Assets/profile-icon.jpg";
import arrow_middle from "../Assets/Arrow_middle.png";
import Bubble from "../Bubble/Bubble";
import Aos from "aos";
import "aos/dist/aos.css";

export const About = () => {
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
    <div id="about" className="about">
      <Bubble/>
      <section className="about-section">
            <div data-aos="fade-up" ><h2>ABOUT</h2></div> 
        <div data-aos="fade-down"  class="flip-card">
          <div class="flip-card-inner">
            <div data-aos="fade-up" class="flip-card-front">
              <img className="about-img" src={profile} alt="Avatar" />
            </div>
            <div class="flip-card-back">
              <div data-aos="fade-down" className="about">
                <p>
                  
                  Hello! I’m Okogbe Augustine, a passionate and versatile
                  full-stack developer with experience in both front-end and
                  back-end technologies. I specialize in creating dynamic,
                  user-friendly applications that deliver seamless experiences
                  across devices. With a strong foundation in HTML, CSS,
                  JavaScript, and modern frameworks like React, Node.js, and
                  Express, I build scalable, efficient solutions that meet
                  client needs. I thrive in collaborative environments and am
                  committed to continuous learning, staying up-to-date with the
                  latest industry trends. Whether it's developing intuitive
                  interfaces or optimizing server-side performance, I’m
                  dedicated to bringing ideas to life through code. Let’s build
                  something great together!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="arrow-header-about">
      <img className="arrow_middle-about-img" src={arrow_middle} alt="" />
      </div>
     
    </div>
  );
};
