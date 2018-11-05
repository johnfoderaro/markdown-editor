import React from 'react';
import { shallow } from 'enzyme';

import Explorer from './Explorer';
import content from '../../../__tests__/data/content.json';

import NodeList from '../../blocks/NodeList';
import Node from '../../blocks/Node';

import Ul from '../../elements/Ul';
import Li from '../../elements/Li';

let wrapper;
let itemClickFn;
let itemKeyPressFn;

beforeEach(async () => {
  itemClickFn = jest.fn();
  itemKeyPressFn = jest.fn();
  wrapper = shallow(
    <Explorer
      content={content.children[0]}
      onItemClick={itemClickFn}
      onItemKeyPress={itemKeyPressFn}
    />,
  );
});

describe('<Explorer />', () => {
  it('should render', () => {
    expect(wrapper).toBeDefined();
  });
  it('should render a NodeList', () => {
    expect(wrapper.find(NodeList)).toBeDefined();
  });
  it('should render a NodeList containing <Ul />\'s', () => {
    expect(wrapper.find(Ul)).toBeDefined();
  });
  it('should render a NodeList containing <Li />\'s', () => {
    expect(wrapper.find(Li)).toBeDefined();
  });
  it('should render a NodeList containing <Node />\'s', () => {
    expect(wrapper.find(Node)).toBeDefined();
  });
});

afterEach(() => {
  itemClickFn.mockReset();
  itemKeyPressFn.mockReset();
});
