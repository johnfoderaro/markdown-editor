import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
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

const LinkButton = ({ children, ...props }) => (
  <StyledButton {...props}>
    {children}
  </StyledButton>
);

LinkButton.propTypes = { children: PropTypes.node.isRequired };

export default hot(module)(LinkButton);
