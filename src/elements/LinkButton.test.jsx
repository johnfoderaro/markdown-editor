import React from 'react';
import { shallow } from 'enzyme';

import LinkButton from './LinkButton';

let tree;

beforeAll(() => {
  tree = shallow(
    <LinkButton>
      Test
    </LinkButton>,
  );
});

describe('<LinkButton />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
