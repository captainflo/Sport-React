import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Squad from './Squad';
import '../css/Team.css';

class Team extends React.Component {
  componentDidMount() {
    this.props.teamDetail(this.props.match.params.id);
  }

  renderTeamDetails = () => {
    if (this.props.teams !== undefined) {
      return this.props.teams.map(team => {
        return (
          <div key={team.idTeam}>
            <div className="row">
              <div className="col s12 m7">
                <div style={{ marginTop: '10px' }}>
                  <img
                    className="team-logo right"
                    src={
                      team.strTeamJersey ||
                      process.env.PUBLIC_URL + '/images/logoBall.png'
                    }
                    alt="jersey"
                  />
                  <img
                    className="team-logo-details"
                    src={
                      team.strTeamBadge ||
                      process.env.PUBLIC_URL + '/images/logoBall.png'
                    }
                    alt="badge"
                  />
                </div>

                <p>Name: {team.strTeam}</p>
                <p>creation: {team.intFormedYear}</p>
                <p>League: {team.strLeague}</p>
                <p>Country: {team.strCountry}</p>
                <p className="team-text">{team.strDescriptionEN}</p>
              </div>
              <div className="col s12 m5 right">
                <div className="card hoverable">
                  <div className="card-image">
                    <img
                      className=""
                      src={
                        team.strStadiumThumb ||
                        process.env.PUBLIC_URL + '/images/logoBall.png'
                      }
                      alt="stadium"
                    />
                    <span className="card-title black">{team.strStadium}</span>
                  </div>
                  <div className="card-content stadium-text">
                    {team.strStadiumDescription}
                  </div>
                  <div className="card-action">
                    <a href={team.strWebsite}>{team.strWebsite}</a>
                  </div>
                </div>
              </div>
            </div>
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
      <div className="custom-container">
        <button className="btn" onClick={this.props.history.goBack}>
          <i className="far fa-arrow-alt-circle-left"></i> Return
        </button>
        {this.props.teams ? this.renderTeamDetails() : ''}
        <h4>Squad</h4>
        {this.props.teams ? <Squad team={this.props.teams[0].strTeam} /> : ''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    teams: state.league.teamDetails.teams
  };
}
export default connect(mapStateToProps, actions)(Team);
