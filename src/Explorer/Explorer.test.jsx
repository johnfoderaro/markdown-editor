import React from 'react';
import { shallow } from 'enzyme';

import Explorer from './Explorer';
import Button from '../Button';

let content;
let wrapper;
let itemClickFn;
let itemKeyPressFn;

beforeEach(() => {
  content = {
    data: 'root',
    parent: null,
    children: [{
      data: 'directory1',
      type: 'directory',
      parent: 'root',
      children: [{
        data: 'fileA',
        type: 'file',
        parent: 'directory1',
        children: [],
      }, {
        data: 'directoryA',
        type: 'directory',
        parent: 'directory1',
        children: [{
          data: 'fileZ',
          type: 'file',
          parent: 'directoryA',
          children: [],
        }],
      }],
    }, {
      data: 'file1',
      type: 'file',
      parent: 'root',
      children: [],
    }, {
      data: 'file2',
      type: 'file',
      parent: 'root',
      children: [],
    }],
  };
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
  expect(wrapper.find('li').length).toEqual(content.children[0].children.length + 1);
});

it('should render the `root` directory item first', () => {
  expect(wrapper.find(Button).first().dive().text()).toEqual('../root');
});

it('should render directories before files', () => {
  expect(wrapper.find(Button).at(1).dive().text()).toEqual('directoryA');
});

it('should render files after directories', () => {
  expect(wrapper.find('li').at(1).text()).toEqual('fileA');
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
