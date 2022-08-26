import React from 'react';
import { useTranslation } from 'react-i18next';


function FooterNoir() {
  const { t, } = useTranslation();
  return (
    <footer style={{ backgroundColor: '#263037' }}>
    <div>
      <h1 className='logo1' style={{ color: 'white' }}><span>Trip</span>Maker</h1>

      <p className='descprition' style={{ color: 'white' }}>{t('footerslogan')}</p>
    </div>
    <div className='copyright' style={{ color: 'white' }}>
      <p>{t('footercopyright')}</p>
    </div>
  </footer>


  );
}

export default FooterNoir;