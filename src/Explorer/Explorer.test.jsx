import React from 'react';
import { shallow } from 'enzyme';

import Explorer from './Explorer';
// import Button from '../Button';

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
      content={content}
      onItemClick={itemClickFn}
      onItemKeyPress={itemKeyPressFn}
    />,
  );
});

it('should render an li for each item in root', () => {
  expect(wrapper.find('li').length).toEqual(content.children.length);
});

it('should call `props.onItemClick` when a button is clicked', () => {
  const button = wrapper.find('button').first();
  expect(itemClickFn.mock.calls.length).toEqual(0);
  button.simulate('click');
  expect(itemClickFn.mock.calls.length).toEqual(1);
  expect(itemClickFn.mock.calls[0][0]).toEqual(content.children[0].data);
});

// it('should show a `back` button when viewing content inside of root', () => {
//   wrapper = shallow(
//     <Explorer
//       content={content.children[0]}
//       onItemClick={itemClickFn}
//       onItemKeyPress={itemKeyPressFn}
//     />,
//   );
//   console.log(wrapper.find('button'));
//   expect(wrapper.find('button')[1].text()).toEqual(`../${content.children[0].parent}`);
// });

afterEach(() => {
  itemClickFn.mockReset();
  itemKeyPressFn.mockReset();
});
