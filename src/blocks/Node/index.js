import styled from 'styled-components';

import Name from './Name';
import Icon from './Icon';

const Node = styled.div`
  display: flex;
  flex-direction: row;
`;

Node.Name = Name;
Node.Icon = Icon;

export default Node;
