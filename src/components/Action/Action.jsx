import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

// import Text from '../../blocks/Text';
import ButtonGroup from '../../blocks/ButtonGroup';

const Editor = ({ file }) => (
  <ButtonGroup />
);

Editor.propTypes = {
  file: PropTypes.string,
};

Editor.defaultProps = {
  file: PropTypes.string,
};
export default hot(module)(Editor);
