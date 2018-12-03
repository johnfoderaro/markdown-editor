import styled from 'styled-components';

import Button from './Button';

const Action = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

Action.Button = Button;

export default Action;
