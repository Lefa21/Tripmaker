import React ,{useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import {GoogleMap, useLoadScript, Marker ,MarkerClusterer} from "@react-google-maps/api";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import {connect} from 'react-redux';
import { Icon } from '@iconify/react';

function MapResult(props) {

  console.log(props.token)

// Config map initiale
     
  const [latContinent, setLatContinent]=useState(16.04688165093306) 
  const [lngContinent, setLngContinent]=useState(12.509864833461625)
  const [zoomInitial, setZoomInitial]=useState(3)

// map auto-centre

  const centerContinent = {lat:latContinent, lng:lngContinent} 
    
// Longitudes et latitudes

  const [latLngVilles2, setLatLngVilles2]=useState([])

// Marqueurs & clusters

  const [villesMarker, setVillesMarker] = useState()

  const [loadData,setLoadData] = useState(false)
  
// modale

  const [modalTitle, setModalTitle]=useState('')
  const [modalDesc,setModalDesc] = useState("")
  const [modalPhotoUrl,setModalPhotoUrl] = useState("")
  const [modalTemperature,setModalTemperature] = useState("")
  const [modalTemps,setModalTemps] = useState("")
  const [modalContinent,setModalContinent] = useState("")
  const [modalClimat,setModalClimat] = useState("")

//ouverture modale

  const [modal, setModal] = useState(false);

// Like

  const [isLike, setIsLike]= useState(false);
  const [iconSetter,SetIconSetter]= useState("akar-icons:heart");

  // const [buttonLiked,setButtonLiked]= useState(false)
  // const [buttonText,setButtonText]= useState("Like")

// Spinner

  const [spinnerLoadingReact, SetSpinnerLoadingReact] = useState(
    <div style={{display:'flex', alignItems:'center', justifyContent:'center' }}>
      <Spinner color="success" style={{height: '3rem', width: '3rem', marginTop:350}}></Spinner>
    </div>
  );

// Détection des clics et ouverture/fermeture modale

  const onClickOnAnything = async () =>{
    
    if (modalTitle==undefined) {
      setModal(false)
      setIsLike(false)
      SetIconSetter("akar-icons:heart")
    }
    
  }

  const onClickOnAddWishes = async () => {
    
    const response = await fetch("/addToWishList", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${props.mail}&name=${modalTitle}&description=${modalDesc}&lng=${lngContinent}&lat=${latContinent}&photo=${modalPhotoUrl}&temperature=${modalTemperature}&temps=${modalTemps}&climat=${modalClimat}&continent=${modalContinent}`
    });
    
    if(isLike==false){
      SetIconSetter("ant-design:heart-filled")
      setIsLike(true)
    }
    
    if(isLike==true){
      setIsLike(false)
      SetIconSetter("akar-icons:heart")
    }
    
  }

  const onClickOnMarker = marker => {

    if (marker.name==undefined) {
      setModal(false)
      setIsLike(false)
      SetIconSetter("akar-icons:heart")
    } 
    
    else {
      setLatContinent(marker.lat)
      setLngContinent(marker.lng)
      setModalDesc(marker.description)
      setModalTitle(marker.name)
      setModalPhotoUrl(marker.photo)
      setModalTemperature(marker.temperature)
      setModalTemps(marker.temps)
      setModal(true);
    }
  }

  const onClickOnCloseModal = () => {

    setModal(false)
    setIsLike(false)
    SetIconSetter("akar-icons:heart")
   
  }

// redirection

  const [redirect, setRedirect]=useState(false)

    // j'appelle la route en back qui contient l'algo pour récupérer les lng/lat

    useEffect(() => {
      async function loadData() {
        const response = await fetch("/quiz/result-quizz", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `email=${props.mail}`,
        });

        const jsonResponse = await response.json();

        setLatLngVilles2(jsonResponse.LongitudeEtLatitude);
        setModalContinent(jsonResponse.continent)
        setModalClimat(jsonResponse.climat)
       
        // j'affiche les marqueurs sur la map

          var villesMarkerCluster = latLngVilles2.map((position,i) => {

            return (
                <MarkerClusterer >
                    {(clusterer) => latLngVilles2.map((location) => (
                       
                        <Marker key={createKey(location)} position={location} clusterer={clusterer} onClick={()=>onClickOnMarker(location)} />
                       
                        ))
                }

                </MarkerClusterer>
                    )
                })
    
                setVillesMarker(villesMarkerCluster)
                setLoadData(true)
                
                if (latLngVilles2==[]) {
                  console.log("waiting");
                }
          
                else {
                  setLatContinent(latLngVilles2[0].lat)
                  setLngContinent(latLngVilles2[0].lng)
                  setZoomInitial(4)
                  SetSpinnerLoadingReact("")
                }
      }

    if(props.token){
      loadData();
    }
       
      
      
    }, [loadData]);

// Lon + lat

  function createKey(latLngVilles2) {
        return latLngVilles2.lon + latLngVilles2.lat
      }
 
// config Gmaps /!\ ne rien toucher /!\

  const {isLoaded} = useLoadScript({
      googleMapsApiKey: "AIzaSyB3fK9uMMXzBSCXVY_7eaIa518yJzDzzms", //process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY --> Ne pas laisser en front, utiliser variable d'environnement
  });

  if (!isLoaded) return <div>Loading ...</div>

// redirection
    
  var RedirectOnClic = (token) => {
    props.addToken(token)
    setRedirect(true)
  }

  if(redirect){
    return(<Redirect to='/wishlist' />)
  }
  
  if(!props.token) {
    return (
    
      <Redirect to="/"/>
      
    );
  }else{
    return (

       <GoogleMap 
              zoom={zoomInitial}
              options = {{ minZoom:3, maxZoom:14 }}
              center={centerContinent} 
              mapContainerClassName="map-container"
          > 
          {villesMarker}
          
            <Modal isOpen={modal} toggle={onClickOnMarker} onClick={()=> onClickOnAnything()} >
              <ModalHeader 
              toggle={onClickOnCloseModal}><strong>{modalTitle}</strong>
              </ModalHeader>
              <ModalBody>
                <img src={modalPhotoUrl} className="card-img" alt="..." />
              </ModalBody>
              <ModalFooter>{modalDesc}</ModalFooter>
              <ModalFooter style={{display:'flex',justifyContent:'center'}}>
              <strong>Climat :</strong> {modalClimat} | <strong>Température :</strong> {modalTemperature}° | <strong>Temps :</strong> {modalTemps}
              </ModalFooter>
              <ModalFooter>
                <Icon 
                  icon={iconSetter} color="#14947c" width="30" onClick={() => onClickOnAddWishes()} cursor='pointer' >
                </Icon>
                <Button color="success" outline onClick={() => RedirectOnClic(props.token)}>
                  Voir ma wishlist
                </Button>
              </ModalFooter>
            </Modal>
          
          {spinnerLoadingReact}
          
        </GoogleMap>   
    ) ;
}}

function mapStateToProps(state) {
    console.log('state',state)
    //console.log('state',state);
    return { mail: state.mail,
        token: state.token
     }
  }

  function mapDispatchToProps(dispatch) {
    return {
       addToken: function (token) {
          dispatch({ type: 'addToken', token: token })
       },
 
      
    }
 }
 
 
  export default connect(
    mapStateToProps, 
    mapDispatchToProps,
  )(MapResult);