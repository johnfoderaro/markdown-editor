import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import ErrorBoundary from './components/ErrorBoundary';

const root = document.getElementById('root');

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  root,
);
