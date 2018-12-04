import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 3rem;
  width: 6rem;
  background: none;
  border: none;
  border-radius: .5rem;
  font-size: 1.25em;
  color: rgb(0, 0, 0);
  cursor: pointer;
`;

const Button = ({ children, type, ...props }) => (
  <StyledButton {...props} type={type}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default hot(module)(Button);
