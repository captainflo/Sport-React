import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Welcome.css';
import Footer from '../utils/Footer';
import Slider from '../utils/Slider';

class Welcome extends React.Component {
  render() {
    return (
      <div className="center">
        <Slider />
        <h5>Select your favorite Sport</h5>
        <div className="box-sport-logo">
          <Link to={'/soccer'}>
            <i className="far fa-futbol logo-sport hoverable"></i>
            <p>Soccer</p>
          </Link>
          <Link to={'/league/4387'}>
            <i className="fas fa-basketball-ball logo-sport hoverable"></i>
            <p>Basketball</p>
          </Link>
          <Link to={'/league/4391'}>
            <i className="fas fa-football-ball logo-sport hoverable"></i>
            <p>Football</p>
          </Link>
          <Link to={'/league/4424'}>
            <i className="fas fa-baseball-ball logo-sport hoverable"></i>
            <p>Baseball</p>
          </Link>
          <Link to={'/league/4380'}>
            <i className="fas fa-hockey-puck logo-sport hoverable"></i>
            <p>Hockey</p>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated
  };
}
export default connect(mapStateToProps, actions)(Welcome);
