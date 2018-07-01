import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

class PeriodsList extends Component {
  static propTypes = {
    periods: PropTypes.array,
  };

  constructor() {
    super();

    this.state = {
      activePeriod: 0,
    };
  }

  handleButtonClick(periodNumber) {
    const { activePeriod } = this.state;

    if (activePeriod !== periodNumber) {
      this.setState({
        activePeriod: periodNumber,
      });
    }
  }

  render() {
    const { periods } = this.props;
    const { activePeriod } = this.state;

    return (
      <div className='PeriodsList'>
        {
        periods.map(period => {
          const periodClassNames = cx({
            'PeriodsList-period': true,
            'PeriodsList-period--active': period.number === activePeriod,
          });

          return (
            <button
              onClick={() => this.handleButtonClick(period.number) }
              key={ `${ period.number }-${ period.shortDescription }` }
              className={ periodClassNames }
            >
              {period.shortDescription}
            </button>
          );
        })
      }
      </div>
    );
  }
}

export default PeriodsList;
