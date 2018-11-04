import React from 'react';
import { shallow } from 'enzyme';

import File from './index';

let tree;

beforeAll(() => {
  tree = shallow(
    <File width="20" height="20" />,
  );
});

describe('<File />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
