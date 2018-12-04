import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Panel from '../../blocks/Panel';
import Action from '../../blocks/Action';
import Text from '../../blocks/Text';

const Editor = ({ file }) => (
  <Panel type="editor">
    <Text>
      <Text.Name value="untitled.md" />
      <Text.Content placeholder="Edit your text here..." value={file} />
    </Text>
    <Action type="editor">
      <Action.Button type="save">Save</Action.Button>
      <Action.Button type="delete">Delete</Action.Button>
    </Action>
  </Panel>
);

Editor.propTypes = {
  file: PropTypes.string,
};

Editor.defaultProps = {
  file: PropTypes.string,
};
export default hot(module)(Editor);
