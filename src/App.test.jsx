import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

let wrapper;
let instance;
let eventFn;

beforeEach(() => {
  wrapper = shallow(<App />);
  instance = wrapper.instance();
  instance.state.content = {
    id: null,
    name: 'root',
    type: 'dir',
    parent: null,
    children: [{
      id: null,
      name: 'dir1',
      type: 'dir',
      parent: 'root',
      children: [{
        id: null,
        name: 'dirB',
        type: 'dir',
        parent: 'dir1',
        children: [],
      }, {
        id: '101',
        name: 'fileB',
        type: 'file',
        parent: 'dir1',
        children: [],
      }, {
        id: '102',
        name: 'fileA',
        type: 'file',
        parent: 'dir1',
        children: [],
      }, {
        id: null,
        name: 'dirA',
        type: 'dir',
        parent: 'dir1',
        children: [{
          id: '201',
          name: 'fileZ',
          type: 'file',
          parent: 'dirA',
          children: [],
        }],
      }],
    }, {
      id: '001',
      name: 'file1',
      type: 'file',
      parent: 'root',
      children: [],
    }, {
      id: '002',
      name: 'file2',
      type: 'file',
      parent: 'root',
      children: [],
    }],
  };
  eventFn = Object.assign(jest.fn(), {
    preventDefault: () => {},
    target: { dataset: { path: 'root' } },
  });
});

it('should handle item clicks', () => {
  instance.handleItemClick(eventFn);
  expect(instance.state.currentPath).toEqual('root');
});

it('should handle item key presses', () => {
  instance.handleItemKeyPress(eventFn);
  expect(instance.state.currentPath).toEqual('root');
});

it('should return object representing current item in file system tree', () => {
  expect(instance.traverse('root')).toEqual(instance.state.content);
  expect(instance.traverse('dir1')).toEqual(instance.state.content.children[0]);
});

afterEach(() => eventFn.mockReset());
