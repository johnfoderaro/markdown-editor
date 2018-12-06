import styled from 'styled-components';

import Name from './Name';
import Icon from './Icon';
import Arrow from './Arrow';
import Dir from './Dir';
import File from './File';
import List from './List';

const Node = styled.div`
  display: flex;
  flex-direction: row;
`;

Node.List = List;
Node.Name = Name;
Node.Icon = Icon;
Node.Arrow = Arrow;
Node.Dir = Dir;
Node.File = File;

export default Node;
