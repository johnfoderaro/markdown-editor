import React from 'react';
import { hot } from 'react-hot-loader';
import { createGlobalStyle } from 'styled-components';

import Container from './Container';
import Explorer from './Explorer';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-size: 18px;
    font-family: 
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Helvetica,
      Arial,
      sans-serif,
      'Apple Color Emoji', 
      'Segoe UI Emoji',
      'Segoe UI Symbol';
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        data: 'root',
        parent: null,
        children: [{
          data: 'directory1',
          type: 'directory',
          parent: 'root',
          children: [{
            data: 'directoryB',
            type: 'directory',
            parent: 'directory1',
            children: [],
          }, {
            data: 'fileB',
            type: 'file',
            parent: 'directory1',
            children: [],
          }, {
            data: 'fileA',
            type: 'file',
            parent: 'directory1',
            children: [],
          }, {
            data: 'directoryA',
            type: 'directory',
            parent: 'directory1',
            children: [{
              data: 'fileZ',
              type: 'file',
              parent: 'directoryA',
              children: [],
            }],
          }],
        }, {
          data: 'file1',
          type: 'file',
          parent: 'root',
          children: [],
        }, {
          data: 'file2',
          type: 'file',
          parent: 'root',
          children: [],
        }],
      },
      currentPath: 'root',
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemKeyPress = this.handleItemKeyPress.bind(this);
    this.traverse = this.traverse.bind(this);
  }

  handleItemClick(event) {
    event.preventDefault();
    const { path } = event.target.dataset;
    this.setState(() => ({ currentPath: path }));
  }

  handleItemKeyPress(event) {
    event.preventDefault();
    const { path } = event.target.dataset;
    this.setState(() => ({ currentPath: path }));
  }

  traverse(currentPath) {
    let current;
    const { content } = this.state;
    const queue = () => {
      const items = [];
      return {
        enqueue(n) {
          items.push(n);
        },
        dequeue() {
          return items.shift();
        },
      };
    };
    // TODO break this into its own method
    // could be useful for other sort scenarios
    // alphabetical, reverse alphabetical, time ascending/descending etc
    const sortChildren = ({ children, ...items }) => ({
      children: children.sort((a, b) => (a.data > b.data ? 1 : -1)),
      ...items,
    });
    const nodeQueue = queue();
    nodeQueue.enqueue(content);
    current = nodeQueue.dequeue();
    while (current) {
      for (let n = 0; n < current.children.length; n += 1) {
        nodeQueue.enqueue(current.children[n]);
      }
      if (current.data === currentPath) {
        break;
      }
      current = nodeQueue.dequeue();
    }
    return sortChildren(current);
  }

  render() {
    const { currentPath } = this.state;
    return (
      <>
        <GlobalStyle />
        <Container>
          <Explorer
            content={this.traverse(currentPath)}
            onItemClick={this.handleItemClick}
            onItemKeyPress={this.handleItemKeyPress}
          />
        </Container>
      </>
    );
  }
}

export default hot(module)(App);
