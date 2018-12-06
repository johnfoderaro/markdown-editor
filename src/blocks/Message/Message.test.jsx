import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Message from './Message';

let tree;

beforeAll(() => {
  tree = mount(
    <Message>
      <Message.Error />
      <Message.Warning />
      <Message.Success />
      <Message.Loader />
    </Message>,
  );
});

describe('<Message />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
  it('should render svg icons correctly', () => {
    expect(tree.find(Message.Error)).toBeDefined();
    expect(tree.find(Message.Warning)).toBeDefined();
    expect(tree.find(Message.Success)).toBeDefined();
    expect(tree.find(Message.Loader)).toBeDefined();
  });
});
