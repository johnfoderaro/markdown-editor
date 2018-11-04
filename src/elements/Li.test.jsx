import React from 'react';
import { shallow } from 'enzyme';

import Li from './Li';

let tree;

beforeAll(() => {
  tree = shallow(
    <Li>
      Test
    </Li>,
  );
});

describe('<Li />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
