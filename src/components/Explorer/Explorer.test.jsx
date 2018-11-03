import React from 'react';
import { shallow } from 'enzyme';

import Explorer from './Explorer';
import Button from '../../blocks/Button';
import content from '../../../__tests__/data/content.json';

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

it('should render an li for each item', () => {
  // add 1 for '../root' item
  expect(wrapper.find('li').length).toEqual(content.children.length + 1);
});

it('should render the `root` directory item first', () => {
  expect(wrapper.find(Button).first().dive().text()).toEqual('<Arrow />../root');
});

it('should render directories before files', () => {
  expect(wrapper.find(Button).at(1).dive().text()).toEqual('<Dir />directoryA');
});

it('should render files after directories', () => {
  expect(wrapper.find('li').at(2).text()).toEqual('<File />fileA');
});

it('should call `props.onItemClick` when a button is clicked', () => {
  const button = wrapper.find(Button).first();
  expect(itemClickFn.mock.calls.length).toEqual(0);
  button.simulate('click');
  expect(itemClickFn.mock.calls.length).toEqual(1);
});

afterEach(() => {
  itemClickFn.mockReset();
  itemKeyPressFn.mockReset();
});
