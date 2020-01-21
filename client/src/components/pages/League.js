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
          <div>{this.renderTeam()}</div>
          <img
            className="team-logo"
            src={
              league.strBadge || process.env.PUBLIC_URL + '/images/logoBall.png'
            }
            alt="logo"
          />
          <img
            className="team-logo"
            src={
              league.strTrophy ||
              process.env.PUBLIC_URL + '/images/logoBall.png'
            }
            alt="logo"
          />
          <p>Name: {league.strLeague}</p>
          <p>Established: {league.intFormedYear}</p>
          <p>Location: {league.strCountry}</p>
          <a href={league.strWebsite}>website</a>
          <a ref={league.strFacebook} href={league.strFacebook}>
            facebook
          </a>
          <a href={league.strTwitter}>twitter</a>
          <p>{league.strDescriptionEN}</p>
          <img
            className="team-logo"
            src={
              league.strFanart1 ||
              process.env.PUBLIC_URL + '/images/logoBall.png'
            }
            alt="logo"
          />
          <img
            className="team-logo"
            src={
              league.strFanart2 ||
              process.env.PUBLIC_URL + '/images/logoBall.png'
            }
            alt="logo"
          />
          <img
            className="team-logo"
            src={
              league.strFanart3 ||
              process.env.PUBLIC_URL + '/images/logoBall.png'
            }
            alt="logo"
          />
          <img
            className="team-logo"
            src={
              league.strFanart4 ||
              process.env.PUBLIC_URL + '/images/logoBall.png'
            }
            alt="logo"
          />

          <img
            className="team-logo"
            src={
              league.strLogo || process.env.PUBLIC_URL + '/images/logoBall.png'
            }
            alt="logo"
          />
          <img
            className="team-logo"
            src={
              league.strPoster ||
              process.env.PUBLIC_URL + '/images/logoBall.png'
            }
            alt="logo"
          />
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
      <div className="custom-container">
        {this.renderLeagueDetails()}
        <div className="row center">
          <h4>All Teams</h4>
          {this.renderTeam()}
        </div>
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
