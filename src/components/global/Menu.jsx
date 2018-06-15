import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import reactLogo from 'img/react.png';

export default class Menu extends Component {
  render() {
    return (
      <div className='Menu'>
        <div className='Menu-logo'>
            <img
              src={ reactLogo }
              alt='Work & Co logo'
            />
        </div>
        <div className='Menu-links'>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            exact
            to={ routeCodes.HOME }
          >
            Home
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to={ routeCodes.GAMES }
          >
            API data example
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to='/404'
          >
            404
          </NavLink>
        </div>
      </div>
    );
  }
}
