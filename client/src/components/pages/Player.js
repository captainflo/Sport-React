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
          <div key={player.idPlayer}>
            <p>
              <img
                className="picture-player"
                src={
                  player.strCutout ||
                  player.strThumb ||
                  player.strRender ||
                  process.env.PUBLIC_URL + '/images/logoBall.png'
                }
                alt="logo"
              />
            </p>
            <p>{player.strPlayer}</p>
            <p>{player.strNationality}</p>
            <p>{player.dateBorn}</p>
            <p>{player.strBirthLocation}</p>
            <p>{player.strPosition}</p>
            <p>{player.strDescriptionEN}</p>
            <p>{player.strHeight}</p>
            <p>{player.strWeight}</p>
            <p>{player.strNumber}</p>
            <p>{player.strSigning}</p>
          </div>
        );
      });
    }
  };

  renderPlayerHonors = () => {
    if (this.props.honors !== undefined) {
      return this.props.honors.map(honor => {
        return (
          <div key={honor.id}>
            <p>
              {honor.strHonour} - {honor.strSeason}
            </p>
          </div>
        );
      });
    }
  };

  renderPlayerFormer = () => {
    if (this.props.formers !== undefined) {
      return this.props.formers.map(former => {
        return (
          <div key={former.id}>
            <div className="">
              <img
                className="picture-player"
                src={
                  former.strTeamBadge ||
                  process.env.PUBLIC_URL + '/images/logoBall.png'
                }
                alt="logo"
              />
              <p> {former.strFormerTeam}</p>
              <p>
                {former.strJoined} - {former.strDeparted}{' '}
              </p>
            </div>
          </div>
        );
      });
    }
  };

  renderPlayerContracts = () => {
    if (this.props.contracts !== undefined) {
      return this.props.contracts.map(contract => {
        return (
          <div className="" key={contract.id}>
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
        {this.renderPlayerContracts()}
        {this.renderPlayerDetails()}
        <h3>Honors</h3>
        {this.renderPlayerHonors()}
        <h3>Former</h3>
        {this.renderPlayerFormer()}
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
