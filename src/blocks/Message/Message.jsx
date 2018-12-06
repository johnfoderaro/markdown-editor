import styled from 'styled-components';

import Text from './Text';
import Error from './Error';
import Warning from './Warning';
import Success from './Success';
import Loader from './Loader';

const Message = styled.div`
  display: flex;
  flex-direction: column;
`;

Message.Text = Text;
Message.Error = Error;
Message.Warning = Warning;
Message.Success = Success;
Message.Loader = Loader;

export default Message;
