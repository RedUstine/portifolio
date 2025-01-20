import React from "react";
import "./Project.css";
import clothingstore from "../Assets/clothingstore.jpg";
import schoolmgt from "../Assets/schoolmgt.jpg";
import quize from "../Assets/quize.jpg";
import arrow_middle from "../Assets/Arrow_middle.png";
import link from "../Assets/link.png";
import info from "../Assets/info.png";
import Bubble from "../Bubble/Bubble";

export const Project = () => {
  return (
    <div className="project-bubble">
      <Bubble/>
    <section className="project" id="project">
      <h2 >PROJECT</h2>

      <div className="timeline-items">
        <div className="timeline-item">
          <div className="timeline-dot"> </div>
          <div className="timeline-date">CLOTHING STORE</div>

          <div className="home-img">
            <img src={clothingstore} alt="" />            
          </div>
          <div className="link">
            <img className="link1" src={info} alt="" />
            <img className="link1" src={link} alt="" />
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"> </div>
          <div className="timeline-date">SCHOOL MANAGEMENT SYSTEM</div>

          <div className="home-img">
            <img src={schoolmgt} alt="" />
          </div>
          <div className="link">
            <img  onclick="document.getElementById('')" className="link1" src={info} alt="" />
            <img className="link1" src={link} alt="" />
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"> </div>
          <div className="timeline-date">QUIZ APP</div>

          <div className="home-img">
            <img src={quize} alt="" />  
          </div>
          <div className="link">
            <img className="link1" src={info} alt="" />
            <img className="link1" src={link} alt="" />
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"> </div>
          <div className="timeline-date">JOB PORTAL</div>

          <div className="home-img">
            <img src={clothingstore} alt="" />
            </div>
            <div className="link">
            <img className="link1" src={info} alt="" />
            <img className="link1" src={link} alt="" />
          </div>
      
        </div>
      </div>
      </section>
      <div className="arrow-header-project">
      <img className="arrow_middle-project-img" src={arrow_middle} alt="" />
      </div>
      </div>
  );
};
