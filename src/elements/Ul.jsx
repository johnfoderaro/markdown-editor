import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledUl = styled.ul`
  margin-left: .5rem;
  list-style: none;
`;

const Ul = ({ children }) => (
  <StyledUl>
    {children}
  </StyledUl>
);

Ul.propTypes = { children: PropTypes.arrayOf(PropTypes.element).isRequired };

export default Ul;
