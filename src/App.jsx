import React from 'react';
import { hot } from 'react-hot-loader';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';

import Container from './blocks/Container';
import Explorer from './components/Explorer';
import Editor from './components/Editor';

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
      ready: false,
      content: null,
      currentPath: 'root',
      error: false,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemKeyPress = this.handleItemKeyPress.bind(this);
    this.traverse = this.traverse.bind(this);
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/filesystem/get/');
      this.setState(() => ({ content: data, ready: true }));
    } catch (error) {
      this.setState(() => ({ error }));
    }
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
      children: children.sort((a, b) => (a.name > b.name ? 1 : -1)),
      ...items,
    });
    const nodeQueue = queue();
    nodeQueue.enqueue(content);
    current = nodeQueue.dequeue();
    while (current) {
      for (let n = 0; n < current.children.length; n += 1) {
        nodeQueue.enqueue(current.children[n]);
      }
      if (current.name === currentPath) {
        break;
      }
      current = nodeQueue.dequeue();
    }
    return sortChildren(current);
  }

  render() {
    const { currentPath, ready, error } = this.state;
    return ready && !error && (
      <>
        <GlobalStyle />
        <Container>
          <Explorer
            content={this.traverse(currentPath)}
            onItemClick={this.handleItemClick}
            onItemKeyPress={this.handleItemKeyPress}
          />
          <Editor
            data={currentPath}
          />
        </Container>
      </>
    );
  }
}

export default hot(module)(App);
