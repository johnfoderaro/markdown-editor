import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

let wrapper;
let instance;
let eventFn;

beforeEach(() => {
  wrapper = shallow(<App />);
  instance = wrapper.instance();
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
