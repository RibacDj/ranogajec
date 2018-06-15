import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GamesList extends Component {
  static propTypes = {
    games: PropTypes.array
  };

  formatTeamSpread(points, value) {
    let teamSpreadValue = value.toString();

    if(value > 0) {
      teamSpreadValue = `+${value}`;
    }

    return `${points}${teamSpreadValue}`;
  }

  renderTeamInfo(game, team) {
    const {
      total,
      moneyLine,
      spread
    } = game.lines[0];

    return (
      <div className='Games-teamInfo'>
        <div className='Games-teamId'>
          {game[team].rotationNumber}
        </div>
        <div className='Games-teamName'>
          {game[team].name}
        </div>
        <div className='Games-teamStats'>
          <button className='Games-statsButton'>
            { this.formatTeamSpread(spread.points, spread[team])}
          </button>
        </div>
        <div className='Games-teamStats'>
          <button className='Games-statsButton'>
            {moneyLine[team]}
          </button>
        </div>
        <div className='Games-teamStats'>
          <button className='Games-statsButton'>
            {total[team]}
          </button>
        </div>
      </div>
    );
  }

  renderGames() {
    const { games } = this.props;

    return games.map((game) => {
      const gameDateTime = new Date(game.dateTime);

      return (
        <div key={game.id} className='Games-gameBlock'>
          <div className='Games-gameHeader'>
            {`${game.category.name} | ${game.category.subCategory}`}
          </div>
          <div className='Games-infoNames'>
            <span className='Games-infoName'> Spread </span>
            <span className='Games-infoName'> Money Line </span>
            <span className='Games-infoName'> Total Points </span>
          </div>
          <div className='Games-gameDateTime'>
            {gameDateTime.toDateString()}
          </div>
          <div className='Games-teamList'>
            {this.renderTeamInfo(game, 'away')}
            {this.renderTeamInfo(game, 'home')}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='Games-list'>
        { this.renderGames() }
      </div>
    );
  }
}

export default GamesList;
