import React from 'react';
import { Link } from "react-router-dom";


function Navblanche() {


  return (
    <div>
      <nav className='navi'>
      <Link to='/' style={{ textDecoration: 'none' }}><h1><span className='logoi'>Trip</span>Maker</h1></Link>
        <ul className='listea'>
        <Link to= '/login' style={{ textDecoration: 'none' }}><li className='itemsi'>Mon profil</li></Link>
        <Link to= '/DashboardProfil' style={{ textDecoration: 'none' }}><li className='itemsi'>Dashboard</li></Link>
            <Link to= '/' style={{ textDecoration: 'none' }}><li className='itemsi'>Deconnexion</li></Link>
        </ul>
        </nav>
    </div>
    

  );
}
export default Navblanche;
