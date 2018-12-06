import React from 'react';
import { hot } from 'react-hot-loader';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';

import Action from './blocks/Action';
import Container from './blocks/Container';
import Overlay from './blocks/Overlay';
import Message from './blocks/Message';

import Explorer from './components/Explorer';
import Editor from './components/Editor';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html { height: 100%; }
  body {
    height: 100%;
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
      id: null,
      file: null,
      ready: false,
      path: 'root',
      error: false,
      editor: {
        input: '',
        textarea: '',
      },
    };
    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleTextEditorChange = this.handleTextEditorChange.bind(this);
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
        const { data } = await axios.get(`/file/get/${id}/`);
        this.setState(() => ({
          id,
          file: data.name,
          editor: {
            input: data.name,
            textarea: data.data,
          },
        }));
      } catch (error) {
        this.setState(() => ({ error, ready: false }));
      }
    }
  }

  handleTextEditorChange(event) {
    event.preventDefault();
    const { localName, value } = event.target;
    this.setState((prevState) => {
      const { editor } = prevState;
      editor[localName] = value;
      return editor;
    });
  }

  async handleSave(event) {
    event.preventDefault();
    // FIXME when saving an existing file when there is no change in text, API returns 404
    const { id, editor: { textarea } } = this.state;
    await axios.put('/file/update/', { id, update: { data: textarea } });
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
      editor: { input, textarea },
    } = this.state;
    return ready && !error && (
      <>
        <GlobalStyle />
        {/* <Overlay>
          <Message>
            <Message.Svg type="loader" />
            <Message.Text>Some Error</Message.Text>
            <Action type="overlay">
              <Action.Button type="inverse">Ok</Action.Button>
            </Action>
          </Message>
        </Overlay> */}
        <Container>
          <Explorer
            content={this.traverse(path)}
            onItemSelect={this.handleItemSelect}
          />
          <Editor
            input={input}
            textarea={textarea}
            handleChange={this.handleTextEditorChange}
            handleSave={this.handleSave}
          />
        </Container>
      </>
    );
  }
}

export default hot(module)(App);
