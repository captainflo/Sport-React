import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Team.css';

class Schedule extends React.Component {
  state = {
    imageHome: []
  };
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
        this.props.teamImage(nextEvent.idHomeTeam);
        return (
          <div key={nextEvent.idEvent}>
            <p>{nextEvent.strEvent}</p>
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
          <div key={lastEvent.idEvent}>
            <p>
              {lastEvent.strHomeTeam} {lastEvent.intHomeScore} -{' '}
              {lastEvent.intAwayScore} {lastEvent.strAwayTeam}
            </p>
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
      <div className="row center">
        <div className="col m6 s12">
          <h5>Next 5 Games</h5>
          {this.renderNextEvent()}
        </div>
        <div className="col m6 s12">
          <h5>Last 5 Games</h5>
          {this.renderLastEvent()}
        </div>
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
