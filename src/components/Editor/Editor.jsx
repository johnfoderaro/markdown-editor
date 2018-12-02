import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Text from '../../blocks/Text';

const Editor = ({ file }) => (
  <Text>
    <Text.Content defaultValue={file} value={file} />
  </Text>
);

Editor.propTypes = {
  file: PropTypes.string,
};

Editor.defaultProps = {
  file: PropTypes.string,
};
export default hot(module)(Editor);
