"use client"
import React, { useEffect, useState } from 'react'
import '../styles/headerBurger.scss'

const HeaderBurger = () => {
  const [isSmallHeaderActive, setIsSmallHeaderActive] = useState("off");

  useEffect(()=>{
    console.log("isSmallHeaderActive", isSmallHeaderActive)
    if(isSmallHeaderActive){
      
    }
  },[isSmallHeaderActive] )
  return (
    <div id="menuToggle">
        <input id="checkbox" type="checkbox" onChange={(e)=>setIsSmallHeaderActive(e.target.checked)} />
        <label className="toggle" htmlFor="checkbox">
            <div className="bar bar--top"></div>
            <div className="bar bar--middle"></div>
            <div className="bar bar--bottom"></div>
        </label>
    </div>
  )
}

export default HeaderBurger