import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './Button';

const Block = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: ${({ type }) => {
    switch (type) {
      case 'explorer':
        return 'flex-start';
      case 'editor':
        return 'flex-end';
      default:
        return 'center';
    }
  }};
`;

const Action = ({ children, type }) => (
  <Block type={type}>
    {children}
  </Block>
);

Action.Button = Button;

Action.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};


export default hot(module)(Action);
