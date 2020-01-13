import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Players.css';

class League extends React.Component {
  componentDidMount() {
    this.props.PlayersByTeam(this.props.team);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.team !== this.props.team)
      this.props.PlayersByTeam(this.props.team);
  }

  renderPlayers = () => {
    if (this.props.players !== undefined) {
      return this.props.players.map(player => {
        return (
          <div className="card" key={player.idPlayer}>
            <img
              className="team-logo"
              src={
                player.strRender ||
                player.strCutout ||
                player.strThumb ||
                process.env.PUBLIC_URL + '/images/logoBall.png'
              }
              alt="logo"
            />
            <p>{player.strPlayer}</p>
            <p>{player.strBirthLocation}</p>
            <p>Born: {player.dateBorn}</p>
            <p>Number: {player.strNumber}</p>
            <p>Date Signed: {player.dateSigned}</p>
            <p>Transfert Coast: {player.strSigning}</p>
            <p>Position: {player.strPosition}</p>
            <p>Height: {player.strHeight}</p>
            <p>weight: {player.strWeight}</p>
            <p>{player.strDescriptionEN}</p>
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
    return <div className="row">{this.renderPlayers()}</div>;
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    auth: state.auth.authenticated,
    teams: state.league.league.teams,
    players: state.league.playerByTeam.player
  };
}
export default connect(mapStateToProps, actions)(League);
