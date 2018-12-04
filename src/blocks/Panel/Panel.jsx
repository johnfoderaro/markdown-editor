import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Block = styled.div`
  padding-right: 1rem;
  padding-left: 1rem;
  height: 100%;
  width: ${({ type }) => (type === 'explorer' ? '20%' : '80%')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ type }) => (type === 'explorer' ? '#eee' : '#fff')};
`;

const Panel = ({ children, type }) => (
  <Block type={type}>
    {children}
  </Block>
);

Panel.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default hot(module)(Panel);
