import React from 'react';
import Nav from './Nav';
import Navdash from './Navdash'
import Footer from '../components/Footer';
import QuestionAccueil from './QuestionAccueil';
import DestinationCles from './DestinationCles';
import { connect } from 'react-redux';


function Homescreen(props) {

  console.log(props.token)
  if(!props.token) {
    return (
    
      <div>
        <Nav />
        <QuestionAccueil />
        <DestinationCles/>
        <Footer />
      </div>
      
    );
  } else {
    return (
    
      <div>
        <Navdash />
        <QuestionAccueil />
        <DestinationCles/>
        <Footer />
      </div>
      
    );
  }
}
// export default Homescreen;
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
)(Homescreen);
