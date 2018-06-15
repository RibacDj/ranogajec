import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className='Home'>
        <h1>Ranogajec</h1>
        <p>
          React/Redux test application
        </p>

        <h2>About</h2>

        <p>
          Ranogajec is a test application for data representation.
          Data that will be represent here is coming from API endpoint: <br/>
          <a href='https://e.ffsvrs.eu/webservices/LineService/api/lines/all'>
              https://e.ffsvrs.eu/webservices/LineService/api/lines/all
          </a>
        </p>
      </div>
    );
  }
}
