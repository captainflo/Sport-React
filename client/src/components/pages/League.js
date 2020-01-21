import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/League.css';

class League extends React.Component {
  componentDidMount() {
    this.props.leagueDetails(this.props.match.params.league);
    this.props.competition(this.props.match.params.league);
  }

  renderLeagueDetails = () => {
    if (this.props.Details !== undefined) {
      const league = this.props.Details[0];
      return (
        <div>
          <div className="row">
            <div className="col m3 s12">
              <div className="card">
                <div className="card-custom">
                  <img
                    className="logo-league"
                    src={
                      league.strBadge ||
                      process.env.PUBLIC_URL + '/images/logoBall.png'
                    }
                    alt="logo"
                  />
                  <hr></hr>
                  <p>Name: {league.strLeague}</p>
                  <p>Established: {league.intFormedYear}</p>
                  <p>Location: {league.strCountry}</p>
                  <p>
                    <a
                      href={'https://' + league.strWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-laptop"></i> {league.strLeague}
                    </a>
                  </p>
                  <p>
                    <a
                      href={'https://' + league.strFacebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-square"></i> Facebook
                    </a>
                  </p>
                  <p>
                    <a
                      href={'https://' + league.strTwitter}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="fab fa-twitter-square"></i> Twitter
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col m9 s12">
              <div className="text-details">
                <img
                  className="trophy"
                  src={
                    league.strTrophy ||
                    process.env.PUBLIC_URL + '/images/logoBall.png'
                  }
                  alt="logo"
                />
                <p>{league.strDescriptionEN}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  renderTeam = () => {
    if (this.props.league !== undefined) {
      return this.props.league.map(team => {
        return (
          <Link key={team.idTeam} to={`/team/${team.idTeam}`}>
            <img
              className="team-logo hoverable"
              src={
                team.strTeamBadge ||
                process.env.PUBLIC_URL + '/images/logoBall.png'
              }
              alt="logo"
            />
          </Link>
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
      <div>
        <div className="banner-team center">{this.renderTeam()}</div>
        <div className="custom-container">{this.renderLeagueDetails()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    auth: state.auth.authenticated,
    league: state.league.league.teams,
    Details: state.league.leagueDetails.leagues
  };
}
export default connect(mapStateToProps, actions)(League);
