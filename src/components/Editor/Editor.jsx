import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Panel from '../../blocks/Panel';
import Action from '../../blocks/Action';
import Text from '../../blocks/Text';

const Editor = ({
  input,
  textarea,
  handleChange,
  handleSave,
}) => (
  <Panel type="editor">
    <Text>
      <Text.Name placeholder="untitled.md" onChange={handleChange} value={input} />
      <Text.Content placeholder="&quot;The first draft is just you telling yourself the story.&quot;" onChange={handleChange} value={textarea} />
    </Text>
    <Action type="editor">
      <Action.Button type="save" onClick={handleSave}>Save</Action.Button>
      <Action.Button type="delete">Delete</Action.Button>
    </Action>
  </Panel>
);

Editor.propTypes = {
  input: PropTypes.string,
  textarea: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  input: PropTypes.string,
  textarea: PropTypes.string,
};
export default hot(module)(Editor);
