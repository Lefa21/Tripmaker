import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { Icon } from '@iconify/react';
import { Link, Redirect } from "react-router-dom";
import Navsignin from "./Navsignin";

function Login(props) {


   const [signInEmail, setSignInEmail] = useState('')
   const [signInPassword, setSignInPassword] = useState('')
   const [userExists, setUserExists] = useState(false)
   const [listErrorsSignin, setErrorsSignin] = useState([])
   const [passwordShown, setPasswordShown] = useState(false);
   //const [token, setToken] = useState('');

   const togglePassword = () => {

      setPasswordShown(!passwordShown);
   };

   var handleSubmitSignin = async () => {

      const data = await fetch('/users/sign-in', {
         method: 'POST',
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         body: `email=${signInEmail}&password=${signInPassword}`
      })

      const body = await data.json()
      console.log(body)

      if (body.result === true) {

         console.log("resultat de la requete",body)
         props.userEmailRedux(signInEmail)

         //console.log(signInEmail)

         //setToken()
         props.addToken(body.token)
         setUserExists(true)

      } else {
         setErrorsSignin(body.error)
      }
   }



   if (userExists) {
      return <Redirect to='/dashboardprofil' />
   }

   var tabErrorsSignin = listErrorsSignin.map((error, i) => {
      return (<p style={{ color: "red", fontStyle: "italic", fontWeight: "bold" }}>{error}</p>)
   })
   return (
      <>
         <Navsignin />
         <div className="bg-img">
            <div className="contenta">
               <header>Se Connecter</header>

               <div className="fielda">
                  <Icon icon="dashicons:email-alt" />
                  <input onChange={(e) => setSignInEmail(e.target.value)} type="email" required placeholder=" Email" />
               </div>
               <div className="fielda space">
                  <Icon icon="el:lock" />
                  <input onChange={(e) => setSignInPassword(e.target.value)} type={!passwordShown ? "password" : "text"} className="pass-key" required placeholder=" Mot de passe" />
                  <Icon onClick={togglePassword} className='showa' icon="bi:eye-fill" />
               </div>
               {tabErrorsSignin}
               <div className="passa">
                  <Link to=''>Mot de passe oublié?</Link>
               </div>
               <div className="fielda">
                  <input onClick={() => handleSubmitSignin()} type="submit" value="SE CONNECTER" />
               </div>

               {/* <div className="login">
          Ou se connecter avec
       </div>
       <div className="links">
          <div className="facebook">
          <Icon icon="bxl:facebook-circle" /><span className='span2'>Facebook</span>
          </div>
          <div className="instagram">
          <Icon icon="akar-icons:instagram-fill" /><span className='span2'>Instagram</span>
          </div>
       </div> */}
            </div>
         </div>
      </>

   );
}

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

export default connect(
   null,
   mapDispatchToProps
)(Login)

//recupération des réponse depuis le store lorsque le client clique sur se connecter 
// function mapStateToProps(state) {
//    console.log('state',state);
//    return { answer: state.answer,
//     }
//  }

//  export default connect(
//    mapStateToProps, 
//    null,
//  )(SignUp);


