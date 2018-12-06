import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Text from './Text';

let tree;
let handleEditorChange;

beforeAll(() => {
  handleEditorChange = jest.fn();
  tree = shallow(
    <Text>
      <Text.Name placeholder="untitled.md" value="test01.md" />
      <Text.Content placeholder="&quot;The first draft is just you telling yourself the story.&quot;" value="this is the body of test01.md" onChange={handleEditorChange} />
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
  it('should update the UI with title/data from the user', () => {
    const eventFn = { target: { value: 'some text' } };
    expect(tree.find(Text.Content).simulate('change', eventFn));
    expect(handleEditorChange).toHaveBeenCalledWith(eventFn);
    expect(handleEditorChange).toHaveBeenCalledTimes(1);
  });
  afterEach(() => handleEditorChange.mockReset());
});
