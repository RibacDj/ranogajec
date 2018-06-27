import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import SoccerSvg from 'assets/svg/soccer.svg';

class SportsList extends Component {
  static propTypes = {
    sports: PropTypes.array,
  };

  constructor() {
    super();

    this.state = {
      openSport: null,
    };

    this.handleSportButtonClick = this.handleSportButtonClick.bind(this);
  }

  handleSportButtonClick(sportName) {
    const { openSport } = this.state;

    this.setState({
      openSport: openSport === sportName ? null : sportName,
    });
  }

  renderSportLeagues(sport) {
    return sport.leagues.map(league => {
      return (
        <button
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

      // const SportIcon = this.getSportsIcon(sport.name);

      return (
        <li key={ sport.name } className='SportsList-item'>
          <button
            className='SportsList-itemButton'
            onClick={ () => this.handleSportButtonClick(sport.name) }
          >
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
      <ul className='SportsList'>
        { this.renderSportsList() }
      </ul>
    );
  }
}

export default SportsList;
