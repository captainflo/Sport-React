import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Soccer.css';
class Squad extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row center">
          <h4>Soccer Leagues</h4>
          <div className="col m3 s6">
            <Link to={'/league/4346'}>
              <img
                className="logo-soccer-league hoverable"
                src={process.env.PUBLIC_URL + '/images/mls.png'}
                alt="logo"
              />
            </Link>
          </div>
          <div className="col m3 s6">
            <Link to={'/league/4328'}>
              <img
                className="logo-soccer-league hoverable"
                src={process.env.PUBLIC_URL + '/images/EPL.png'}
                alt="logo"
              />
            </Link>
          </div>
          <div className="col m3 s6">
            <Link to={'/league/4335'}>
              <img
                className="logo-soccer-league-liga hoverable"
                src={process.env.PUBLIC_URL + '/images/spain.png'}
                alt="logo"
              />
            </Link>
          </div>
          <div className="col m3 s6">
            <Link to={'/league/4334'}>
              <img
                className="logo-soccer-league hoverable"
                src={process.env.PUBLIC_URL + '/images/ligue1.png'}
                alt="logo"
              />
            </Link>
          </div>
        </div>
        <div className="row center">
          <div className="col m3 s6">
            <Link to={'/league/4331'}>
              <img
                className="logo-soccer-league hoverable"
                src={process.env.PUBLIC_URL + '/images/bundesliga.png'}
                alt="logo"
              />
            </Link>
          </div>
          <div className="col m3 s6">
            <Link to={'/league/4332'}>
              <img
                className="logo-soccer-league hoverable"
                src={process.env.PUBLIC_URL + '/images/seria.png'}
                alt="logo"
              />
            </Link>
          </div>
          <div className="col m3 s6">
            <Link to={'/league/4344'}>
              <img
                className="logo-soccer-league hoverable"
                src={process.env.PUBLIC_URL + '/images/ligaNos.png'}
                alt="logo"
              />
            </Link>
          </div>
          <div className="col m3 s6">
            <Link to={'/league/4337'}>
              <img
                className="logo-soccer-league hoverable"
                src={process.env.PUBLIC_URL + '/images/eredivisie.png'}
                alt="logo"
              />
            </Link>
          </div>
        </div>
        <button
          className="btn right back-return"
          onClick={this.props.history.goBack}
        >
          <i className="far fa-arrow-alt-circle-left"></i> Return
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps, actions)(Squad);
