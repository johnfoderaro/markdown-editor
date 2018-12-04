import styled from 'styled-components';

import Name from './Name';
import Content from './Content';

const Text = styled.div`
  padding-right: 1rem;
  padding-left: 1rem;
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

Text.Name = Name;
Text.Content = Content;

export default Text;
