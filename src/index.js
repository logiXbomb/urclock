// @flow
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';

const el = document.getElementById('container');

if (el) {
  render(<App />, el);
}
