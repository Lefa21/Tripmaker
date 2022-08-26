import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

function Quiz(props) {

  //recupération du tableau depuis le store ok!!!
  console.log("recupération du store", props.answer)


  const QuestionQuiz = [
    {
      id: 0,
      question: "Quel continent voulez-vous visiter ?",
      options: [
        { answerText: "Europe", },
        { answerText: "Asie" },
        { answerText: "Oceanie" },
        { answerText: "Amérique" },
        { answerText: "Afrique" },

      ],

    },

    {
      id: 1,
      question: "Quel est votre Budget ?",
      options: [
        { answerText: "100€ - 500€" },
        { answerText: "500€ - 1500€" },
        { answerText: "1500€ - 3000€" },
        { answerText: "plus de 3000€" },


      ],

    },
    {
      id: 2,
      question: "Quel serait le moyen de transport idéal?",
      options: [
        { answerText: "velo" },
        { answerText: "avion" },
        { answerText: "train" },
        { answerText: "voiture" },
        { answerText: "bateau" }


      ]

    }, {
      id: 3,
      question: "Quel type d'activité recherchez vous ?",
      options: [
        { answerText: "plage" },
        { answerText: "neige" },
        { answerText: "volcan" },
        { answerText: "safari" },
        { answerText: "montagne" }

      ],

    }
  ]


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lastQuestion, setLastQuestion] = useState(false)

  //faire defiler les qst 

  const handleAnswerOptionClick = (answerText) => {
    console.log('currentQuestion', currentQuestion)
    if (currentQuestion === QuestionQuiz.length - 1) {
      setLastQuestion(true)
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < QuestionQuiz.length) {
      setCurrentQuestion(nextQuestion);

    }
    props.tabAddAnswear(answerText)




  };

  if (lastQuestion) {
    return (<Redirect to="/signup" />)
  } else {
    return (
      <div className='containera'>

        <nav className='nava'>
        <h1><span className='logo'>Trip</span>Maker</h1>

        </nav>

        <div className='question-text' style={{marginTop: 200}}>{QuestionQuiz[currentQuestion].question}</div>
        <div className='containerboutons'>
          <div >
            {QuestionQuiz[currentQuestion].options.map((options) => (
              <button className='boutondusite' onClick={() => handleAnswerOptionClick(options.answerText)}>{options.answerText}</button>
            ))}
          </div>


        </div>
      </div>
    )
  }

}
function mapDispatchToProps(dispatch) {
  return {
    tabAddAnswear: function (reponseQuizz) {

      dispatch({
        type: 'saveAnswear',
        answerList: reponseQuizz,



      })
    }
  }
}

function mapStateToProps(state) {
  //console.log('state',state);
  return {
    answer: state.answer,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
