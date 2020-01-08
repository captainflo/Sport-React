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
        <div className="banner">
          <div className="container">
            <h1>Soccer bible</h1>
            <p>Everything you need to know</p>
            <a className="btn btn-flat" href="/">
              Apply now
            </a>
          </div>
        </div>
        <p>Select your favorite league</p>
        <Link to={'/league/MLS'}>
          <img
            className="emblem"
            src={process.env.PUBLIC_URL + '/images/logoMLS.png'}
            alt="background"
          />
        </Link>
        <Link to={'/league/EPL'}>
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
