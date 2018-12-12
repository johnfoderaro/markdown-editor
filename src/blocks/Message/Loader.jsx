import React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

const Svg = styled.svg`
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

const Loader = () => (
  <Svg height="120" width="120">
    <circle cx="60" cy="60" r="40" strokeWidth="10" fill="none" />
  </Svg>
);

export default hot(module)(Loader);
