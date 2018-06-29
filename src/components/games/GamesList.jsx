import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class GamesList extends Component {
  static propTypes = {
    games: PropTypes.array,
  };

  /**
   * Helper function that based on leftover of the value returns
   * corresponding string in format 1/2, 1/4 or 1/3
   * @param {double} leftover
   */
  convertLeftoverToString(leftover) {
    let leftoverToString = '';

    if (leftover !== 0) {
      switch (leftover) {
        case 0.25:
          leftoverToString = '&frac14;';
          break;
        case 0.5:
          leftoverToString = '&frac12;';
          break;
        case 0.75:
          leftoverToString = '&frac34;';
          break;
        default:
          leftoverToString = '&frac12;';
      }
    }

    return leftoverToString;
  }

  /**
   * Helper function that return corresponding string based on value
   * @param {number} value
   */
  convertValueToString(value) {
    let valueToString = Math.abs(value).toString();

    if (value > 0) {
      valueToString = `+ ${ valueToString }`;
    } else {
      valueToString = `- ${ valueToString }`;
    }

    return valueToString;
  }

  /**
   * Function that is receiving spread object and return
   * corresponding string that is representation of team's spread value
   * @param {Object} spreadInfo
   * @param {string} team
   */
  formatTeamSpread(spreadInfo, team) {
    const {
      isHomeFavorited,
      points,
    } = spreadInfo;

    const valueToString = this.convertValueToString(spreadInfo[team]);

    const leftover = points % 1;
    const leftoverToString = this.convertLeftoverToString(Math.abs(leftover));

    let pointsToString = `${ points - leftover }${ leftoverToString }`;

    if (isHomeFavorited && team === 'away') {
      pointsToString = `+${ Math.abs(points) - Math.abs(leftover) }${ leftoverToString }`;
    }

    return `${ pointsToString } ${ valueToString }`;
  }

  /**
   * Function that is receiving total points object and return
   * corresponding string that is representation of team's total points value
   * @param {Object} totalInfo
   * @param {string} team
   */
  formatTeamTotalPoints(totalInfo, team) {
    const valueToString = this.convertValueToString(totalInfo[team]);

    const leftover = totalInfo.points % 1;
    const leftoverToString = this.convertLeftoverToString(Math.abs(leftover));

    const points = totalInfo.points - leftover;
    const prefix = team === 'away' ? 'O' : 'U';

    return `${ prefix } ${ points }${ leftoverToString } ${ valueToString }`;
  }

  renderTeamInfo(game, team) {
    const {
      total,
      moneyLine,
      spread,
    } = game.lines[0];

    const isDraw = team === 'draw';

    return (
      <div className='GamesList-teamInfo'>
        <div className='GamesList-teamId'>
          {game[team].rotationNumber}
        </div>
        <div className='GamesList-teamName'>
          {game[team].name}
        </div>
        <div className='GamesList-teamStats'>
          { !isDraw &&
            <button className='GamesList-statsButton'>
              <span dangerouslySetInnerHTML={{__html: this.formatTeamSpread(spread, team)}} />
            </button>
          }
        </div>
        <div className='GamesList-teamStats'>
          <button className='GamesList-statsButton'>
            { this.convertValueToString(isDraw ? moneyLine.drawPrice : moneyLine[team]) }
          </button>
        </div>
        <div className='GamesList-teamStats'>
          { !isDraw &&
            <button className='GamesList-statsButton'>
              <span dangerouslySetInnerHTML={{__html: this.formatTeamTotalPoints(total, team)}} />
            </button>
          }
        </div>
      </div>
    );
  }

  renderGames() {
    const { games } = this.props;

    return games.map((game) => {
      const gameDateTime = moment(new Date(game.dateTime));
      const formatGameDateTime = gameDateTime.format('MMMM ddd D, YYYY h:mm A');

      return (
        <div key={ game.id } className='GamesList-gameBlock'>
          <div className='GamesList-gameHeader'>
            {`${ game.category.name } | ${ game.category.subCategory }`}
          </div>
          <div className='GamesList-periodBlock'>
            <div className='GamesList-period'>
              {game.lines[0].period.description}
            </div>
          </div>
          <div className='GamesList-infoNames'>
            <span className='GamesList-infoName'> Spread </span>
            <span className='GamesList-infoName'> Money Line </span>
            <span className='GamesList-infoName'> Total Points </span>
          </div>
          <div className='GamesList-gameDateTime'>
            {formatGameDateTime}
          </div>
          <div className='GamesList-teamList'>
            {this.renderTeamInfo(game, 'away')}
            {this.renderTeamInfo(game, 'home')}
            {game.draw && this.renderTeamInfo(game, 'draw')}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='GamesList-list'>
        { this.renderGames() }
      </div>
    );
  }
}

export default GamesList;
