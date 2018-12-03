import React from 'react';
import { shallow } from 'enzyme';

import Action from './Action';

let tree;

beforeAll(() => {
  tree = shallow(
    <Action>
      <Action.Button type="new">
        New
      </Action.Button>
      <Action.Button type="save">
        Save
      </Action.Button>
      <Action.Button type="delete">
        Delete
      </Action.Button>
    </Action>,
  );
});

describe('<Action />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
    expect(tree.find(Action.Button).at(0).props().type).toEqual('new');
    expect(tree.find(Action.Button).at(1).props().type).toEqual('save');
    expect(tree.find(Action.Button).at(2).props().type).toEqual('delete');
  });
  it('should contain a <Action.Button /> block', () => {
    tree.find(Action.Button).at(0).simulate('hover');
  });
});
