import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Player.css';

class Player extends React.Component {
  componentDidMount() {
    this.props.PlayerHonours(this.props.match.params.id);
    this.props.playerFormer(this.props.match.params.id);
    this.props.playerDetails(this.props.match.params.id);
    this.props.playerContract(this.props.match.params.id);
  }

  renderPlayerDetails = () => {
    if (this.props.players !== undefined) {
      return this.props.players.map(player => {
        return (
          <div className="row" key={player.idPlayer}>
            <h3>{player.strPlayer}</h3>
            <div>
              <img
                className="picture-player-details"
                src={
                  player.strCutout ||
                  player.strThumb ||
                  player.strRender ||
                  process.env.PUBLIC_URL + '/images/logoBall.png'
                }
                alt="logo"
              />
            </div>
            <div>
              <p>{player.strDescriptionEN}</p>
              <p>Nationality: {player.strNationality}</p>
              <p>
                Born: in {player.dateBorn} at {player.strBirthLocation}
              </p>

              <p>Position: {player.strPosition}</p>

              <p>Height: {player.strHeight}</p>
              <p>Weight: {player.strWeight}</p>
              <p>Number: {player.strNumber}</p>
              <p>Transfert: {player.strSigning}</p>
            </div>
          </div>
        );
      });
    } else {
      return;
    }
  };

  renderPlayerHonors = () => {
    if (this.props.honors !== undefined) {
      return this.props.honors.map(honor => {
        return (
          <tr key={honor.id}>
            <td>{honor.strHonour}</td>
            <td>{honor.strSeason}</td>
          </tr>
        );
      });
    } else {
      return;
    }
  };

  renderPlayerFormer = () => {
    if (this.props.formers !== undefined) {
      return this.props.formers.map(former => {
        return (
          <tr key={former.id}>
            <td>
              <img
                className="picture-player"
                src={
                  former.strTeamBadge ||
                  process.env.PUBLIC_URL + '/images/logoBall.png'
                }
                alt="logo"
              />
            </td>
            <td> {former.strFormerTeam}</td>
            <td>
              {former.strJoined} - {former.strDeparted}{' '}
            </td>
          </tr>
        );
      });
    }
  };

  renderPlayerContracts = () => {
    if (this.props.contracts !== undefined) {
      return this.props.contracts.map(contract => {
        return (
          <div key={contract.id}>
            <img
              className="picture-player"
              src={
                contract.strTeamBadge ||
                process.env.PUBLIC_URL + '/images/logoBall.png'
              }
              alt="logo"
            />

            <p>
              {contract.strYearStart} - {contract.strYearEnd}
            </p>
          </div>
        );
      });
    } else {
      return;
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
        {this.props.players ? this.renderPlayerDetails() : 'nothing found...'}
        <h3>Contract Player</h3>
        {this.props.contracts
          ? this.renderPlayerContracts()
          : 'nothing found...'}
        <div className="row">
          <div className="col s12 m12">
            <h3>Honors</h3>
            <div className="table-honor">
              <table className="responsive-table">
                <thead>
                  <tr>
                    <th>Trophy</th>
                    <th>Season</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.honors
                    ? this.renderPlayerHonors()
                    : 'nothing found...'}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col s12 m12">
            <h3>Former</h3>
            <div>
              <table className="responsive-table">
                <thead>
                  <tr>
                    <th>Badge</th>
                    <th>Name</th>
                    <th>Season</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.formers
                    ? this.renderPlayerFormer()
                    : 'nothing found...'}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    players: state.league.playerDetails.players,
    honors: state.league.playerHonours.honors,
    formers: state.league.playerFormer.formerteams,
    contracts: state.league.playerContract.contracts
  };
}
export default connect(mapStateToProps, actions)(Player);
