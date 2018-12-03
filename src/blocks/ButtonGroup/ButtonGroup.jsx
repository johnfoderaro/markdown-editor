import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../../elements/Button';

const Block = styled.div`
  /* padding: .5rem calc(50% - 680px);
  margin-right: 1rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: row; */
`;

const ButtonGroup = ({ children }) => (
  <Block>
    <Button>Save</Button>
    <Button>Delete</Button>
  </Block>
);

ButtonGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default hot(module)(ButtonGroup);
