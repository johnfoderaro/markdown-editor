import styled from 'styled-components';

import Button from '../../elements/Button';

const StyledButton = styled(Button)`
  color: ${({ type }) => (type !== 'inverse' ? 'inherit' : 'rgb(255, 255, 255)')};
  margin-right: ${({ type }) => {
    switch (type) {
      case 'new':
        return '.5rem';
      case 'save':
        return '.5rem';
      default:
        return '0';
    }
  }};
  margin-left: ${({ type }) => {
    switch (type) {
      case 'delete':
        return '.5rem';
      default:
        return '0';
    }
  }};
  border: 2px solid ${({ type }) => {
    switch (type) {
      case 'new':
        return 'rgb(25, 105, 179)';
      case 'save':
        return 'rgb(25, 179, 63)';
      case 'delete':
        return 'rgb(179, 56, 25)';
      case 'inverse':
        return 'rgb(255, 255, 255)';
      default:
        return '#eee';
    }
  }};
    &:hover {
      border: none;
      background: ${({ type }) => {
    switch (type) {
      case 'new':
        return 'rgb(25, 105, 179)';
      case 'save':
        return 'rgb(25, 179, 63)';
      case 'delete':
        return 'rgb(179, 56, 25)';
      default:
        return 'rgb(255, 255, 255)';
    }
  }};
    color: ${({ type }) => (type === 'inverse' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)')};
  }
`;

export default StyledButton;
