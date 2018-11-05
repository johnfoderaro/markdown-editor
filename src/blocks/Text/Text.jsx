import styled from 'styled-components';

import Content from './Content';
import Action from './Action';

const Text = styled.div`
  padding: 1rem;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  width: 66%;
  height: 30rem;
  border: 1px solid #000;
  border-radius: .5rem;
`;

Text.Action = Action;
Text.Content = Content;

export default Text;
