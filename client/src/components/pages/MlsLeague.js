import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/MlsLeague.css';

class Welcome extends React.Component {
  componentDidMount() {
    this.props.competition('MLS');
  }

  renderTeam = () => {
    if (this.props.teams !== undefined) {
      return this.props.teams.map(team => {
        return (
          <div key={team.Name}>
            <img className="" src={team.WikipediaLogoUrl} />
            <p>{team.Name}</p>
          </div>
        );
      });
    } else {
      return (
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    console.log(this.props.teams);
    return (
      <div>
        <p>MLS League</p>
        <img
          className="emblem"
          src={process.env.PUBLIC_URL + '/images/logoMLS.png'}
          alt="background"
        />
        <p>Team</p>
        {this.renderTeam()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    teams: state.league.MLS.Teams
  };
}
export default connect(mapStateToProps, actions)(Welcome);
