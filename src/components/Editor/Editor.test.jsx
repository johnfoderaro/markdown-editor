import React from 'react';
import { shallow } from 'enzyme';

import Editor from './Editor';

import Text from '../../blocks/Text';

const handleChange = jest.fn();
let wrapper;
let input;
let textarea;

beforeAll(() => {
  input = 'hello-world.md';
  textarea = 'Hello, world!';
  wrapper = shallow(<Editor input={input} textarea={textarea} handleChange={handleChange} />);
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
