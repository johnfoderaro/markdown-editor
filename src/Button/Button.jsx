import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Block = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font: inherit;
  text-decoration: underline;
  display: inline;
  margin: 0;
  padding: 0;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const Button = ({ children, ...props }) => (
  <Block {...props}>
    {children}
  </Block>
);

Button.propTypes = { children: PropTypes.string.isRequired };

export default hot(module)(Button);
