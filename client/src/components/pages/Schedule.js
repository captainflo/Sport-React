import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Schedule.css';
// import ChartWithAnimation from '../utils/dashbord/ChartWithAnimation';

class Schedule extends React.Component {
  componentDidMount() {
    this.props.next5EventsByTeam(this.props.team);
    this.props.last5EventsByTeam(this.props.team);
    this.props.competition(this.props.idLeague);
    this.props.eventByLeague(this.props.idLeague);
    this.props.tableLeague(this.props.idLeague);
  }

  componentDidUpdate(prevProps) {
    if (this.props.team !== prevProps.team) {
      this.props.next5EventsByTeam(this.props.team);
      this.props.last5EventsByTeam(this.props.team);
      this.props.competition(this.props.idLeague);
      this.props.eventByLeague(this.props.idLeague);
      this.props.tableLeague(this.props.idLeague);
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

  renderAllEventTeam = () => {
    if (this.props.eventLeague !== undefined) {
      return this.props.eventLeague.map(event => {
        if (
          event.idHomeTeam === this.props.team ||
          event.idAwayTeam === this.props.team
        ) {
          return (
            <div key={event.idEvent}>
              <p className="date-schedule">
                Day {event.intRound} - {event.dateEvent}
              </p>
              <div className="container-flex" key={event.idEvent}>
                <p>{this.renderImage(event.idHomeTeam)}</p>
                {/* <Link to={`/eventDetails/${event.idEvent}`}> */}
                <div>
                  <p className="score">
                    {event.intHomeScore} - {event.intAwayScore}
                  </p>
                  {event.strEvent}
                </div>
                {/* </Link> */}
                <p>{this.renderImage(event.idAwayTeam)}</p>
              </div>
            </div>
          );
        } else {
          return <div key={event.idEvent}></div>;
        }
      });
    }
  };

  renderChart = () => {
    if (this.props.tables !== undefined) {
      return this.props.tables.map(table => {
        if (table.teamid === this.props.team) {
          return (
            <div key={table.teamid}>
              <h6>Game played {table.played}</h6>
              <p></p>
              <div key={table.name}>
                {/* <ChartWithAnimation
                  win={table.win}
                  draw={table.draw}
                  loss={table.loss}
                  played={table.played}
                /> */}
              </div>
            </div>
          );
        } else {
          return <div>nothing found...</div>;
        }
      });
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
                <div key={nextEvent.idEvent}>
                  <p className="date-schedule">
                    Day {nextEvent.intRound} - {nextEvent.dateEvent}
                  </p>
                  <div className="container-flex" key={nextEvent.idEvent}>
                    <p>{this.renderImage(nextEvent.idHomeTeam)}</p>
                    {this.props.idLeague !== '4387' &&
                    this.props.idLeague !== '4391' &&
                    this.props.idLeague !== '4424' &&
                    this.props.idLeague !== '4380' ? (
                      // <Link to={`/eventDetails/${nextEvent.idEvent}`}>
                      <p>{nextEvent.strEvent}</p>
                    ) : (
                      // </Link>
                      <p>{nextEvent.strEvent}</p>
                    )}

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
                <div key={lastEvent.idEvent}>
                  <p className="date-schedule">
                    Day {lastEvent.intRound} - {lastEvent.dateEvent}
                  </p>
                  <div className="container-flex" key={lastEvent.idEvent}>
                    <p>{this.renderImage(lastEvent.idHomeTeam)}</p>
                    {this.props.idLeague !== '4387' &&
                    this.props.idLeague !== '4391' &&
                    this.props.idLeague !== '4424' &&
                    this.props.idLeague !== '4380' ? (
                      // <Link to={`/eventDetails/${lastEvent.idEvent}`}>
                      <div>
                        <p className="score">
                          {lastEvent.intHomeScore} - {lastEvent.intAwayScore}
                        </p>
                        {lastEvent.strEvent}
                      </div>
                    ) : (
                      // </Link>
                      <div>
                        <p className="score">
                          {lastEvent.intHomeScore} - {lastEvent.intAwayScore}
                        </p>
                        {lastEvent.strEvent}
                      </div>
                    )}

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
        {this.props.idLeague !== '4346' &&
        this.props.idLeague !== '4387' &&
        this.props.idLeague !== '4391' &&
        this.props.idLeague !== '4424' &&
        this.props.idLeague !== '4380' &&
        this.props.eventLeague ? (
          <div>
            <div className="col m12 s12 schedule-box">
              {this.renderAllEventTeam()}
            </div>
            {/* <div className="col m8 s12 ">{this.renderChart()}</div> */}
          </div>
        ) : (
          ''
        )}

        {this.props.idLeague === '4346' ||
        this.props.idLeague === '4387' ||
        this.props.idLeague === '4391' ||
        this.props.idLeague === '4424' ||
        this.props.idLeague === '4380' ? (
          <div>
            <div className="col m6 s12 schedule-box">
              <h6>Next Games of {this.props.teamDetails}</h6>
              {this.props.nextEvents
                ? this.renderNextEvent()
                : 'no game season...'}
            </div>
            <div className="col m6 s12 schedule-box">
              <h6>Last Games {this.props.teamDetails}</h6>
              {this.props.lastEvents
                ? this.renderLastEvent()
                : 'no schedule...'}
            </div>
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
    teamDetails: state.league.teamDetails.teams[0].strLeague,
    leagues: state.league.league.teams,
    nextEvents: state.league.nextEventTeam.events,
    lastEvents: state.league.lastEventTeam.results,
    eventLeague: state.league.eventLeague.events,
    tables: state.league.tableLeague.table
  };
}
export default connect(mapStateToProps, actions)(Schedule);
