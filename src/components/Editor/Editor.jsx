import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Text from '../../blocks/Text';

const Editor = ({ data }) => (
  <Text>
    <Text.Content>
      {data}
    </Text.Content>
  </Text>
);

Editor.propTypes = {
  data: PropTypes.string.isRequired,
};

export default hot(module)(Editor);
