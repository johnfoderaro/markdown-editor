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
      file: {
        id: '',
        input: '',
        textarea: '',
        initialInput: '',
      },
      error: false,
      loader: true,
      path: 'root',
      tree: {},
    };
    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleTextEditorChange = this.handleTextEditorChange.bind(this);
    this.traverse = this.traverse.bind(this);
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/filesystem/get/');
      this.setState(() => ({
        tree: data,
        loader: false,
      }));
    } catch (error) {
      this.setState(() => ({
        error,
        ready: false,
      }));
    }
  }

  // async handleItemCreate(event) {

  // }

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
          file: {
            id,
            input: data.name,
            textarea: data.data,
            initialInput: data.name,
          },
        }));
      } catch (error) {
        this.setState(() => ({ error }));
      }
    }
  }

  handleTextEditorChange(event) {
    event.preventDefault();
    const { localName, value } = event.target;
    this.setState((prevState) => {
      const { file } = prevState;
      file[localName] = value;
      return file;
    });
  }

  // console.log(this.state);
  // TODO if 200, show save successful feedback
  // FIXME what if saving an empty file?
  async handleSave(event) {
    event.preventDefault();
    try {
      const {
        path,
        file: {
          id,
          input,
          textarea,
          initialInput,
        },
      } = this.state;
      if (!id) {
        // add the new file
        const insertFile = await axios.post('/file/insert', {
          name: input,
          data: textarea,
        });
        // add to the filesystem
        const insertNode = await axios.post('/filesystem/insert', {
          id: insertFile.data.id,
          name: input,
          type: 'file',
          parent: path,
          children: [],
        });
        // update the state
        this.setState(() => ({
          file: {
            input,
            textarea,
            id: insertFile.data.id,
            initialInput: input,
          },
          tree: insertNode.data,
        }));
      } else {
        // update existing
        const updateFile = await axios.put('/file/update/', {
          id,
          update: {
            name: input,
            data: textarea,
          },
        });
        // check if item is being re named
        if (input !== initialInput) {
          const renameNode = await axios.put('/filesystem/rename/', {
            name: initialInput,
            parent: path,
            update: { name: input },
          });
          this.setState(prevState => ({
            file: {
              ...prevState.file,
              initialInput: input,
            },
            tree: renameNode.data,
          }));
        }
      }
    } catch (error) {
      this.setState(() => ({ error }));
    }
  }

  traverse(path) {
    let current;
    const { tree } = this.state;
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
    nodeQueue.enqueue(tree);
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
      loader,
      file: { input, textarea },
    } = this.state;
    return !loader && !error && (
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
