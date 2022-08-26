import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Navsignin from "./Navsignin";


function SignUp(props) {

  //recupération des résultat du quiz via le store
  console.log("page du signup", props.answer)

  //variable d'état
  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpFirstName, setSignUpFirstName] = useState('')
  const [signUpLastName, setSignUpLastName] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignup, setErrorsSignup] = useState([])
  const [passwordShown, setPasswordShown] = useState(false);

  //state des rep du quiz
  //const [allAnswer, setAllanswer] = useState();


  const togglePassword = (props) => {

    setPasswordShown(!passwordShown);

  };

  //fonction pour envoyer les rep au back
  var handleSubmitSignup = async () => {
    //setAllanswer(props.answer)

    const data = await fetch('/users/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${signUpUsername}&firstName=${signUpFirstName}&lastName=${signUpLastName}&email=${signUpEmail}&password=${signUpPassword}&climat=${props.answer[0]}&continent=${props.answer[1]}&budget=${props.answer[2]}&transport=${props.answer[3]}&activites=${props.answer[4]}`
    })

    // //envoi du mail a la route de l'algorithme
    // const dataMail = await fetch('/quiz/result-quizz', {
    //    method: 'POST',
    //    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //    body: `email=${signUpEmail}`
    //  })
    // await fetch(`/quiz/result-quizz/${signUpEmail}`);
    // console.log(signUpEmail)



    const body = await data.json()
    console.log("body", body)

    if (body.result === true) {
      props.userEmailRedux(signUpEmail)
      setUserExists(true)
      props.addToken(body.token)

    } else {
      setErrorsSignup(body.error)
    }
  }
  if (userExists) {
    return <Redirect to='/resultat' />
  }
  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return (<p style={{ color: "red", fontStyle: "italic", fontWeight: "bold" }}>{error}</p>)
  })

  return (
    <>
      <Navsignin />
      <div className="bg-img">

        <div className="contenta">
          <header>S'enregistrer</header>

          <div className="fielda space">
            <Icon icon="carbon:user-filled" />
            <input onChange={(e) => setSignUpUsername(e.target.value)} type="text" required placeholder="Nom d'utilisateur" />
          </div>
          <div className="fielda space">
            <Icon icon="carbon:user-filled" />
            <input onChange={(e) => setSignUpFirstName(e.target.value)} type="text" required placeholder="Prénom" />
          </div>       <div className="fielda space">
            <Icon icon="carbon:user-filled" />
            <input onChange={(e) => setSignUpLastName(e.target.value)} type="text" required placeholder="Nom" />
          </div>
          <div className="fielda space">
            <Icon icon="dashicons:email-alt" />
            <input onChange={(e) => setSignUpEmail(e.target.value)} type="email" required placeholder="Email" />
          </div>
          <div className="fielda space">
            <Icon icon="el:lock" />
            <input onChange={(e) => setSignUpPassword(e.target.value)} type={!passwordShown ? "password" : "text"} className="pass-key" required placeholder="Mot de passe" />
            <Icon onClick={togglePassword} className='showa' icon="bi:eye-fill" />


          </div>
          {tabErrorsSignup}

          <div className="fielda space">
            <input onClick={() => handleSubmitSignup()} type="submit" value="S'ENREGISTRER" />
          </div>
          <div className="signup">
            Vous avez déjà un compte?
            <Link to='login'> Se connecter</Link>
          </div>
        </div>
      </div>


    </>
  );
}

// envoi des réponses au store

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'addToken', token: token })
    },

    userEmailRedux: function (userMail) {

      dispatch({
        type: 'saveUserEmailToRedux',
        userMail: userMail,

      })

    }
  }
}

//recupération des réponse depuis le store
function mapStateToProps(state) {
  console.log('state', state);
  return {
    answer: state.answer,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

