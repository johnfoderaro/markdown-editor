import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Container from './Container';

let tree;

beforeAll(() => {
  tree = mount(
    <Container>
      <h1>one</h1>
      <p>two</p>
    </Container>,
  );
});

describe('<Container />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
  it('should render children correctly', () => {
    expect(tree.find('h1').text()).toEqual('one');
    expect(tree.find('p').text()).toEqual('two');
  });
});
