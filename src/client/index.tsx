/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as classNames from 'classnames';
import reducers from './reducers';
const styles = require('./styles/main.scss');

import { PokeMap } from './container/PokeMap';
declare const module: any;
declare const window: any;
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));
function initMap (): void {
  render(<Provider store={store}><PokeMap /></Provider> , document.getElementById('root'));
}

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers.ts', () => {
    const nextRootReducer = require('./reducers.ts').default;
    store.replaceReducer(nextRootReducer);
  });
}

(window as any).initMap = initMap;

