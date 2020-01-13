import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Team extends React.Component {
  componentDidMount() {
    this.props.PlayersByTeam(this.props.match.params.id);
  }

  renderPlayers = () => {
    if (this.props.players !== undefined) {
      return this.props.players.map(player => {
        return (
          <div key={player.PlayerId}>
            <img
              className="team-logo"
              src={
                player.PhotoUrl ||
                process.env.PUBLIC_URL + '/images/logoBall.png'
              }
              alt="logo"
            />
            <p>
              {player.FirstName} - {player.LastName}
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
    console.log(this.props.players);
    return (
      <div className="center">
        <h5>Squad</h5>
        {this.props.players ? this.renderPlayers() : ''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    players: state.league.playerByTeam
  };
}
export default connect(mapStateToProps, actions)(Team);
