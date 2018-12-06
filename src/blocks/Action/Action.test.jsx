import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Action from './Action';

let editorTree;
let explorerTree;
let overlayTree;

beforeAll(() => {
  editorTree = mount(
    <Action type="editor">
      <Action.Button type="new">New</Action.Button>
      <Action.Button type="save">Save</Action.Button>
      <Action.Button type="delete">Delete</Action.Button>
      <Action.Button type="inverse">Inverse</Action.Button>
    </Action>,
  );
  explorerTree = mount(
    <Action type="explorer">
      <Action.Button type="new">New</Action.Button>
      <Action.Button type="save">Save</Action.Button>
      <Action.Button type="delete">Delete</Action.Button>
      <Action.Button type="inverse">Inverse</Action.Button>
    </Action>,
  );
  overlayTree = mount(
    <Action type="overlay">
      <Action.Button type="new">New</Action.Button>
      <Action.Button type="save">Save</Action.Button>
      <Action.Button type="delete">Delete</Action.Button>
      <Action.Button type="inverse">Inverse</Action.Button>
    </Action>,
  );
});

describe('<Action />', () => {
  it('should be defined', () => {
    expect(editorTree).toBeDefined();
    expect(explorerTree).toBeDefined();
    expect(overlayTree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(editorTree).toMatchSnapshot();
    expect(explorerTree).toMatchSnapshot();
    expect(overlayTree).toMatchSnapshot();
  });
  it('should contain an <Action.Button /> block', () => {
    expect(editorTree.find(Action.Button)).toBeDefined();
    expect(explorerTree.find(Action.Button)).toBeDefined();
    expect(overlayTree.find(Action.Button)).toBeDefined();
  });
});
