import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Team.css';

class Schedule extends React.Component {
  componentDidMount() {
    this.props.next5EventsByTeam(this.props.team);
    this.props.last5EventsByTeam(this.props.team);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.team !== this.props.team) {
      this.props.next5EventsByTeam(this.props.team);
      this.props.last5EventsByTeam(this.props.team);
    }
  }

  renderNextEvent = () => {
    if (this.props.nextEvents !== undefined) {
      return this.props.nextEvents.map(nextEvent => {
        return (
          <div>
            <p>Match Day {nextEvent.intRound}</p>
            {nextEvent.strEvent}
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

  renderLastEvent = () => {
    if (this.props.lastEvents !== undefined) {
      return this.props.lastEvents.map(lastEvent => {
        return (
          <div>
            {lastEvent.strHomeTeam} {lastEvent.intHomeScore} -{' '}
            {lastEvent.intAwayScore} {lastEvent.strAwayTeam}
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
      <div>
        {this.renderNextEvent()}
        <p>last</p>
        {this.renderLastEvent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    nextEvents: state.league.nextEventTeam.events,
    lastEvents: state.league.lastEventTeam.results
  };
}
export default connect(mapStateToProps, actions)(Schedule);
