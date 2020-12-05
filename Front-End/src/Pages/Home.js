import React, { Component } from 'react';
import '../CSS/Home.css';
import { goToPage } from '../services/Location.js';

export default class Home extends Component {

  render() {
    if (localStorage.token === undefined) {
      goToPage('/authorization')
    }
    return (
      <>
        {( localStorage.token !== undefined) &&
          <ul>
            <li><a href='/addgame' data-text='Add Game'>Add</a></li>
          </ul>}
      </>
    )
  }
}