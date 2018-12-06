import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Overlay from './Overlay';

let tree;

beforeAll(() => {
  tree = mount(
    <Overlay>
      <h1>one</h1>
      <p>two</p>
    </Overlay>,
  );
});

describe('<Overlay />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
  it('should render children correctly', () => {
    expect(tree.find('h1').text()).toEqual('one');
    expect(tree.find('p').text()).toEqual('two');
  });
});
