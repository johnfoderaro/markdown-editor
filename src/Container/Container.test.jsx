import React from 'react';
import { shallow } from 'enzyme';

import Container from './Container';

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <Container>
      <h1>Container</h1>
    </Container>,
  );
});

it('should render a container div', () => {
  expect(wrapper.find('div')).toBe(true);
  expect(wrapper.find('h1').text()).toEqual('Container');
});
