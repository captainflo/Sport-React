import React from 'react';
// import { Link } from 'react-router-dom';
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
                width="500"
                height="300"
                src={url}
                frameBorder="0"
              ></iframe>
              <div>
                Other Link: {''}
                <a href={newUrl} target="_blank">
                  <i className="fab fa-youtube"></i> Youtube
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
            <a href={newUrl} target="_blank">
              <i className="fab fa-youtube"></i> Youtube
            </a>
          </div>
        );
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
        <div className="player-pitch">
          <i className="fas fa-user"></i>
          <span className="text-player-pitch"> {player}</span>
        </div>
      );
    });
  };

  renderMatchDay = () => {
    if (this.props.detailGame !== undefined) {
      const game = this.props.detailGame[0];
      {
        return (
          <div>
            <div>
              {game.strEvent}
              <p>
                Day {game.intRound} - {game.dateEvent}
              </p>
              <p>
                {game.intHomeScore} - {game.intAwayScore}
              </p>
            </div>
            <h1>Home Team</h1>
            <div> Goal: {game.strHomeGoalDetails}</div>
            <div> Yellow Card: {game.strHomeYellowCards}</div>
            <div>
              {game.strHomeRedCards ? (
                <div>Red Card: {game.strHomeRedCards}</div>
              ) : (
                ''
              )}
            </div>
            <div className="pitch center">
              <div className="box-pitch">
                <p>{this.lineUpFunction(game.strHomeLineupGoalkeeper)}</p>
                <p>{this.lineUpFunction(game.strHomeLineupDefense)}</p>
                <p> {this.lineUpFunction(game.strHomeLineupMidfield)}</p>
                <p>{this.lineUpFunction(game.strHomeLineupForward)}</p>
              </div>
            </div>
            <p>{game.strHomeLineupSubstitutes}</p>
            <h1>Away Team</h1>
            <div> Yellow Card: {game.strAwayYellowCards}</div>
            <div>Red Card: {game.strAwayRedCards}</div>
            <div> {game.strAwayGoalDetails}</div>
            <div>
              <div> {game.strAwayLineupGoalkeeper}</div>
              <div> {game.strAwayLineupDefense}</div>
              <div> {game.strAwayLineupMidfield}</div>
              <div> {game.strAwayLineupForward}</div>
              <div> {game.strAwayLineupSubstitutes}</div>
            </div>
          </div>
        );
      }
    }
  };

  render() {
    return (
      <div className="custom-container">
        <button
          className="btn right back-return"
          onClick={this.props.history.goBack}
        >
          <i className="far fa-arrow-alt-circle-left"></i> Return
        </button>
        {this.props.detailGame ? this.renderMatchDay() : 'nothing'}
        {this.props.detailGame ? this.renderVideo() : 'nothing'}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    detailGame: state.league.eventDetails.events
  };
}
export default connect(mapStateToProps, actions)(EventDetails);
