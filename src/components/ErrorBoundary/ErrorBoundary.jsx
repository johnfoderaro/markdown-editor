import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

import Action from '../../blocks/Action';
import Overlay from '../../blocks/Overlay';
import Message from '../../blocks/Message';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html { height: 100%; }
  body {
    height: 100%;
    font-size: 18px;
    font-family: 
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Helvetica,
      Arial,
      sans-serif,
      'Apple Color Emoji', 
      'Segoe UI Emoji',
      'Segoe UI Symbol';
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // TODO log these errors somewhere ?
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    return hasError ? (
      <>
        <GlobalStyle />
        <Overlay>
          <Message>
            <Message.Bomb />
            <Message.Text>Something blew up!</Message.Text>
            <Action type="overlay">
              <Action.Button type="inverse" onClick={() => window.location.reload()}>Reload</Action.Button>
            </Action>
          </Message>
        </Overlay>
      </>
    ) : children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};

export default hot(module)(ErrorBoundary);
