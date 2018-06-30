import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGames } from 'actions/games';
import { getSports } from 'actions/sports';

import GamesList from 'components/games/GamesList';
import SportsList from 'components/games/SportsList';

@connect(state => ({
  error: state.games.get('error'),
  loading: state.games.get('loading'),
  games: state.games.get('games'),
  activeSportData: state.games.get('activeSportData'),
  sports: state.sports.get('sports'),
  sportsLoading: state.sports.get('sportsLoading'),
  sportsError: state.sports.get('sportsError'),
}))
class Games extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    games: PropTypes.array,
    sports: PropTypes.array,
    sportsError: PropTypes.string,
    sportsLoading: PropTypes.bool,
    activeSportData: PropTypes.object,
    // from react-redux
    dispatch: PropTypes.func,
  };

  componentWillMount() {
    const {
      games,
      dispatch,
      sports,
    } = this.props;

    if (!games) {
      dispatch(getGames());
    }

    if (!sports) {
      dispatch(getSports());
    }
  }

  render() {
    const {
      loading,
      error,
      games,
      sports,
      sportsError,
      sportsLoading,
      dispatch,
      activeSportData: {
        sportName,
        leagueName,
      },
    } = this.props;

    return (
      <div className='Games'>
        <div className='Games-sportsList'>
          {sportsLoading && <div>Sports loading...</div>}
          {sportsError && sportsError.toString() }
          {sports && (
            <SportsList
              dispatch={ dispatch }
              sports={ sports }
            />
          )}
        </div>
        <div className='Games-gameList'>
          { loading && <div>Loading games...</div> }
          { error && error.toString() }
          { games &&
            <div>
              <div className='Games-listHeader'>
                {`${ sportName } | ${ leagueName }`}
              </div>
              <div className='Games-periodBlock'>
                <div className='Games-period'>
                  Game
                </div>
              </div>
              <GamesList games={ games } />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Games;
