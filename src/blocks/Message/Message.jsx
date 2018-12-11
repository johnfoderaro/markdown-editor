import styled from 'styled-components';

import Bomb from './Bomb';
import Error from './Error';
import Loader from './Loader';
import Success from './Success';
import Text from './Text';
import Warning from './Warning';

const Message = styled.div`
  display: flex;
  flex-direction: column;
`;

Message.Bomb = Bomb;
Message.Error = Error;
Message.Loader = Loader;
Message.Success = Success;
Message.Text = Text;
Message.Warning = Warning;

export default Message;
