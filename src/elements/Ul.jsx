import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledUl = styled.ul;

const Ul = ({ children }) => (
  <StyledUl>
    {...children}
  </StyledUl>
);

Ul.propTypes = { children: PropTypes.element.isRequired };

export default Ul;
