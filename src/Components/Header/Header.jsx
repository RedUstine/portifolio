import React, { useState, useEffect } from "react";
import "./Header.css";
import profile from "../Assets/profile-icon.jpg";
import arrow_middle from "../Assets/Arrow_middle.png";
import cv from "../Assets/red-cv.pdf";
import Bubble from "../Bubble/Bubble";
import Aos from "aos";
import "aos/dist/aos.css";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };
  const handleCloseMenu = () => {
    setMenuOpen(false);
  };
  useEffect(() => {
    Aos.init({
      duration: 1900,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <div className="header-wrap">
      <Bubble />

      <header className="header">
       <div data-aos="fade-left" > <a href="#home" className="logo">
          PROLIFIC<span> TECH</span>
        </a></div>
        <button onClick={handleOpenMenu} className="menu-icon">
          <i className="bx bx-menu"></i>
        </button>
        <nav className={`nav-bar ${menuOpen ? "nav-open" : ""}`}>
          <button onClick={handleCloseMenu} className="cancel-icon">
            <i className="bx bx-x"></i>
          </button>
          <a href="#home" className="active">
            HOME
          </a>
          <a href="#skill">SKILL</a>
          <a href="#project">PROJECT</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>

      <section className="home" id="home">
        <div data-aos="fade-right" className="home-content">
          {/* <h1>
            Hi, It's <span>Augustine</span>
          </h1> */}
          <h3 className="text-animation">
            Hi, I'm a <br />
            <span></span>
          </h3>
          <p>
            I’m a versatile and solution-oriented full-stack developer with a
            passion for creating seamless, user-friendly digital experiences.
          </p>
          <div data-aos="fade-up" className="social-icons">
            <a href="https://www.github.com">
              <i class="bx bxl-github"></i>
            </a>
            <a href="https://www.linkedin/in/okogbe-augustine.com">
              <i class="bx bxl-linkedin"></i>
            </a>
            <a href="https://www.instagram.com">
              <i class="bx bxl-instagram-alt"></i>
            </a>
            <a href="https://www.twitter.com">
              <i class="bx bxl-twitter"></i>
            </a>
          </div>
          <div data-aos="flip-down" className="btn-group">
            <a href={cv} target="_blank" className="btn">
              Download CV
            </a>
          </div>
        </div>
        <div data-aos="fade-right" className="home-img">
          <img src={profile} alt="" />
        </div>
      </section>
      <div className="arrow-header-home">
        <img className="arrow_middle-home-img" src={arrow_middle} alt="" />
      </div>
    </div>
  );
};
