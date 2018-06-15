import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGames } from 'actions/games';

import GamesList from 'components/games/GamesList';

@connect(state => ({
  error: state.games.get('error'),
  loading: state.games.get('loading'),
  games: state.games.get('games')
}))
class Games extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    games: PropTypes.array,
    // from react-redux
    dispatch: PropTypes.func,
  };

  componentWillMount() {
    const {
      games,
      dispatch,
    } = this.props;

    if(!games) {
      dispatch(getGames());
    }
  }

  render() {
    const {
      loading,
      error,
      games,
    } = this.props;

    return (
      <div className='Games'>
        { loading && <div>Loading games...</div> }
        { error && error.toString() }
        { games && <GamesList games={games}/>}
      </div>
    );
  }
}

export default Games;
