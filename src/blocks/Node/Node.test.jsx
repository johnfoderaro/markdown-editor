import React from 'react';
import { shallow } from 'enzyme';

import Node from './Node';
import Arrow from '../Arrow';

let tree;

beforeAll(() => {
  tree = shallow(
    <Node>
      <Node.Name>
        <h1>Arrow</h1>
      </Node.Name>
      <Node.Icon>
        <Arrow width="20" height="20" />
      </Node.Icon>
    </Node>,
  );
});

describe('<Node />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
  it('should contain a <Node.Name /> element', () => {
    expect(tree.find(Node.Name)).toBeDefined();
  });
  it('should container a <Node.Icon /> element', () => {
    expect(tree.find(Node.Icon)).toBeDefined();
    expect(tree.find(Arrow)).toBeDefined();
  });
});
