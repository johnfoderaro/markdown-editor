import React from 'react';
import { shallow } from 'enzyme';

import Editor from './Editor';

import Text from '../../blocks/Text';

let wrapper;
let text;

beforeAll(() => {
  text = 'Hello, world!';
  wrapper = shallow(<Editor file={text} />);
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
