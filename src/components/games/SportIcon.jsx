import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SportIcon extends Component {
  static propTypes = {
    name: PropTypes.string,
  };


  render() {
    const { name } = this.props;
    console.log(name);
    const IconName = 'Soccer';
    return (
      <IconName />
    );
  }
}

export default SportIcon;
