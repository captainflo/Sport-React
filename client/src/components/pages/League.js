import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/League.css';

class League extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params.league);
    this.props.competition(this.props.match.params.league);
  }

  renderTeam = () => {
    if (this.props.teams !== undefined) {
      return this.props.teams.map(team => {
        return (
          // <Link key={team.idTeam} to={`/team/${team.strTeam}`}>
          //   <div>
          //     <img
          //       className="team-logo"
          //       src={
          //         team.strTeamBadge ||
          //         process.env.PUBLIC_URL + '/images/logoBall.png'
          //       }
          //       alt="logo"
          //     />
          //     <p>
          //       {team.strTeam} - {team.idTeam}
          //     </p>
          //   </div>
          // </Link>
          <div className="col m6">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img
                  class="activator team-logo"
                  src={
                    team.strTeamBadge ||
                    process.env.PUBLIC_URL + '/images/logoBall.png'
                  }
                  alt="logo"
                />
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">
                  {team.strTeam}
                  <i class="material-icons right">more_vert</i>
                </span>
                <p>
                  <a href="#">This is a link</a>
                </p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">
                  Card Title<i class="material-icons right">close</i>
                </span>
                <p>
                  Here is some more information about this product that is only
                  revealed once clicked on. Here is some more information about
                  this product that is only revealed once clicked on. Here is
                  some more information about this product that is only revealed
                  once clicked on.
                </p>
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
      <div className="container">
        <p>Teams</p>
        <div className="row">{this.renderTeam()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    auth: state.auth.authenticated,
    teams: state.league.league.teams
  };
}
export default connect(mapStateToProps, actions)(League);
