import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Squad.css';

class Squad extends React.Component {
  componentDidMount() {
    this.props.playersByTeam(this.props.team);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.team !== this.props.team)
      this.props.playersByTeam(this.props.team);
  }

  renderPlayers = () => {
    if (this.props.players !== undefined) {
      return this.props.players.map(player => {
        return (
          <tr key={player.idPlayer}>
            <Link to={`/player/${player.idPlayer}`}>
              <td>
                <img
                  className="picture-player"
                  src={
                    player.strRender ||
                    player.strCutout ||
                    player.strThumb ||
                    process.env.PUBLIC_URL + '/images/logoBall.png'
                  }
                  alt="logo"
                />
              </td>
            </Link>
            <td>{player.strPlayer}</td>
            <td>{player.strNationality}</td>
            <td>{player.dateBorn}</td>
            <td>{player.strPosition}</td>
          </tr>
        );
      });
    }
  };

  render() {
    return (
      <div className="row">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Player Picture</th>
              <th>Name</th>
              <th>Nationality</th>
              <th>Birthday</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>{this.renderPlayers()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    teams: state.league.league.teams,
    players: state.league.playerByTeam.player
  };
}
export default connect(mapStateToProps, actions)(Squad);
