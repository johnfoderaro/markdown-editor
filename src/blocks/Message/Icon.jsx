import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Loader = styled.svg`
  margin-left: auto;
  margin-right: auto;
  transform: rotate(-90deg);  
  stroke: #fff;
  circle {
    stroke-dasharray: 260;
    stroke-dashoffset: 260;
    animation: dash 1.5s infinite;  
  }
  @keyframes dash {
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: -260;
    }  
  }
`;

const Svg = styled.svg`
  margin-left: auto;
  margin-right: auto;
`;

const Icon = ({ type }) => {
  if (type === 'error') {
    return (
      <Svg width="120" height="120" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M1440 893q0-161-87-295l-754 753q137 89 297 89 111 0 211.5-43.5t173.5-116.5 116-174.5 43-212.5zm-999 299l755-754q-135-91-300-91-148 0-273 73t-198 199-73 274q0 162 89 299zm1223-299q0 157-61 300t-163.5 246-245 164-298.5 61-298.5-61-245-164-163.5-246-61-300 61-299.5 163.5-245.5 245-164 298.5-61 298.5 61 245 164 163.5 245.5 61 299.5z" fill="#fff" />
      </Svg>
    );
  }
  if (type === 'warning') {
    return (
      <Svg width="120" height="120" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M1008 1200v160q0 14-9 23t-23 9h-160q-14 0-23-9t-9-23v-160q0-14 9-23t23-9h160q14 0 23 9t9 23zm256-496q0 50-15 90t-45.5 69-52 44-59.5 36q-32 18-46.5 28t-26 24-11.5 29v32q0 14-9 23t-23 9h-160q-14 0-23-9t-9-23v-68q0-35 10.5-64.5t24-47.5 39-35.5 41-25.5 44.5-21q53-25 75-43t22-49q0-42-43.5-71.5t-95.5-29.5q-56 0-95 27-29 20-80 83-9 12-25 12-11 0-19-6l-108-82q-10-7-12-20t5-23q122-192 349-192 129 0 238.5 89.5t109.5 214.5zm-368-448q-130 0-248.5 51t-204 136.5-136.5 204-51 248.5 51 248.5 136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5-51-248.5-136.5-204-204-136.5-248.5-51zm768 640q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" fill="#fff" />
      </Svg>
    );
  }
  if (type === 'success') {
    return (
      <Svg width="120" height="120" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" fill="#fff" />
      </Svg>
    );
  }
  if (type === 'loader') {
    return (
      <Loader height="120" width="120">
        <circle cx="60" cy="60" r="40" strokeWidth="10" fill="none" />
      </Loader>
    );
  }
  return false;
};

Icon.propTypes = {
  type: PropTypes.string,
};


export default hot(module)(Icon);
