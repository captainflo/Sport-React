import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import '../css/Player.css';

class Player extends React.Component {
  componentDidMount() {
    this.props.PlayerHonours(this.props.match.params.id);
    this.props.playerFormer(this.props.match.params.id);
    this.props.playerDetails(this.props.match.params.id);
    this.props.playerContract(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.PlayerHonours(this.props.match.params.id);
      this.props.playerFormer(this.props.match.params.id);
      this.props.playerDetails(this.props.match.params.id);
      this.props.playerContract(this.props.match.params.id);
    }
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
                  process.env.PUBLIC_URL + '/images/player.jpg'
                }
                alt="logo"
              />
              <div className="text-player">
                {this.props.contracts
                  ? this.renderPlayerContracts()
                  : 'nothing found...'}
                <p>{player.strDescriptionEN}</p>
              </div>
            </div>
            <div className="box-player-details">
              <p>
                <i className="fas fa-globe-americas"></i>{' '}
                {player.strNationality}
              </p>
              <p>
                <i className="fas fa-map-marked-alt"></i> Born in{' '}
                {player.dateBorn} at {player.strBirthLocation}
              </p>

              <p>
                <i className="fas fa-ruler-horizontal"></i> {player.strHeight}
              </p>
              <p>
                <i className="fas fa-weight-hanging"></i> {player.strWeight}
              </p>
              <p>
                <i className="fas fa-running"></i> {player.strPosition}
              </p>
              <p>
                <i className="fas fa-tshirt"></i> {player.strNumber}
              </p>
              <p>
                <i className="fas fa-dollar-sign"></i> {player.strSigning}
              </p>
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
              <Link to={`/team/${former.idFormerTeam}`}>
                <img
                  className="picture-player hoverable"
                  src={
                    former.strTeamBadge ||
                    process.env.PUBLIC_URL + '/images/logoBall.png'
                  }
                  alt="logo"
                />
              </Link>
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
          <div key={contract.id} className="box-contract">
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
        <div className="row">
          <div className="col s12 m12">
            <h3>Former Team</h3>
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
          <div className="col s12 m12">
            <h3>Career Honours </h3>
            <div className="table-honor">
              <table className="responsive-table">
                <thead className="index-honor-table">
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
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    players: state.league.playerDetails.players,
    honors: state.league.playerHonours.honors,
    formers: state.league.playerFormer.formerteams,
    contracts: state.league.playerContract.contracts
  };
}
export default connect(mapStateToProps, actions)(Player);
