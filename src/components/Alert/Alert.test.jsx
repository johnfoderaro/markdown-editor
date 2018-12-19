import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Alert from './Alert';

let error;
let success;
let warning;

beforeAll(() => {
  const errorAlert = {
    action: 'save',
    cancel: false,
    text: 'this is an alert',
    type: 'error',
    button: 'Reload',
  };
  const successAlert = {
    action: 'save',
    cancel: false,
    text: 'this is an alert',
    type: 'success',
    button: 'Ok',
  };
  const warningAlert = {
    action: 'save',
    cancel: false,
    text: 'this is an alert',
    type: 'warning',
    button: 'Reload',
  };
  const handleAlertClick = jest.fn();
  error = mount(
    <Alert
      alert={errorAlert}
      handleClick={handleAlertClick}
    />,
  );
  success = mount(
    <Alert
      alert={successAlert}
      handleClick={handleAlertClick}
    />,
  );
  warning = mount(
    <Alert
      alert={warningAlert}
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
