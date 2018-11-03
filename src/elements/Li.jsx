import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLi = styled.li;

const Li = ({ children }) => (
  <StyledLi>
    {...children}
  </StyledLi>
);

Li.propTypes = { children: PropTypes.node.isRequired };

export default Li;
