import React from 'react';
import { Link } from "react-router-dom";

function Navdash() {

  return (
    <div>
      <nav className='nava'>
      <Link to='/' style={{ marginTop:'10px',textDecoration: 'none' }}><h1><span className='logoa'>Trip</span>Maker</h1></Link>
        <ul className='listea'>
        <Link to= '/dashboardprofil' style={{ marginTop:'20px',textDecoration: 'none' }}><li className='itemsa'>Dashboard</li></Link>
            <a href= '/' style={{ marginTop:'20px',textDecoration: 'none' }}><li className='itemsa'>Deconnexion</li></a>
        </ul>
        </nav>
    </div>
    
  );
}
export default Navdash;
