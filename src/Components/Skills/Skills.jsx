import React from 'react'
import "./Skills.css";
import reactImg from "../Assets/react.png";
import htmlImg from "../Assets/html.png"
import arrow_middle from "../Assets/Arrow_middle.png";
import Bubble from '../Bubble/Bubble';

const skillset1Data = [
    {
        imgURL: reactImg,
        title: "REACT JS",
    },
    {
        imgURL: htmlImg,
        title: "HTML",
    },
    {
        imgURL: htmlImg,
        title: "JAVASCRIPT",
    },
]
const skillset3Data = [
    {
        imgURL: reactImg,
        title: "MONGODB FOR DATA BASE",
    },
    {
        imgURL: htmlImg,
        title: "EXPRESS JS",
    },
    {
        imgURL: htmlImg,
        title: "NODE JS",
    },
]
const skillset2Data = [
    {
        imgURL: reactImg,
        title: "FIGMA",
    },
    {
        imgURL: htmlImg,
        title: "ADOBE PHOTOSHOP",
    },
    {
        imgURL: htmlImg,
        title: "ADOBE ILLUSTRATOR",
    },
]

export const Skills = () => {
  return (
      <div id='skill' className='skill-wrapper'>  
          <Bubble/>
        <div className="skill-container">
              <h1 className='skill-header'>SKILL </h1>
              <div className="skillset">
                  <div className='skillet1'>
                    <h3 className='skillet1-header-main'>FRONTEND DEVELOPER</h3>
                  <h4 className='tools'>Tools</h4> 
                  <ul className="skillset1-body">
                      {
                          skillset1Data.map((items, index) => {
                            return  <li key={index} className='skillset-frontend skill-body'><img src={items.imgURL} alt="react logo" /> <span>{items.title}</span></li>
                          })
                      }
                      </ul>
                  </div>
                  <div className='skillet11'>
                  <h3 className='skillet1-header-main'>UI/UX</h3>
                  <h4 className='tools'>Tools</h4> 
                  <ul className="skillset1-body">
                      {
                          skillset3Data.map((items, index) => {
                            return  <li key={index} className='skillset-ui skill-body'><img src={items.imgURL} alt="react logo" /> <span>{items.title}</span></li>
                          })
                      }
                      </ul>
                  </div>
                  <div className='skillet3'>
                  <h3 className='skillet1-header-main'>BACKEND DEVELOPER</h3>
                  <h4 className='tools'>Tools</h4> 
                  <ul className="skillset1-body">
                      {
                          skillset2Data.map((items, index) => {
                            return  <li key={index} className='skillset-backend skill-body'><img src={items.imgURL} alt="react logo" /> <span>{items.title}</span></li>
                          })
                      }
                      </ul>
                  </div>
              </div>
              </div>
              <div className="arrow-header-skill">
      <img className="arrow_middle-skill-img" src={arrow_middle} alt="" />
      </div>
       </div>
  )
}
