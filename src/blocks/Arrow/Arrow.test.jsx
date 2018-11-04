import React from 'react';
import { shallow } from 'enzyme';

import Arrow from './index';

let tree;

beforeAll(() => {
  tree = shallow(
    <Arrow width="20" height="20" />,
  );
});

describe('<Arrow />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
