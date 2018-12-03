import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

let tree;

beforeAll(() => {
  tree = shallow(
    <Button type="new">
      Test
    </Button>,
  );
});

describe('<Button />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
