import React from 'react';
import { shallow } from 'enzyme';

import Explorer from './Explorer';
import content from '../../../__tests__/data/filesystem/get/data.json';

import Node from '../../blocks/Node';

import Ul from '../../elements/Ul';
import Li from '../../elements/Li';

let wrapper;
let onItemSelect;

beforeEach(async () => {
  onItemSelect = jest.fn();
  wrapper = shallow(
    <Explorer
      content={content.children[0]}
      onItemSelect={onItemSelect}
    />,
  );
});

describe('<Explorer />', () => {
  it('should render', () => {
    expect(wrapper).toBeDefined();
  });
  it('should render a NodeList', () => {
    expect(wrapper.find(Node.List)).toBeDefined();
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
  onItemSelect.mockReset();
});
