import React from 'react'
// import Cards from './Cards';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
function DestinationCles() {
    const { t, } = useTranslation();
    return (
        <div className='containercar'>
            <ul>
                <li>
                    <div className="car">
                        <img className='image' src='https://res.cloudinary.com/dwwbze85w/image/upload/v1659451748/photos%20destinations%20cl%C3%A9s/bali_iqinku.jpg' alt=""></img>
                        <div className="con-text">
                            <h2>
                            {t('nomvillecards1')}
                            </h2>
                            <p>
                            {t('descriptionville1')}
                                <span className='star'>
                                <Icon icon="ant-design:star-filled"  /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled" />
                                </span>
                            </p>

                        </div>

                    </div>
                </li>

                <li>
                    <div className="car">
                        <img src='https://res.cloudinary.com/dwwbze85w/image/upload/v1659451756/photos%20destinations%20cl%C3%A9s/chamonix2_qg7pwk.jpg' alt=""></img>
                        <div className="con-text">
                            <h2>
                            {t('nomvillecards2')}
                            </h2>
                            <p>
                            {t('descriptionville2')}
                                <span className='star'>
                                <Icon icon="ant-design:star-filled"  /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled"style={{ color: 'white'}}  />
                                </span>
                            </p>

                        </div>

                    </div>
                </li>

                <li>
                    <div className="car">
                        <img src='https://res.cloudinary.com/dwwbze85w/image/upload/v1659451923/photos%20destinations%20cl%C3%A9s/kophiphi_w3ar8p.jpg' alt=""></img>
                        <div className="con-text">
                            <h2>
                            {t('nomvillecards3')}
                            </h2>
                            <p>
                            {t('descriptionville3')}
                                <span className='star'>
                                <Icon icon="ant-design:star-filled"  /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled"style={{ color: 'white'}}  />
                                </span>
                            </p>

                        </div>

                    </div>

                </li>
                <li>
                    <div className="car">
                        <img src='https://res.cloudinary.com/dwwbze85w/image/upload/v1659451805/photos%20destinations%20cl%C3%A9s/Rio_uewfap.jpg' alt=""></img>
                        <div className="con-text">
                            <h2>
                            {t('nomvillecards4')}
                            </h2>
                            <p>
                            {t('descriptionville4')}
                                <span className='star'>
                                <Icon icon="ant-design:star-filled"  /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled"style={{ color: 'white'}}  /><Icon icon="ant-design:star-filled"style={{ color: 'white'}}  />
                                </span>
                            </p>

                        </div>

                    </div>
                </li>

                <li>
                    <div className="car">
                        <img src='https://res.cloudinary.com/dwwbze85w/image/upload/v1659451825/photos%20destinations%20cl%C3%A9s/leCaire_urggkq.jpg' alt=""></img>
                        <div className="con-text">
                            <h2>
                            {t('nomvillecards5')}
                            </h2>
                            <p>
                            {t('descriptionville5')}
                                <span className='star'>
                                <Icon icon="ant-design:star-filled"  /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled" /><Icon icon="ant-design:star-filled"style={{ color: 'white'}}  />
                                </span>
                            </p>

                        </div>

                    </div>
                </li>
            </ul>
        </div>
    )
}

export default DestinationCles;