import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSportGames } from 'actions/games';

class SportsList extends Component {
  static propTypes = {
    sports: PropTypes.array,
    dispatch: PropTypes.func,
  };

  constructor() {
    super();

    this.state = {
      openSport: null,
    };

    this.handleSportButtonClick = this.handleSportButtonClick.bind(this);
    this.handleSportLeagueButtonClick = this.handleSportLeagueButtonClick.bind(this);
  }

  handleSportButtonClick(sportName) {
    const { openSport } = this.state;

    this.setState({
      openSport: openSport === sportName ? null : sportName,
    });
  }

  handleSportLeagueButtonClick(sport, league) {
    const { dispatch } = this.props;

    dispatch(getSportGames(sport, league));
  }

  renderSportLeagues(sport) {
    return sport.leagues.map(league => {
      return (
        <button
          onClick={() => this.handleSportLeagueButtonClick(sport.name, league) }
          key={ `${ sport.name }-${ league }` }
          className='SportsList-leagueButton'
        >
          {league}
        </button>
      );
    });
  }

  renderSportsList() {
    const { sports } = this.props;
    const { openSport } = this.state;

    return sports.map(sport => {
      const sportLeaguesListOpen = {
        'height': `${ 60 * sport.leagues.length }px`,
      };

      const sportIconName = sport.name.split(' ')[0].toLowerCase();

      return (
        <li key={ sport.name } className='SportsList-item'>
          <button
            className='SportsList-itemButton'
            onClick={ () => this.handleSportButtonClick(sport.name) }
          >
            <svg className='SportsList-icon'>
              <use xlinkHref={ `#${ sportIconName }` } />
            </svg>
            {sport.name}
          </button>
          <div className='SportsList-sportLeaguesList' style={ openSport === sport.name ? sportLeaguesListOpen : null }>
            {this.renderSportLeagues(sport) }
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul className='SportsList'>
          { this.renderSportsList() }
        </ul>
      </div>
    );
  }
}

export default SportsList;
