import React, { Component } from 'react';

export default class Landing extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>TecHelp</h1>
        <ul>
          <li>Get the help you need</li>
          <li>
            <button>Get help now</button>
          </li>
        </ul>
      </div>
    );
  }
}
