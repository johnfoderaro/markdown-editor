import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Panel from './Panel';

let panelEditorTree;
let panelExplorerTree;

beforeAll(() => {
  panelExplorerTree = mount(
    <Panel type="explorer">
      <h1>one</h1>
      <p>two</p>
    </Panel>,
  );
  panelEditorTree = mount(
    <Panel type="editor">
      <h1>one</h1>
      <p>two</p>
    </Panel>,
  );
});

// it('renders with extended and active=1', () => {
//   const secondaryWrapper = shallow(<SideHeader extended={false} active={1} />);
//   const icon = secondaryWrapper.find('Icon').first().dive();
//   expect(icon).toBeTruthy();
// });

describe('<Panel />', () => {
  it('should be defined', () => {
    expect(panelEditorTree).toBeDefined();
    expect(panelExplorerTree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(panelEditorTree).toMatchSnapshot();
    expect(panelExplorerTree).toMatchSnapshot();
  });
  it('should receive a `type` prop for different styles', () => {
    expect(panelEditorTree).toHaveStyleRule('width', '80%');
    expect(panelExplorerTree).toHaveStyleRule('width', '20%');
    expect(panelEditorTree).toHaveStyleRule('background', '#fff');
    expect(panelExplorerTree).toHaveStyleRule('background', '#eee');
  });
  it('should render children correctly', () => {
    expect(panelEditorTree.find('h1').text()).toEqual('one');
    expect(panelEditorTree.find('p').text()).toEqual('two');
    expect(panelExplorerTree.find('h1').text()).toEqual('one');
    expect(panelExplorerTree.find('p').text()).toEqual('two');
  });
});
