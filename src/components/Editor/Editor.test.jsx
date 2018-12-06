import React from 'react';
import { shallow } from 'enzyme';

import Editor from './Editor';

import Text from '../../blocks/Text';

let wrapper;
let name;
let data;

beforeAll(() => {
  name = 'hello-world.md';
  data = 'Hello, world!';
  wrapper = shallow(<Editor name={name} data={data} />);
});

describe('<Editor />', () => {
  it('should render', () => {
    expect(wrapper).toBeDefined();
  });
  it('should render text editor containing <Text />', () => {
    expect(wrapper.find(Text)).toBeDefined();
    expect(wrapper.find(Text.Content)).toBeDefined();
  });
});
