import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin-top: 1rem;
  margin-right: ${({ type }) => {
    switch (type) {
      case 'new':
        return '.5rem';
      case 'save':
        return '.5rem';
      default:
        return '0';
    }
  }};
  margin-bottom: 1rem;
  margin-left: ${({ type }) => {
    switch (type) {
      case 'delete':
        return '.5rem';
      default:
        return '0';
    }
  }};
  height: 3rem;
  width: 6rem;
  background: none;
  border: none;
  border-radius: .5rem;
  font-size: 1.25em;
  cursor: pointer;
  border: 2px solid ${({ type }) => {
    switch (type) {
      case 'new':
        return 'rgb(25, 105, 179)';
      case 'save':
        return 'rgb(25, 179, 63)';
      case 'delete':
        return 'rgb(179, 56, 25)';
      default:
        return '#eee';
    }
  }};
  &:hover {
    border: none;
    background: ${({ type }) => {
    switch (type) {
      case 'new':
        return 'rgb(25, 105, 179)';
      case 'save':
        return 'rgb(25, 179, 63)';
      case 'delete':
        return 'rgb(179, 56, 25)';
      default:
        return '#eee';
    }
  }};
    color: rgb(255, 255, 255);
  }
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
