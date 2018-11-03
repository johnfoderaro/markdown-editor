import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Block = styled.div`
  padding: .5rem calc(50% - 680px);
  margin-right: 1rem;
  margin-left: 1rem;
`;

const Container = ({ children }) => (
  <Block>
    {children}
  </Block>
);

Container.propTypes = {
  children: PropTypes.element.isRequired,
};

export default hot(module)(Container);
