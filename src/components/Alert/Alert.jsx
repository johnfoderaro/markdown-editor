import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Action from '../../blocks/Action';
import Overlay from '../../blocks/Overlay';
import Message from '../../blocks/Message';

const Alert = ({
  alert: {
    action,
    cancel,
    text,
    type,
    button,
  },
  handleCancel,
  handleClick,
}) => (
  <Overlay>
    <Message>
      { type === 'error' && <Message.Error />}
      { type === 'success' && <Message.Success />}
      { type === 'warning' && <Message.Warning />}
      <Message.Text>{text}</Message.Text>
      <Action type="overlay">
        { cancel
          ? <>
            <Action.Button type="inverse" onClick={handleCancel} data-action="cancel">Cancel</Action.Button>
            <Action.Button type="inverse" onClick={handleClick} data-action={action}>{button}</Action.Button>
            </>
          : <Action.Button type="inverse" onClick={handleClick} data-action={action}>{button}</Action.Button>
        }
      </Action>
    </Message>
  </Overlay>
);

Alert.propTypes = {
  alert: PropTypes.shape({
    action: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    cancel: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default hot(module)(Alert);
