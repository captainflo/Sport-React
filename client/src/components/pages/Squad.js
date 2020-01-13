import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Players.css';

class League extends React.Component {
  componentDidMount() {}

  renderPlayers = () => {
    // if (this.props.teams !== undefined) {
    //   return this.props.teams.map(team => {
    //     return (
    //       <Link key={team.idTeam} to={`/team/${team.idTeam}`}>
    //         <div className="col m4">
    //           <div className="card center">
    //             <img
    //               className="team-logo"
    //               src={
    //                 team.strTeamBadge ||
    //                 process.env.PUBLIC_URL + '/images/logoBall.png'
    //               }
    //               alt="logo"
    //             />
    //             <p>{team.strTeam}</p>
    //           </div>
    //         </div>
    //       </Link>
    //     );
    //   });
    // } else {
    //   return (
    //     <div className="preloader-wrapper big active">
    //       <div className="spinner-layer spinner-blue-only">
    //         <div className="circle-clipper left">
    //           <div className="circle"></div>
    //         </div>
    //         <div className="gap-patch">
    //           <div className="circle"></div>
    //         </div>
    //         <div className="circle-clipper right">
    //           <div className="circle"></div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
  };

  render() {
    return (
      <div className="container">
        <div className="row">hello</div>
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
