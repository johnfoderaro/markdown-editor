import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Alert from './Alert';

let error;
let success;
let warning;

beforeAll(() => {
  const handleAlertClick = jest.fn();
  error = mount(
    <Alert
      text="this is an alert"
      type="error"
      button="Reload"
      handleClick={handleAlertClick}
    />,
  );
  success = mount(
    <Alert
      text="this is an alert"
      type="success"
      button="Ok"
      handleClick={handleAlertClick}
    />,
  );
  warning = mount(
    <Alert
      text="this is an alert"
      type="warning"
      button="Ok"
      handleClick={handleAlertClick}
    />,
  );
});

describe('<Alert />', () => {
  it('should be defined', () => {
    expect(error).toBeDefined();
    expect(success).toBeDefined();
    expect(warning).toBeDefined();
  });
  it('should render correctly', () => {
    expect(error).toMatchSnapshot();
    expect(success).toMatchSnapshot();
    expect(warning).toMatchSnapshot();
  });
});
