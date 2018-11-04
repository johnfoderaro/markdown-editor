import React from 'react';
import { shallow } from 'enzyme';

import Dir from './index';

let dirOpen;
let dirClosed;

beforeAll(() => {
  dirOpen = shallow(
    <Dir width="20" height="20" state="open" />,
  );
  dirClosed = shallow(
    <Dir width="20" height="20" state="closed" />,
  );
});

describe('<Dir />', () => {
  it('should be defined', () => {
    expect(dirOpen).toBeDefined();
    expect(dirClosed).toBeDefined();
  });
  it('should render correctly', () => {
    expect(dirOpen).toMatchSnapshot();
    expect(dirClosed).toMatchSnapshot();
  });
});
