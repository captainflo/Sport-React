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
            <p>Everything you need to know!</p>
          </div>
        </div>
        <h5>Select your favorite league</h5>
        <div className="league-link">
          <Link to={'/league/4346'}>
            <img
              className="emblem"
              src={process.env.PUBLIC_URL + '/images/logoMLS.png'}
              alt="background"
            />
          </Link>
          <Link to={'/league/4328'}>
            <img
              className="emblem"
              src={process.env.PUBLIC_URL + '/images/logoPL.png'}
              alt="background"
            />
          </Link>
          <Link to={'/league/4334'}>
            <img
              className="emblem"
              src={process.env.PUBLIC_URL + '/images/ligue1.png'}
              alt="background"
            />
          </Link>
          <Link to={'/league/4335'}>
            <img
              className="emblem"
              src={process.env.PUBLIC_URL + '/images/laliga.png'}
              alt="background"
            />
          </Link>
          <Link to={'/league/4332'}>
            <img
              className="emblem"
              src={process.env.PUBLIC_URL + '/images/seria.png'}
              alt="background"
            />
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
