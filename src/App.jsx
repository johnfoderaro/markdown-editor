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
      data: null,
      file: 'Edit your text here...',
      path: 'root',
      error: false,
    };
    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.traverse = this.traverse.bind(this);
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/filesystem/get/');
      this.setState(() => ({ data, ready: true }));
    } catch (error) {
      this.setState(() => ({ error, ready: false }));
    }
  }

  async handleItemSelect(event) {
    event.preventDefault();
    const { id, path, type } = event.target.dataset;
    if (type === 'dir') {
      this.setState(() => ({ path }));
    }
    if (type === 'file') {
      try {
        const { data } = await axios.get(`/file/get/${id}`);
        this.setState(() => ({ file: data }));
      } catch (error) {
        this.setState(() => ({ error, ready: false }));
      }
    }
  }

  traverse(path) {
    let current;
    const { data } = this.state;
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
    nodeQueue.enqueue(data);
    current = nodeQueue.dequeue();
    while (current) {
      for (let n = 0; n < current.children.length; n += 1) {
        nodeQueue.enqueue(current.children[n]);
      }
      if (current.name === path) {
        break;
      }
      current = nodeQueue.dequeue();
    }
    return sortChildren(current);
  }

  render() {
    const {
      path,
      error,
      ready,
      file: { data },
    } = this.state;
    return ready && !error && (
      <>
        <GlobalStyle />
        <Container>
          <Explorer
            content={this.traverse(path)}
            onItemSelect={this.handleItemSelect}
          />
          <Editor
            file={data}
          />
        </Container>
      </>
    );
  }
}

export default hot(module)(App);
