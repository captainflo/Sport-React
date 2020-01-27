import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Squad from './Squad';
import '../css/Team.css';
import Schedule from './Schedule';

class Team extends React.Component {
  componentDidMount() {
    this.props.teamDetail(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.teamDetail(this.props.match.params.id);
    }
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
                    className="jersey right"
                    src={
                      team.strTeamJersey ||
                      process.env.PUBLIC_URL + '/images/jersey.png'
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
                <p>Established: {team.intFormedYear}</p>
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
                        process.env.PUBLIC_URL + '/images/stadium.png'
                      }
                      alt="stadium"
                    />
                    <span className="card-title black">{team.strStadium}</span>
                  </div>
                  <div className="card-content stadium-text">
                    {team.strStadiumDescription}
                  </div>
                  <div className="card-action">
                    <a
                      href={'https://' + team.strWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-laptop"></i> {team.strTeam}
                    </a>
                    <span>Capacity: {team.intStadiumCapacity}</span>
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
        <button
          className="btn right back-return hide-on-small-and-down"
          onClick={this.props.history.goBack}
        >
          <i className="far fa-arrow-alt-circle-left"></i> Return
        </button>

        {this.props.teams ? (
          <div>
            {this.renderTeamDetails()}
            <h4>Schedule</h4>
            <Schedule
              team={this.props.teams[0].idTeam}
              idLeague={this.props.teams[0].idLeague}
            />
            <h4>Squad</h4>
            <Squad team={this.props.teams[0].strTeam} />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teams: state.league.teamDetails.teams
  };
}
export default connect(mapStateToProps, actions)(Team);
