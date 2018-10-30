import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

let eventFn;

beforeEach(() => {
  eventFn = Object.assign(jest.fn(), {
    preventDefault: () => {},
    target: { dataset: { path: 'root' } },
  });
});

it('should handle item clicks', () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  instance.handleItemClick(eventFn);
  expect(instance.state.currentPath).toEqual('root');
});

it('should handle item key presses', () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  instance.handleItemKeyPress(eventFn);
  expect(instance.state.currentPath).toEqual('root');
});

it('should return an object', () => {

});

afterEach(() => eventFn.mockReset());
