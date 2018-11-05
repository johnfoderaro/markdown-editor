import React from 'react';
import { shallow } from 'enzyme';

import NodeList from './NodeList';

let tree;

beforeAll(() => {
  tree = shallow(
    <NodeList width="20" height="20" />,
  );
});

describe('<NodeList />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
