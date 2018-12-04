import styled from 'styled-components';

import Text from './Text';
import Svg from './Icon';

const Message = styled.div`
  display: flex;
  flex-direction: column;
`;

Message.Text = Text;
Message.Svg = Svg;

export default Message;
