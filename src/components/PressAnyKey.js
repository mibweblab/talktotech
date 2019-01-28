import React, { Component } from 'react';

export default class PressAnyKey extends Component {
  renderOnKeyPress() {
    switch (this) {
    }
  }
  render() {
    return <div>{this.renderOnKeyPress()}</div>;
  }
}
