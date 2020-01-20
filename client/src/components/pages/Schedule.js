import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Schedule.css';

class Schedule extends React.Component {
  componentDidMount() {
    this.props.next5EventsByTeam(this.props.team);
    this.props.last5EventsByTeam(this.props.team);
    this.props.competition(this.props.idLeague);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.team !== this.props.team) {
      this.props.next5EventsByTeam(this.props.team);
      this.props.last5EventsByTeam(this.props.team);
      this.props.competition(this.props.idLeague);
    }
  }

  renderImage = id => {
    if (this.props.leagues !== undefined) {
      for (let i = 0; i < this.props.leagues.length; i++) {
        const idTeam = this.props.leagues[i].idTeam;
        if (id === idTeam) {
          return (
            <Link to={`/team/${idTeam}`}>
              <img
                className="team-logo-schedule hoverable"
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
  };

  renderNextEvent = () => {
    if (this.props.nextEvents !== undefined) {
      return this.props.nextEvents.map(nextEvent => {
        if (this.props.leagues !== undefined) {
          for (let i = 0; i < this.props.leagues.length; i++) {
            const idLeague = this.props.leagues[i].idLeague;
            if (nextEvent.idLeague === idLeague) {
              return (
                <div>
                  <p className="date-schedule">
                    Day {nextEvent.intRound} - {nextEvent.dateEvent}
                  </p>
                  <div className="container-flex" key={nextEvent.idEvent}>
                    <p>{this.renderImage(nextEvent.idHomeTeam)}</p>
                    <p>{nextEvent.strEvent}</p>
                    <p>{this.renderImage(nextEvent.idAwayTeam)}</p>
                  </div>
                </div>
              );
            }
          }
        }
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

  renderLastEvent = () => {
    if (this.props.lastEvents !== undefined) {
      return this.props.lastEvents.map(lastEvent => {
        if (this.props.leagues !== undefined) {
          for (let i = 0; i < this.props.leagues.length; i++) {
            const idLeague = this.props.leagues[i].idLeague;
            if (lastEvent.idLeague === idLeague) {
              return (
                <div>
                  <p className="date-schedule">
                    Day {lastEvent.intRound} - {lastEvent.dateEvent}
                  </p>
                  <div className="container-flex" key={lastEvent.idEvent}>
                    <p>{this.renderImage(lastEvent.idHomeTeam)}</p>

                    <div>
                      <p className="score">
                        {lastEvent.intHomeScore} - {lastEvent.intAwayScore}
                      </p>
                      {lastEvent.strEvent}
                    </div>
                    <p>{this.renderImage(lastEvent.idAwayTeam)}</p>
                  </div>
                </div>
              );
            }
          }
        }
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
      <div className="row center">
        <div className="col m6 s12">
          <h6>Next Games of {this.props.teamDetails}</h6>
          {this.props.nextEvents ? this.renderNextEvent() : 'no game season...'}
        </div>
        <div className="col m6 s12">
          <h6>Last Games {this.props.teamDetails}</h6>
          {this.props.lastEvents ? this.renderLastEvent() : 'no schedule...'}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teamDetails: state.league.teamDetails.teams[0].strLeague,
    leagues: state.league.league.teams,
    nextEvents: state.league.nextEventTeam.events,
    lastEvents: state.league.lastEventTeam.results
  };
}
export default connect(mapStateToProps, actions)(Schedule);
