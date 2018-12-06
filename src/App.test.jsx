import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import App from './App';
import fileSystemGet from '../__tests__/data/filesystem/get/data.json';

let wrapper;
let instance;
let eventFnDir;
let eventFnFile;

jest.mock('axios');

describe('App', () => {
  beforeEach(() => {
    axios.get = jest.fn((path) => {
      if (path === '/filesystem/get/') {
        return { data: fileSystemGet };
      }
      if (path === '/file/get/100/') {
        return { name: '100.md', data: 'file 100 data' };
      }
      return new Error();
    });
    wrapper = shallow(<App />);
    instance = wrapper.instance();
    eventFnFile = Object.assign(jest.fn(), {
      preventDefault: () => {},
      target: { dataset: { path: 'file01', id: '100', type: 'file' } },
    });
    eventFnDir = Object.assign(jest.fn(), {
      preventDefault: () => {},
      target: { dataset: { path: 'dir01', id: '100', type: 'dir' } },
    });
  });
  it('componentDidMount should make initail GET request', () => {
    expect(axios.get).toHaveBeenNthCalledWith(1, '/filesystem/get/');
  });
  it('handleItemSelect method should GET item contents', () => {
    instance.handleItemSelect(eventFnDir);
    instance.handleItemSelect(eventFnFile);
    expect(axios.get).toHaveBeenNthCalledWith(2, '/file/get/100/');
  });
  it('traverse method should walk filesystem tree', () => {
    expect(instance.traverse('root')).toEqual(instance.state.data);
    expect(instance.traverse('dir1')).toEqual(instance.state.data.children[0]);
    expect(instance.state.error).toEqual(false);
    expect(instance.state.ready).toEqual(true);
  });
  afterEach(() => axios.get.mockReset());
  describe('failed API calls', () => {
    beforeEach(() => {
      axios.get = jest.fn(() => Promise.reject(new Error()));
      wrapper = shallow(<App />);
      instance = wrapper.instance();
    });
    it('componentDidMount should make initail GET request', () => {
      expect(instance.state.error).toEqual(new Error());
      expect(instance.state.ready).toEqual(false);
    });
    it('handleItemSelect method should GET item contents', () => {
      instance.handleItemSelect(eventFnDir);
      instance.handleItemSelect(eventFnFile);
      expect(instance.state.error).toEqual(new Error());
      expect(instance.state.ready).toEqual(false);
    });
    afterEach(() => axios.get.mockReset());
  });
  afterEach(() => axios.get.mockReset());
});
