
// import FooterNoir from './FooterNoir';

// import Navdash from './Navdash'
// import { Button } from 'reactstrap';

// import React, { useState, useEffect } from 'react'
// import { Icon } from '@iconify/react';
// //import { useTranslation } from 'react-i18next'
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';


// function Dash(props) {

//   //affichage du nom prenom sur la page profil
//   // const [name, setName] = useState("")
//   // const [lastname, setLastname] = useState("")



//   // useEffect(() => {
//   //   async function loadData() {
//   //     const response = await fetch("/users/dashboard", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//   //       body: `email=${props.mail}`,
//   //     });

//   //     const jsonResponse = await response.json();
//   //     console.log(jsonResponse.user)
//   //     setName(jsonResponse.user.firstName)
//   //     setLastname(jsonResponse.user.lastName)
//   //   }

//   //   loadData()
//   // }, [])


//   // console.log(name)
//   // console.log(lastname)

//   // module de traduction
//   //const { t, } = useTranslation();

//   // quand le composant se lance, c'est la section profile qui est "active"

//   const [profile, setProfile] = useState(false)
//   const [wishlist, setWishlist] = useState(false)


//   //  fonctions qui permettent de changer de section du menu dashboard
//   var goProfile = () => {
//     setProfile(true)
//     setWishlist(false)

//   }

//   if (profile) {

//     return (
//       <Redirect to="/dashboardprofil" />

//     )

//   }
//   var goWishlist = () => {
//     setProfile(false)
//     setWishlist(true)

//   }

//   if (wishlist) {

//     return (
//       <Redirect to="/wishlist" />
//     )

//   }


//   // if (profile) {
//   return (
//     <div className='englobeurdashboard'>
//       <Navdash />
//       <div className="main-content">
//         <div className="container">
//           <h1 className="text-center text-uppercase"><span classNameName='logoa'> DASH</span>BOARD</h1>
//           <br></br>

//           <div className="d-flex bg-white flex-row shadow">
//             <ul className="nav nav-tabs vertical-tab flex-column shadow" id="myTab" role="tablist">
//               <li className="nav-item">
//                 <Button onClick={() => goProfile()} className="nav-link active button" id="tab-one" data-toggle="tab" >
//                   <div className="circle-icon d-flex align-items-center justify-content-center mr-3">
//                     <Icon icon="ant-design:home-filled" />
//                   </div>
//                   <h5 className="mb-0" >Profil</h5>
//                 </Button>
//               </li>
//               <li className="nav-item">
//                 <Button onClick={() => goWishlist()} className="nav-link button" id="tab-two" data-toggle="tab" role="tab" aria-controls="tab2" aria-selected="false">
//                   <div className="circle-icon d-flex align-items-center justify-content-center mr-3">
//                     <Icon icon="bi:heart-fill" />
//                   </div>

//                   <h5 className="mb-0" > Wishlist</h5>
//                 </Button>
//               </li>
//               <li className="nav-item">
//                 {/* <Link to='/resultat' style={{ textDecoration: 'none', padding: '0px' }}> */}
//                   <Button className="nav-link button" id="tab-three" data-toggle="tab" role="tab" aria-controls="tab3" aria-selected="false">
//                   <div className="circle-icon d-flex align-items-center justify-content-center mr-3">
//                     <Icon icon="bi:pin-map-fill" />
//                   </div>

//                   <h5 className="mb-0">Map résultats </h5>
//                 </Button>
//                 {/* </Link> */}
//               </li>
//             </ul>
//             {/* affichage du contenu des sections du dashboard (partie droite) */}

//           </div>

//         </div>
//       </div>
//       <FooterNoir />
//     </div>
//     // <div className='englobeurdashboard'>
//     //   <Navdash />
//     //   <div className="main-content">
//     //     <div className="container">
//     //       <Card
//     //         className="my-2 text-center"

//     //         style={{
//     //           width: '18rem'
              
//     //         }}
//     //       >
//     //         <CardHeader>
//     //           Header
//     //         </CardHeader>
//     //         <CardBody >
//     //           <CardTitle tag="h5">
//     //             <div className="circle-icon d-flex align-items-center justify-content-center mr-3">
//     //               <Icon icon="ant-design:home-filled" />
//     //             </div>
               
//     //           </CardTitle>
//     //           <CardText>
//     //             Mon Profil
//     //           </CardText>
//     //           <Button onClick={() => goProfile()}>
//     //             Profil
//     //           </Button>
//     //         </CardBody>
//     //         <CardFooter>
//     //           Footer
//     //         </CardFooter>
//     //       </Card>
//     //     </div>
//     //   </div>
//     // </div>
//   )

// }

// // }


// function mapStateToProps(state) {
//   //console.log('state', state)
//   //console.log('state',state);
//   return {
//     mail: state.mail,
//     token: state.token
//   }
// }

// export default connect(
//   mapStateToProps,
//   null,
// )(Dash);



// // export default Test;