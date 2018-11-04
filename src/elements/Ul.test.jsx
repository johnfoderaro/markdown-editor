import React from 'react';
import { shallow } from 'enzyme';

import Ul from './Ul';
import Li from './Li';

let tree;

const content = ['a', 'b', 'c'];

beforeAll(() => {
  tree = shallow(
    <Ul>
      {content.map(c => <Li key={c}>{c}</Li>)}
    </Ul>,
  );
});

describe('<Ul />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
