import React from 'react';
import { FaStar } from 'react-icons/fa'; 
import breaker from "../assets/breaker.png";

function SectionBreak() {
  return (
    <div className="line-breaker">
    <div className="line"></div>
    <img src={breaker} className='icon' alt="Section Break Icon" />
    <div className="line"></div>
  </div>
  );
}

export default SectionBreak;
