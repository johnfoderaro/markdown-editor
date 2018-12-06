import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Text from './Text';

let tree;

beforeAll(() => {
  tree = mount(
    <Text>
      <Text.Name placeholder="untitled.md" value="test01.md" />
      <Text.Content placeholder="&quot;The first draft is just you telling yourself the story.&quot;" value="this is the body of test01.md" />
    </Text>,
  );
});

describe('<Text />', () => {
  it('should be defined', () => {
    expect(tree).toBeDefined();
  });
  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
  it('should render children correctly', () => {
    expect(tree.find(Text.Name)).toBeDefined();
    expect(tree.find(Text.Content)).toBeDefined();
  });
});
