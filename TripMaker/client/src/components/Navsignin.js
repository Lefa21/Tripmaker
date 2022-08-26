import React from 'react'
import { Link } from "react-router-dom";

function Navsignin() {
  
  return (
    <div>
    <nav className='nava'>
    <Link to='/' style={{ marginTop:'10px',textDecoration: 'none' }}><h1><span className='logo'>Trip</span>Maker</h1></Link>
      </nav>
  </div>
  )
}
export default Navsignin
