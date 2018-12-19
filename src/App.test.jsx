import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import App from './App';
import fileSystemGet from '../__tests__/data/filesystem/get/data.json';

let wrapper;
let instance;
let eventFnAlert;
let eventFnDir;
let eventFnFile;
let eventFnSave;
let eventFnDelete;

jest.mock('axios');

// allow for await of a promise if multiple mock calls happen per test
const promise = {
  file: {
    get: Promise.resolve({ data: { name: '100.md', data: 'file 100 data' } }),
    update: Promise.resolve({ data: 'OK' }),
    insert: Promise.resolve({ data: { id: '123' } }),
    delete: Promise.resolve({ data: 'OK' }),
  },
  filesystem: {
    get: Promise.resolve({ data: fileSystemGet }),
    rename: Promise.resolve({ data: fileSystemGet }),
    insert: Promise.resolve({ data: fileSystemGet }),
    delete: Promise.resolve({
      data: {
        _id: '001',
        id: null,
        name: 'root',
        type: 'dir',
        children: [],
      },
    }),
  },
};

describe('App', () => {
  describe('successful API requests', () => {
    beforeEach(() => {
      axios.get = jest.fn((path) => {
        if (path === '/filesystem/get/') {
          return promise.filesystem.get;
        }
        if (path === '/file/get/100/') {
          return promise.file.get;
        }
        return Promise.reject(new Error());
      });

      axios.put = jest.fn((path) => {
        if (path === '/file/update/') {
          return promise.file.update;
        }
        if (path === '/filesystem/rename/') {
          return promise.filesystem.rename;
        }
        return Promise.reject(new Error());
      });

      axios.post = jest.fn((path) => {
        if (path === '/file/insert/') {
          return promise.file.insert;
        }
        if (path === '/filesystem/insert/') {
          return promise.filesystem.insert;
        }
        return Promise.reject(new Error());
      });

      axios.delete = jest.fn((path) => {
        if (path === '/file/remove/100') {
          return promise.file.delete;
        }
        if (path === '/filesystem/remove/root/100.md') {
          return promise.filesystem.delete;
        }
        return Promise.reject(new Error());
      });
      wrapper = shallow(<App />);
      instance = wrapper.instance();
      eventFnFile = Object.assign(jest.fn(), {
        preventDefault: () => {},
        target: { dataset: { id: '100', path: 'file01', type: 'file' } },
      });
      eventFnDir = Object.assign(jest.fn(), {
        preventDefault: () => {},
        target: { dataset: { id: '', path: 'dir01', type: 'dir' } },
      });
      eventFnAlert = { preventDefault: () => {} };
      eventFnSave = { preventDefault: () => {} };
      eventFnDelete = { preventDefault: () => {} };
    });
    it('componentDidMount should make initial GET request', () => {
      expect(axios.get).toHaveBeenNthCalledWith(1, '/filesystem/get/');
    });
    it('handleCancel should reset the `alert` state', () => {

    });
    it('handleItemSelect method should GET item contents', () => {
      instance.handleItemSelect(eventFnFile);
      expect(axios.get).toHaveBeenNthCalledWith(2, '/file/get/100/');
    });
    it('handleEditorChange should update state', () => {
      const changeInput = {
        preventDefault: () => {},
        target: { localName: 'input', value: 'input new data' },
      };
      const changeTextArea = {
        preventDefault: () => {},
        target: { id: '100', localName: 'textarea', value: 'textarea new data' },
      };
      instance.handleEditorChange(changeInput);
      instance.handleEditorChange(changeTextArea);
      expect(wrapper.state('file')).toEqual({
        id: '',
        initialInput: '',
        input: 'input new data',
        textarea: 'textarea new data',
      });
    });
    it('handleAlert should handle alert dialogoues', async () => {
      window.location.reload = jest.fn();
      wrapper.setState(prevState => ({
        path: 'root',
        file: { name: '100.md', id: '100', initialInput: '100.md' },
        alert: {
          ...prevState.alert,
          type: 'error',
        },
      }));
      instance.handleAlert(eventFnAlert);
      expect(window.location.reload).toHaveBeenNthCalledWith(1, true);
      wrapper.setState(prevState => ({
        alert: {
          ...prevState.alert,
          action: 'delete',
          type: 'warning',
        },
      }));
      instance.handleAlert(eventFnAlert);
      expect(axios.delete).toHaveBeenNthCalledWith(1, '/file/remove/100');
      await promise.file.delete;
      expect(axios.delete).toHaveBeenNthCalledWith(2, '/filesystem/remove/root/100.md');
      await promise.filesystem.delete;
      expect(instance.state.file).toEqual({
        id: '',
        input: '',
        textarea: '',
        initialInput: '',
      });
      expect(instance.state.alert).toEqual({
        action: null,
        button: '',
        cancel: false,
        has: false,
        text: '',
        type: '',
      });
      expect(instance.state.tree).toEqual({
        _id: '001',
        id: null,
        name: 'root',
        type: 'dir',
        children: [],
      });
    });
    it('handleItemDelete should handle warning messages', () => {
      wrapper.setState(() => ({
        file: {
          id: '100',
          input: '100.md',
          textarea: 'file 100 data',
          initialInput: '100.md',
        },
      }));
      instance.handleItemDelete(eventFnDelete);
      expect(instance.state.alert).toEqual({
        action: 'delete',
        button: 'Ok',
        cancel: true,
        has: true,
        text: 'Delete \'root/100.md\'?',
        type: 'warning',
      });
    });
    it('handleItemSave should insert a new file when no id exists', async () => {
      wrapper.setState(() => ({
        file: {
          id: '',
          input: '01.md',
          textarea: 'file 01 data',
          initialInput: '',
        },
      }));
      instance.handleItemSave(eventFnSave);
      expect(axios.post).toHaveBeenNthCalledWith(1, '/file/insert/', {
        name: '01.md',
        data: 'file 01 data',
      });
      await promise.file.insert;
      expect(axios.post).toHaveBeenNthCalledWith(2, '/filesystem/insert/', {
        id: '123',
        name: '01.md',
        type: 'file',
        parent: 'root',
        children: [],
      });
    });
    it('handleItemSave should update the file if it has an existing id', () => {
      wrapper.setState(() => ({
        file: {
          id: '100',
          input: '100.md',
          textarea: 'file 100 new data',
          initialInput: '100.md',
        },
      }));
      instance.handleItemSave(eventFnSave);
      expect(axios.put).toHaveBeenNthCalledWith(1, '/file/update/', {
        id: '100',
        update: {
          data: 'file 100 new data',
          name: '100.md',
        },
      });
    });
    it('handleItemSave should update the file and filesystem node', async () => {
      wrapper.setState(() => ({
        file: {
          id: '100',
          input: '101.md',
          textarea: 'file 100 data',
          initialInput: '100.md',
        },
      }));
      instance.handleItemSave(eventFnSave);
      expect(axios.put).toHaveBeenNthCalledWith(1, '/file/update/', {
        id: '100',
        update: {
          data: 'file 100 data',
          name: '101.md',
        },
      });
      await promise.file.update;
      expect(axios.put).toHaveBeenNthCalledWith(2, '/filesystem/rename/', {
        name: '100.md',
        parent: 'root',
        update: { name: '101.md' },
      });
    });
    it('handleItemSave should display an alert when saving an empty file', () => {
      wrapper.setState(() => ({
        file: {
          id: '',
          input: '',
          textarea: '',
          initialInput: '',
        },
      }));
      instance.handleItemSave(eventFnSave);
      expect(instance.state.alert).toEqual({
        action: 'save',
        button: 'Ok',
        cancel: false,
        has: true,
        text: 'File must include a title and body',
        type: 'warning',
      });
      instance.handleAlert(eventFnAlert);
      expect(instance.state.alert).toEqual({
        action: null,
        button: '',
        cancel: false,
        has: false,
        text: '',
        type: '',
      });
    });
    it('traverse should walk filesystem tree', () => {
      expect(instance.traverse('root')).toEqual(instance.state.tree);
      expect(instance.traverse('dir1')).toEqual(instance.state.tree.children[0]);
      expect(instance.state.loader).toEqual(false);
    });
  });
  describe('failed API requests', () => {
    // let reject = Promise.reject(new Error());
    beforeEach(() => {
      axios.delete = jest.fn(() => Promise.reject(new Error()));
      axios.get = jest.fn(() => Promise.reject(new Error()));
      wrapper = shallow(<App />);
      instance = wrapper.instance();
    });
    it('componentDidMount should handle failed GET requests', () => {
      expect(instance.state.alert).toEqual({
        action: null,
        button: 'Reload',
        cancel: false,
        has: true,
        text: 'Something went wrong!',
        type: 'error',
      });
    });
    it('handleAlert should handle alert dialogoues', async () => {
      wrapper.setState(prevState => ({
        alert: {
          ...prevState.alert,
          action: 'delete',
          type: 'warning',
        },
      }));
      instance.handleAlert(eventFnAlert);
      await axios.delete;
      expect(instance.state.alert).toEqual({
        action: null,
        button: 'Reload',
        cancel: false,
        has: true,
        text: 'Something went wrong!',
        type: 'error',
      });
    });
    it('handleItemDelete should handle warning messages', () => {
      wrapper.setState(() => ({
        file: {
          id: '100',
          input: '100.md',
          textarea: 'file 100 data',
          initialInput: '100.md',
        },
      }));
      instance.handleItemDelete(eventFnDelete);
      expect(instance.state.alert).toEqual({
        action: 'delete',
        button: 'Ok',
        cancel: true,
        has: true,
        text: 'Delete \'root/100.md\'?',
        type: 'warning',
      });
    });
    it('handleItemSelect should handle failed item requests', () => {
      instance.handleItemSelect(eventFnDir);
      instance.handleItemSelect(eventFnFile);
      expect(instance.state.alert).toEqual({
        action: null,
        button: 'Reload',
        cancel: false,
        has: true,
        text: 'Something went wrong!',
        type: 'error',
      });
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
