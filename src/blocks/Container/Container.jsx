import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Block = styled.div`
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: row;
`;

const Container = ({ children }) => (
  <Block>
    {children}
  </Block>
);

Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default hot(module)(Container);
