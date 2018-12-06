import React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

const Svg = styled.svg`
  margin-left: auto;
  margin-right: auto;
`;

const Success = () => (
  <Svg width="120" height="120" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" fill="#fff" />
  </Svg>
);

export default hot(module)(Success);
