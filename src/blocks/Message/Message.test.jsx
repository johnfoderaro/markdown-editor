import React from 'react';
import { shallow } from 'enzyme';

import Message from './Message';

let tree;

beforeAll(() => {
  tree = shallow(
    <Message>
      <h1>one</h1>
      <p>two</p>
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
  it('should render children correctly', () => {
    expect(tree.find('h1').text()).toEqual('one');
    expect(tree.find('p').text()).toEqual('two');
  });
});
