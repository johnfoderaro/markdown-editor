import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Action from '../../blocks/Action';
import Overlay from '../../blocks/Overlay';
import Message from '../../blocks/Message';

const Alert = ({
  text,
  type,
  button,
  handleClick,
}) => (
  <Overlay>
    <Message>
      { type === 'error' && <Message.Error />}
      { type === 'success' && <Message.Success />}
      { type === 'warning' && <Message.Warning />}
      <Message.Text>{text}</Message.Text>
      <Action type="overlay">
        <Action.Button type="inverse" onClick={handleClick}>{button}</Action.Button>
      </Action>
    </Message>
  </Overlay>
);

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default hot(module)(Alert);
