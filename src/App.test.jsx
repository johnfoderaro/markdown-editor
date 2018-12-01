import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import App from './App';
import fileSystemGet from '../__tests__/data/filesystem/get/data.json';

let wrapper;
let instance;
let eventFn;

jest.mock('axios');

describe('App', () => {
  describe('event listeners', () => {
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
  });
  describe('successful API calls', () => {
    beforeEach(() => {
      axios.get = () => Promise.resolve({ data: fileSystemGet });
      wrapper = shallow(<App />);
      instance = wrapper.instance();
    });
    it('should make a GET request to `/filesystem/get`', () => {
      expect(instance.traverse('root')).toEqual(instance.state.data);
      expect(instance.traverse('dir1')).toEqual(instance.state.data.children[0]);
      expect(instance.state.error).toEqual(false);
      expect(instance.state.ready).toEqual(true);
    });
  });
  describe('failed API calls', () => {
    beforeEach(() => {
      axios.get = () => Promise.reject(new Error());
      wrapper = shallow(<App />);
      instance = wrapper.instance();
    });
    it('should make a GET request to `/filesystem/get`', () => {
      expect(instance.state.error).toEqual(new Error());
      expect(instance.state.ready).toEqual(false);
    });
  });
});
