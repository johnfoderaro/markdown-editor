import React from 'react';
import { shallow } from 'enzyme';

import Container from './Container';

let tree;

beforeAll(() => {
  tree = shallow(
    <Container>
      <h1>Test</h1>
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
  it('should render a h1', () => {
    expect(tree.find('h1').text()).toEqual('Test');
  });
});
