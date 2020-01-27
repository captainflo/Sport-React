import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/EventDetails.css';

class EventDetails extends React.Component {
  componentDidMount() {
    this.props.eventDetails(this.props.match.params.id);
  }

  renderVideo = () => {
    if (this.props.detailGame !== undefined) {
      if (
        this.props.detailGame[0].strVideo !== null &&
        this.props.detailGame[0].strVideo !== ''
      ) {
        const game = this.props.detailGame[0].strVideo;
        const url = game.replace('watch?v=', 'embed/');
        const otherUrl =
          'https://www.youtube.com/results?search_query=teamHome+vs+teamAway+years';
        const teamHome = this.props.detailGame[0].strHomeTeam;
        const teamAway = this.props.detailGame[0].strAwayTeam;
        const years = this.props.detailGame[0].dateEvent;
        const newTeamHome = otherUrl.replace('teamHome', teamHome);
        const newTeamAway = newTeamHome.replace('teamAway', teamAway);
        const newUrl = newTeamAway.replace('years', years);

        return (
          <div>
            <div>
              <iframe
                title="video"
                width="500"
                height="300"
                src={url}
                frameBorder="0"
              ></iframe>
              <div>
                Other Link: {''}
                <a href={newUrl} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube" rel="noopener noreferrer"></i>{' '}
                  Youtube
                </a>
              </div>
            </div>
          </div>
        );
      } else {
        const url =
          'https://www.youtube.com/results?search_query=teamHome+vs+teamAway+years';
        const teamHome = this.props.detailGame[0].strHomeTeam;
        const teamAway = this.props.detailGame[0].strAwayTeam;
        const years = this.props.detailGame[0].dateEvent;
        const newTeamHome = url.replace('teamHome', teamHome);
        const newTeamAway = newTeamHome.replace('teamAway', teamAway);
        const newUrl = newTeamAway.replace('years', years);

        return (
          <div>
            Video Link {''}
            <a href={newUrl} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i> Youtube
            </a>
          </div>
        );
      }
    }
  };

  renderImage = id => {
    if (this.props.detailGame !== undefined) {
      const game = this.props.detailGame[0];
      this.props.competition(game.idLeague);
      if (this.props.leagues !== undefined) {
        for (let i = 0; i < this.props.leagues.length; i++) {
          const idTeam = this.props.leagues[i].idTeam;
          if (id === idTeam) {
            return (
              <Link to={`/team/${idTeam}`}>
                <img
                  className="team-logo-event hoverable"
                  src={
                    this.props.leagues[i].strTeamBadge ||
                    process.env.PUBLIC_URL + '/images/logoBall.png'
                  }
                  alt="jersey"
                />
              </Link>
            );
          }
        }
      }
    }
  };

  lineUpFunction = lineUp => {
    const newArray = lineUp.split(';');
    newArray.pop();
    return this.renderLineUp(newArray);
  };

  renderLineUp = newArray => {
    return newArray.map(player => {
      return (
        <div key={player} className="player-pitch">
          <i className="fas fa-user"></i>
          <span className="text-player-pitch"> {player}</span>
        </div>
      );
    });
  };

  // Line Up Substitutes
  lineUpFunctionSub = lineUp => {
    const newArray = lineUp.split(';');
    newArray.pop();
    return <ul>Substitutes: {this.renderLineUpSub(newArray)}</ul>;
  };

  renderLineUpSub = newArray => {
    return newArray.map(player => {
      return <li key={player}>{player}</li>;
    });
  };

  // Goal
  goalTeamFunction = lineUp => {
    const newArray = lineUp.split(';');
    newArray.pop();
    return <div>{this.renderGoalTeam(newArray)}</div>;
  };

  renderGoalTeam = newArray => {
    return newArray.map(player => {
      return (
        <span className="goal-event" key={player}>
          {player} <i className="fas fa-futbol"></i>
        </span>
      );
    });
  };

  // Card Player
  cardTeamFunction = lineUp => {
    const newArray = lineUp.split(';');
    newArray.pop();
    return <div>{this.renderCardTeam(newArray)}</div>;
  };

  renderCardTeam = newArray => {
    return newArray.map(player => {
      return (
        <span className="goal-event" key={player}>
          {player}
        </span>
      );
    });
  };

  renderMatchDay = () => {
    if (this.props.detailGame !== undefined) {
      const game = this.props.detailGame[0];
      return (
        <div>
          {/* Score info */}
          <div className="center">
            <h4 className="title-event-details">
              {this.renderImage(game.idHomeTeam)} {game.strEvent}{' '}
              {this.renderImage(game.idAwayTeam)}
            </h4>
            <h5>
              {game.intHomeScore} -{game.intAwayScore}
            </h5>
          </div>
          <p className="center">
            <i className="fas fa-sun"></i> Day {game.intRound} -{' '}
            <i className="fas fa-calendar-day"></i> {game.dateEvent}
          </p>
          {/* Team Home */}
          <div className="row center">
            <div className="col m6 s12">
              <h5>Home Team</h5>
              <div>{this.goalTeamFunction(game.strHomeGoalDetails)}</div>
              <div className="pitch center">
                <div className="box-pitch">
                  <div>{this.lineUpFunction(game.strHomeLineupGoalkeeper)}</div>
                  <div>{this.lineUpFunction(game.strHomeLineupDefense)}</div>
                  <div> {this.lineUpFunction(game.strHomeLineupMidfield)}</div>
                  <div>{this.lineUpFunction(game.strHomeLineupForward)}</div>
                </div>
              </div>
              <div>{this.lineUpFunctionSub(game.strHomeLineupSubstitutes)}</div>

              <div>
                {' '}
                {game.strHomeYellowCards ? (
                  <div>
                    Yellow Card:
                    {this.cardTeamFunction(game.strHomeYellowCards)}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div>
                {game.strHomeRedCards ? (
                  <div>
                    Red Card: {this.cardTeamFunction(game.strHomeRedCards)}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            {/* Team Away */}
            <div className="col m6 s12">
              <h5>Away Team</h5>
              <div>{this.goalTeamFunction(game.strAwayGoalDetails)}</div>
              <div className="pitch center">
                <div className="box-pitch">
                  <div>{this.lineUpFunction(game.strAwayLineupGoalkeeper)}</div>
                  <div> {this.lineUpFunction(game.strAwayLineupDefense)}</div>
                  <div>{this.lineUpFunction(game.strAwayLineupMidfield)}</div>
                  <div> {this.lineUpFunction(game.strAwayLineupForward)}</div>
                </div>
              </div>
              <div>{this.lineUpFunctionSub(game.strAwayLineupSubstitutes)}</div>
              <div>
                {' '}
                {game.strAwayYellowCards ? (
                  <div>
                    Yellow Card:{' '}
                    {this.cardTeamFunction(game.strAwayYellowCards)}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div>
                {game.strAwayRedCards ? (
                  <div>
                    Red Card: {this.cardTeamFunction(game.strAwayRedCards)}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="custom-container">
        <button className="btn back-return" onClick={this.props.history.goBack}>
          <i className="far fa-arrow-alt-circle-left"></i> Return
        </button>
        {this.props.detailGame ? this.renderMatchDay() : 'nothing'}
        {this.props.detailGame ? (
          <div className="center">
            <h3>Video</h3>
            {this.renderVideo()}
          </div>
        ) : (
          'nothing'
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    detailGame: state.league.eventDetails.events,
    leagues: state.league.league.teams
  };
}
export default connect(mapStateToProps, actions)(EventDetails);
