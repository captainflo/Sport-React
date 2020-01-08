import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/League.css';

class League extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.competition(this.props.match.params.league);
  }

  renderTeam = () => {
    if (this.props.teams !== undefined) {
      return this.props.teams.map(team => {
        return (
          <div key={team.Name}>
            <img
              className="team-logo"
              src={
                team.WikipediaLogoUrl ||
                process.env.PUBLIC_URL + '/images/logoBall.png'
              }
              alt="logo"
            />
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
    return (
      <div className="center">
        <h3>{this.props.league}</h3>
        <p>{this.props.teams ? this.props.teams.length : ''} Teams</p>
        {this.renderTeam()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    league: state.league.league.Name,
    teams: state.league.league.Teams
  };
}
export default connect(mapStateToProps, actions)(League);
