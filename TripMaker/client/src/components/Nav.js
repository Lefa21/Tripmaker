import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import { Icon } from '@iconify/react';

const lngs = {
  fr: {nativeName: <Icon icon="emojione:flag-for-france" />},
  en: {nativeName: <Icon icon="circle-flags:uk" />},
  zh: {nativeName: <Icon icon="emojione:flag-for-china" />}
}  



function Nav() {
  const { t, i18n} = useTranslation();



  return (   
     <div>
    <nav className='nava'>
    <Link to='/' style={{ marginTop:'10px',textDecoration: 'none' }}><h1><span className='logoa'>Trip</span>Maker</h1></Link>
      <ul className='listea'>
      <div style={{ textDecoration: 'none', marginLeft: '30px',marginTop:'20px' }}>
          {Object.keys(lngs).map((lng) => (
            <Link type="submit" key={lng} onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng} style={{margin: 3,marginTop:'10px'}}>{lngs[lng].nativeName}</Link>
          ))}
</div>

          <Link to= '/login' style={{ textDecoration: 'none', marginLeft: '30px',marginTop:'30px' }}><li className='itemsa'>{t('connexion')}</li></Link>
      </ul>
      </nav>
  </div>



  );
}





export default Nav;