import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import App from './App';
import fileSystemGet from '../__tests__/data/filesystem/get/data.json';

let wrapper;
let instance;
let eventFnDir;
let eventFnFile;
let eventFnSave;

jest.mock('axios');

// allow for await of a promise if multiple mock calls happen per test
const promise = {
  file: {
    get: Promise.resolve({ data: { name: '100.md', data: 'file 100 data' } }),
    update: Promise.resolve({ data: 'OK' }),
    insert: Promise.resolve({ data: { id: '123' } }),
  },
  filesystem: {
    get: Promise.resolve({ data: fileSystemGet }),
    rename: Promise.resolve({ data: fileSystemGet }),
    insert: Promise.resolve({ data: fileSystemGet }),
  },
};

describe('App', () => {
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
    eventFnSave = { preventDefault: () => {} };
  });
  it('componentDidMount should make initail GET request', () => {
    expect(axios.get).toHaveBeenNthCalledWith(1, '/filesystem/get/');
  });
  it('handleItemSelect method should GET item contents', () => {
    instance.handleItemSelect(eventFnFile);
    expect(axios.get).toHaveBeenNthCalledWith(2, '/file/get/100/');
  });
  it('handleTextEditorChange should update state', () => {
    const changeInput = {
      preventDefault: () => {},
      target: { localName: 'input', value: 'input new data' },
    };
    const changeTextArea = {
      preventDefault: () => {},
      target: { id: '100', localName: 'textarea', value: 'textarea new data' },
    };
    instance.handleTextEditorChange(changeInput);
    instance.handleTextEditorChange(changeTextArea);
    expect(wrapper.state('file')).toEqual({
      id: '',
      initialInput: '',
      input: 'input new data',
      textarea: 'textarea new data',
    });
  });
  it('handleSave should insert a new file when no id exists', async () => {
    wrapper.setState(() => ({
      file: {
        id: '',
        input: '01.md',
        textarea: 'file 01 data',
        initialInput: '',
      },
    }));
    instance.handleSave(eventFnSave);
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
  it('handleSave should update the file if it has an existing id', () => {
    wrapper.setState(() => ({
      file: {
        id: '100',
        input: '100.md',
        textarea: 'file 100 new data',
        initialInput: '100.md',
      },
    }));
    instance.handleSave(eventFnSave);
    expect(axios.put).toHaveBeenNthCalledWith(1, '/file/update/', {
      id: '100',
      update: {
        data: 'file 100 new data',
        name: '100.md',
      },
    });
  });
  it('handleSave should update the file and filesystem node', async () => {
    wrapper.setState(() => ({
      file: {
        id: '100',
        input: '101.md',
        textarea: 'file 100 data',
        initialInput: '100.md',
      },
    }));
    instance.handleSave(eventFnSave);
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
  it('should traverse method should walk filesystem tree', () => {
    expect(instance.traverse('root')).toEqual(instance.state.tree);
    expect(instance.traverse('dir1')).toEqual(instance.state.tree.children[0]);
    expect(instance.state.loader).toEqual(false);
  });
  afterEach(() => jest.clearAllMocks());
});
