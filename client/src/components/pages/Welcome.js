import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Welcome.css';
import Footer from '../utils/Footer';

class Welcome extends React.Component {
  render() {
    return (
      <div className="center">
        <h4>Welcome to the soccer bible</h4>
        <p>Select your favorite league</p>
        <Link to={'/MLS'}>
          <img
            className="emblem"
            src={process.env.PUBLIC_URL + '/images/logoMLS.png'}
            alt="background"
          />
        </Link>
        <Link to={'/EPL'}>
          <img
            className="emblem"
            src={process.env.PUBLIC_URL + '/images/logoPL.png'}
            alt="background"
          />
        </Link>
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
