import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Node from './Node';

let tree;

beforeAll(() => {
  tree = mount(
    <Node>
      <Node.Name>
        <h1>Node Icons</h1>
      </Node.Name>
      <Node.Icon>
        <Node.Arrow width="20" height="20" />
      </Node.Icon>
      <Node.Icon>
        <Node.Dir width="20" height="20" state="open" />
      </Node.Icon>
      <Node.Icon>
        <Node.Dir width="20" height="20" state="closed" />
      </Node.Icon>
      <Node.Icon>
        <Node.File width="20" height="20" />
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
  it('should contain a <Node.Icon /> element', () => {
    expect(tree.find(Node.Icon)).toBeDefined();
  });
  it('should render an SVG icons', () => {
    expect(tree.find(Node.Arrow)).toBeDefined();
    expect(tree.find(Node.File)).toBeDefined();
    expect(tree.find(Node.Dir)).toBeDefined();
  });
});
