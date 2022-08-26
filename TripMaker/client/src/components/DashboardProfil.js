import Nav from "./Nav";
import FooterNoir from "./FooterNoir";
import { Button } from 'reactstrap'

import Navdash from "./Navdash";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

function DashboardProfil(props) {

    //stockage des resultat du quiz
    const [climat, setClimat] = useState("");
    const [continent, setContinent] = useState("");
    const [transport, setTransport] = useState("");
    const [activites, setActivites] = useState("");
    const [budget, setBudget] = useState("");
    const [totalResult, setTotalResult] = useState(0);

    //affichage du nom prenom sur la page profil
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = (props) => {
        setPasswordShown(!passwordShown);
    };

    useEffect(() => {

        async function loadData() {
            const response = await fetch("/users/dashboard", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `email=${props.mail}`,
            });

            const jsonResponse = await response.json();
            console.log(jsonResponse.user);
            setName(jsonResponse.user.firstName);
            setLastname(jsonResponse.user.lastName);
            setClimat(jsonResponse.user.reponseQuizz[0].climat);
            setContinent(jsonResponse.user.reponseQuizz[0].continent);
            setTransport(jsonResponse.user.reponseQuizz[0].transport);
            setActivites(jsonResponse.user.reponseQuizz[0].activites);
            setBudget(jsonResponse.user.reponseQuizz[0].budget);
        }

        async function loadCities() {
            const cities = await fetch("/quiz/result-quizz", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `email=${props.mail}`,
            });
            const citiesResponses = await cities.json();
            setTotalResult(citiesResponses.LongitudeEtLatitude.length);
            console.log(citiesResponses.LongitudeEtLatitude.length);
        }
        if (props.token) {


            loadData();
            loadCities();
        }

    }, []);

    console.log(name);
    console.log(lastname);

    // module de traduction
    const { t } = useTranslation();

    // quand le composant se lance, c'est la section profile qui est "active"

    const [profile, setProfile] = useState(true);
    const [wishlist, setWishlist] = useState(false);

    //  fonctions qui permettent de changer de section du menu dashboard
    var goProfile = () => {
        setProfile(true);
        setWishlist(false);
    };
    var goWishlist = () => {
        setProfile(false);
        setWishlist(true);
    };

    if (!props.token) {
        return (

            <Redirect to="/" />

        );
    } else {
        if (profile) {
            return (
                <div className="englobeurdashboard">

                    <div className="main-content">
                        <div className="container">


                            <div className="d-flex bg-white flex-row ">
                                <ul
                                    className="nav nav-tabs vertical-tab flex-column shadow stickyTa"
                                    id="myTab"
                                    role="tablist"
                                    style={{ paddingTop: 40, height: '100vh' }}
                                > <h1 className='logoD'><span className='logoC' >Trip</span>Maker</h1>
                                    <li className="nav-item" style={{ paddingTop: 40 }}>
                                        <Button
                                            onClick={() => goProfile()}
                                            className="nav-link active button"
                                        >
                                            <div className="circle-icon d-flex align-items-center justify-content-center mr-3">
                                                <Icon icon="ant-design:home-filled" />
                                            </div>
                                            <h5 className="mb-0">Profil</h5>
                                        </Button>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/wishlist"
                                            style={{ textDecoration: "none", padding: "0px" }}
                                        > <Button
                                            className="nav-link button"
                                        >
                                                <div className="circle-icon d-flex align-items-center justify-content-center mr-3">
                                                    <Icon icon="bi:heart-fill" />
                                                </div>

                                                <h5 className="mb-0"> Wishlist</h5>
                                            </Button></Link>
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
                                {/* affichage du contenu des sections du dashboard (partie droite) */}
                                <div className="tab-content p-5" id="myTabContent">
                                    {/* première section active (profil), qui permet au css de colorier la section en verte */}
                                    <div
                                        className="tab-pane fade show active"
                                        id="tab1"
                                        role="tabpanel"
                                        aria-labelledby="tab-one"
                                    >
                                        <div className="d-flex align-items-center mb-3">
                                            <img
                                                src="./images/profil.jpg"
                                                alt="Imagenature2"
                                                className="wid-250 rounded-lg mb-3 mr-3"
                                            />
                                            <div>
                                                <h3>
                                                    Bonjour {name} {lastname}
                                                </h3>
                                                <p>
                                                    Bienvenue sur votre dashboard. Ici vous avez accés aux réponses de votre quiz.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="resume">
                                            <span >Voici un petit résumé de vos réponses</span>
                                            
                                            <div className="card mb-3" style={{ maxWidth: '940px' , marginTop: "40px"}}>
                                                <div className="row no-gutters">
                                                    <p className="resumetitre">

                                                    </p>
                                                    <div className="col-md-3">
                                                        <div className="card-body">
                                                            <p className="card-text">Quel climat préférez vous?{" "} </p>
                                                            <p className="card-text"><span>{climat}</span> </p>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="card-body">
                                                            <p className="card-text">Quel continent voulez vous visiter?{" "}  </p>
                                                            <p className="card-text"><span>{continent}</span></p>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="card-body">
                                                            <p className="card-text">Quel est votre <br /> budget? {" "}</p>
                                                            <p className="card-text"><span>{budget}</span></p>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="card-body">
                                                            <p className="card-text">Quel serait le moyen de transport idéal?{" "} </p>
                                                            <p className="card-text"><span>{transport}</span></p>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="card-body">
                                                            <p className="card-text"> Quel type d'activité recherchez vous?{" "} </p>
                                                            <p className="card-text"><span>{activites}</span></p>

                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                           
                                           

                                            <div style={{textAlign: "right"}}>
                                                <p>Nous avons trouvé un total de </p>{" "}
                                                {/* //console.log(object) */}
                                                <span> {totalResult} villes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        } else if (wishlist) {
            return (
                <div className="englobeurdashboard">
                    <Navdash />
                    <div className="main-content">
                        <div className="container">
                            <h1 className="text-center text-uppercase">
                                <span classNameName="logoa"> DASH</span>BOARD
                            </h1>
                            <br></br>

                            <div className="d-flex bg-white flex-row shadow">
                                <ul
                                    className="nav nav-tabs vertical-tab flex-column shadow"
                                    id="myTab"
                                    role="tablist"
                                >
                                    <li className="nav-item">
                                        <Button
                                            onClick={() => goProfile()}
                                            className="nav-link button"

                                        >
                                            <div className="circle-icon d-flex align-items-center justify-content-center mr-3">
                                                <Icon icon="ant-design:home-filled" />
                                            </div>
                                            <h5 className="mb-0">Profil</h5>
                                        </Button>
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
                                </ul>
                                {/* affichage du contenu des sections du dashboard (partie droite) */}
                                <div className="tab-content p-5" id="myTabContent">
                                    {/* deuxième section active (wishlist), qui permet au css de colorier la section en verte */}
                                    <div
                                        className="tab-pane fade show active"
                                        id="tab2"
                                        role="tabpanel"
                                        aria-labelledby="tab-two"
                                    >
                                        <h3>Votre Wishlist:</h3>
                                        <div className="card mb-3" style={{ maxWidth: "940px" }}>
                                            <div className="row no-gutters">
                                                <div className="col-md-4">
                                                    <img
                                                        src="./images/tour3.jpg"
                                                        className="card-img"
                                                        alt="..."
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Paris</h5>
                                                        <p className="card-text">Date: 13/10/2022</p>
                                                        <p className="card-text">Nombre de personnes: 3</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterNoir />
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    console.log('state', state)
    //console.log('state',state);
    return {
        mail: state.mail,
        token: state.token
    }
}

export default connect(
    mapStateToProps,
    null,
)(DashboardProfil);

