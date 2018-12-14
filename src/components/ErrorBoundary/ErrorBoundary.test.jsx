import React from 'react';
import { mount } from 'enzyme';

import ErrorBoundary from './ErrorBoundary';

let treeError;
let treeNoError;

let treeErrorInstance;

class BadComponent extends React.Component {
  componentDidMount() {
    throw new Error();
  }

  render() {
    return (
      <h1>Oh no!</h1>
    );
  }
}

beforeAll(() => {
  treeError = mount(
    <ErrorBoundary>
      <BadComponent />
    </ErrorBoundary>,
  );
  treeNoError = mount(
    <ErrorBoundary>
      <h1>Hello World</h1>
    </ErrorBoundary>,
  );
  treeErrorInstance = treeError.instance();
});

describe('<ErrorBoundary />', () => {
  it('should render', () => {
    expect(treeError).toBeDefined();
    expect(treeNoError).toBeDefined();
    expect(ErrorBoundary).toBeDefined();
  });
  it('should render children', () => {
    expect(treeNoError.find('h1').text()).toEqual('Hello World');
  });
  it('should catch exceptions from other components', () => {
    expect(treeErrorInstance.state.hasError).toBe(true);
  });
  it('should reload the window object when `reload` is clicked', () => {
    window.location.reload = jest.fn();
    treeError.find('button').simulate('click');
    expect(window.location.reload).toHaveBeenNthCalledWith(1, true);
  });
});
