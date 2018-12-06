import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Panel from '../../blocks/Panel';
import Action from '../../blocks/Action';
import Text from '../../blocks/Text';

const Editor = ({ name, data }) => (
  <Panel type="editor">
    <Text>
      <Text.Name placeholder="untitled.md" value={name} />
      <Text.Content placeholder="&quot;The first draft is just you telling yourself the story.&quot;" value={data} />
    </Text>
    <Action type="editor">
      <Action.Button type="save">Save</Action.Button>
      <Action.Button type="delete">Delete</Action.Button>
    </Action>
  </Panel>
);

Editor.propTypes = {
  name: PropTypes.string,
  data: PropTypes.string,
};

Editor.defaultProps = {
  name: PropTypes.string,
  data: PropTypes.string,
};
export default hot(module)(Editor);
