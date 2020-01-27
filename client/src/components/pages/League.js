import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/League.css';
import NewsLeague from './NewsLeague';

class League extends React.Component {
  componentDidMount() {
    this.props.tableLeague(this.props.match.params.league);
    this.props.leagueDetails(this.props.match.params.league);
    this.props.competition(this.props.match.params.league);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.league !== prevProps.match.params.league) {
      this.props.tableLeague(this.props.match.params.league);
      this.props.leagueDetails(this.props.match.params.league);
      this.props.competition(this.props.match.params.league);
    }
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

  renderImage = id => {
    if (this.props.league !== undefined) {
      for (let i = 0; i < this.props.league.length; i++) {
        const idTeam = this.props.league[i].idTeam;
        if (id === idTeam) {
          return (
            <Link to={`/team/${idTeam}`}>
              <img
                className="team-logo-table hoverable"
                src={
                  this.props.league[i].strTeamBadge ||
                  process.env.PUBLIC_URL + '/images/logoBall.png'
                }
                alt="jersey"
              />
            </Link>
          );
        }
      }
    }
  };

  renderTableLeague = () => {
    if (this.props.tables !== undefined) {
      return this.props.tables.map(table => {
        return (
          <tr key={table.teamid}>
            <td>{this.renderImage(table.teamid)}</td>
            <td>{table.name}</td>
            <td>{table.played}</td>
            <td>{table.goalsfor}</td>
            <td>{table.goalsagainst}</td>
            <td>{table.goalsdifference}</td>
            <td>{table.win}</td>
            <td>{table.draw}</td>
            <td>{table.loss}</td>
            <td>{table.total}</td>
          </tr>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <div className="banner-team center">{this.renderTeam()}</div>
        <button
          className="btn right back-return hide-on-small-and-down"
          onClick={this.props.history.goBack}
        >
          <i className="far fa-arrow-alt-circle-left"></i> Return
        </button>
        <div className="custom-container">
          {this.renderLeagueDetails()}
          <NewsLeague idLeague={this.props.match.params.league} />
          <div>
            {this.props.match.params.league !== '4346' &&
            this.props.match.params.league !== '4387' &&
            this.props.match.params.league !== '4391' &&
            this.props.match.params.league !== '4424' &&
            this.props.match.params.league !== '4380' &&
            this.props.tables ? (
              <div>
                <h4>Table Season</h4>
                <table className="table-league centered responsive-table">
                  <thead>
                    <tr>
                      <th>Emblem</th>
                      <th>Name</th>
                      <th>Played</th>
                      <th>Goals for</th>
                      <th>goals Against</th>
                      <th>goals Difference</th>
                      <th>Win</th>
                      <th>Draw</th>
                      <th>Loss</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>{this.renderTableLeague()}</tbody>
                </table>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    league: state.league.league.teams,
    Details: state.league.leagueDetails.leagues,
    tables: state.league.tableLeague.table
  };
}
export default connect(mapStateToProps, actions)(League);
