import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { useTranslation } from 'react-i18next';


function QuestionAccueil(props) {
  const { t, i18n } = useTranslation();

  const [answer, setAnswer] = useState(false)
  //const [reponseQuizz, setReponseQuizz] = useState([])

  //faire defiler les qst 

  const handleAnswerOptionClick = (answerText) => {
    //setReponseQuizz([...reponseQuizz, answerText])
    setAnswer(true)
    props.tabAnswear(answerText)

  };

  if (answer) {
    return (<Redirect to='/Quiz' />)
  }

  return (
    <div className='containera'>
      <div className='titlea'>
        
        <h1 className=''>{t('presentation1')}<br />{t('presentation2')} <span>{t('presentation3')}</span></h1>
      </div>
      
      <div className='start'>
        <h2>{t('climat')}</h2>

      </div>

      <div className='containerboutons'>
        <div >

          <button className='boutondusite' onClick={() => handleAnswerOptionClick('froid')}>{t('froid')}</button>
          <button className='boutondusite' onClick={() => handleAnswerOptionClick('tempéré')}>{t('tempéré')}</button>
          <button className='boutondusite' onClick={() => handleAnswerOptionClick('continental')}>{t('continental')}</button>
          <button className='boutondusite' onClick={() => handleAnswerOptionClick('tropical')}>{t('tropical')}</button>
          <button className='boutondusite' onClick={() => handleAnswerOptionClick('désertique')}>{t('désertique')}</button>
        </div>


      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    tabAnswear: function(reponseQuizz) {

        dispatch( {type: 'saveAnswear',
          answerList: reponseQuizz,
                                })
    }
  }
}


export default connect(
  null, 
  mapDispatchToProps
)(QuestionAccueil);

