import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

const Block = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.75);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Overlay = ({ children }) => (
  <Block>
    {children}
  </Block>
);

Overlay.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default hot(module)(Overlay);
