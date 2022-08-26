import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import Navdash from './Navdash'
import FooterNoir from './FooterNoir';
import { connect } from 'react-redux';
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { Link, Redirect } from "react-router-dom";






function DashBoardWishes(props) {
  

  //affichage du nom prenom sur la page profil
  const [userTripLiked, setUserTripLiked] = useState([])

  //console.log(props.token)
  console.log("consol log du props . token ", props.token)


  var deleteToWishList = async (id) => {

    const deleteWish = await fetch(`/wishlist`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${props.mail}&id=${id}`
    })

    var datadeletewishlist = await deleteWish.json()
    console.log(datadeletewishlist)

    //setUserTripLiked()

    if (datadeletewishlist.result == true) {
      var newtabwish = []

      newtabwish = [...userTripLiked]
      console.log("newtabwish", newtabwish)
      //   console.log(newtabwish)
      newtabwish = newtabwish.filter((e) => e._id !== id)

      setUserTripLiked(newtabwish)

    }

  }


  const [profile, setProfile] = useState(true);
  const [wishlist, setWishlist] = useState(false);



  var goProfile = () => {
    setProfile(true);
    setWishlist(false);
  };
  var goWishlist = () => {
    setProfile(false);
    setWishlist(true);
  };
  // console.log("props.mail", props.mail)



  useEffect(() => {
    async function loadData() {
      const response = await fetch("/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${props.mail}`,
      });
      const jsonResponse = await response.json();
      console.log("jsonResponse", jsonResponse);



      setUserTripLiked(jsonResponse.userWishlist)


    }
    if(props.token) {

    loadData()
    }
  }, [])


  if(!props.token) {
    console.log("je suis dans le if du token")
    return (

      <Redirect to="/"/>
      
    );
  }else{
    console.log("je suis dans le else apres token")
  var wishesCard = userTripLiked.map((wish, i) => {
    // console.log("FIRED wish----->", wish);
    var wishDesc = wish.Description
    if(wishDesc.length > 120){
      wishDesc = wishDesc.slice(0,120)+'...'
    }
    return (
      <div className="card mb-3" style={{ maxWidth: '940px' }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={wish.Photo} className="card-img" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title"><strong>{wish.Name}</strong></h5>
              <p className="card-text">{wishDesc}</p>
              <p className="card-text"><strong>Climat :</strong> {wish.Climat} | <strong>Temps :</strong> {wish.Temps} | <strong>Température :</strong> {wish.Temperature}°</p>
              <p className="card-text">
              <Icon icon="fa6-regular:trash-can" color="#14947c" cursor="pointer" onClick={() => deleteToWishList(wish._id)}>
                  Retirer de la Wishlist
                </Icon>
                </p>
            </div>
          </div>
        </div>
      </div>
    )
  })


  return (
    <div className="englobeurdashboard">
      
      <div className="main-content">
        <div className="container">
          
          

          <div className="d-flex bg-white flex-row ">
            <ul
              className="nav nav-tabs vertical-tab flex-column shadow stickyTa"
              id="myTab"
              role="tablist"
              style={{paddingTop:40, height:'100vh',}}
            > <h1 className='logoD'><span className='logoC' >Trip</span>Maker</h1>
              <li className="nav-item" style={{paddingTop:40}}>
                <Link
                  to="/dashboardprofil"
                  style={{ textDecoration: "none", padding: "0px" }}
                ><Button

                  className="nav-link button"

                >
                    <div className="circle-icon d-flex align-items-center justify-content-center mr-3">
                      <Icon icon="ant-design:home-filled" />
                    </div>
                    <h5 className="mb-0">Profil</h5>
                  </Button></Link>
              </li>
              <li className="nav-item">
                <Button
                  onClick={() => goWishlist()}
                  className="nav-link active button"

                >
                  <div className="circle-icon d-flex align-items-center justify-content-center mr-3">
                    <Icon icon="bi:heart-fill" />
                  </div>
                  <h5 className="mb-0"> Wishlist</h5>
                </Button>
              </li>
              <li className="nav-item">
                <Link
                  to="/resultat"
                  style={{ textDecoration: "none", padding: "0px" }}
                >
                  <Button
                    className="nav-link button"

                  >
                    <div className="circle-icon d-flex align-items-center justify-content-center mr-3">
                      <Icon icon="bi:pin-map-fill" />
                    </div>

                    <h5 className="mb-0">Map résultats </h5>
                  </Button>
                </Link>
              </li>
              <li className="nav-item">
                                    <Link
                                        to="/"
                                        style={{ textDecoration: "none", padding: "0px" }}
                                    >
                                        <Button
                                            className="nav-link button"
                                        >
                                            <div className="circle-icon d-flex align-items-center justify-content-center mr-3">
                                            <Icon icon="bx:home-smile" />

                                            </div>

                                            <h5 className="mb-0">Accueil </h5>
                                        </Button>
                                    </Link>
                                    
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="/"
                                        style={{ textDecoration: "none", padding: "0px" }}
                                    >
                                        <Button
                                            className="nav-link button"
                                        >
                                            <div className="circle-icon d-flex align-items-center justify-content-center mr-3">
                                            <Icon icon="ant-design:logout-outlined" />


                                            </div>

                                            <h5 className="mb-0">Deconnexion </h5>
                                        </Button>
                                    </a>
                                    
                                </li>
            </ul>

            <div className="tab-content p-5" id="myTabContent">

              <div
                className="tab-pane fade show active"
                id="tab2"
                role="tabpanel"
                aria-labelledby="tab-two"
              >
               
                {wishesCard}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }
  }
  




function mapStateToProps(state) {
  //console.log('state',state);
  return {
    mail: state.mail,
    token: state.token
  }
}

export default connect(
  mapStateToProps,
  null,
)(DashBoardWishes);