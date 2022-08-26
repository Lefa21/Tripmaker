import React from 'react';
import { useTranslation } from 'react-i18next';

// import '../css/Footer.css'

function Footer() {
  const { t, } = useTranslation();
  return (
    <footer>
      <div>
        <h1 className='logo1'><span>Trip</span>Maker</h1>

        <p className='descprition'>{t('footerslogan')}</p>
      </div>
      <div className='copyright'>
        <p>{t('footercopyright')}</p>
      </div>
    </footer>


  );
}

export default Footer;
