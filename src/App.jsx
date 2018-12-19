import React from 'react';
import { hot } from 'react-hot-loader';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';

import Container from './blocks/Container';
import Overlay from './blocks/Overlay';
import Message from './blocks/Message';

import Alert from './components/Alert';
import Editor from './components/Editor';
import Explorer from './components/Explorer';

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
      alert: {
        action: null,
        cancel: false,
        button: '',
        has: false,
        text: '',
        type: '',
      },
      file: {
        id: '',
        input: '',
        textarea: '',
        initialInput: '',
      },
      loader: true,
      path: 'root',
      tree: {},
    };
    this.handleAlert = this.handleAlert.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleItemSave = this.handleItemSave.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.traverse = this.traverse.bind(this);
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/filesystem/get/');
      this.setState(() => ({ tree: data, loader: false }));
    } catch (error) {
      this.setState(() => ({
        alert: {
          action: null,
          button: 'Reload',
          cancel: false,
          has: true,
          text: 'Something went wrong!',
          type: 'error',
        },
      }));
    }
  }

  async handleAlert(event) {
    event.preventDefault();
    const { alert, file, path } = this.state;
    if (alert.type === 'error') {
      window.location.reload(true);
    }
    if (alert.action === 'rename') {
      const {
        id,
        input,
        initialInput,
        textarea,
      } = file;
      const updateNode = await axios.put('/file/update/', {
        id,
        update: {
          name: input,
          data: textarea,
        },
      });
      const renameNode = await axios.put('/filesystem/rename/', {
        name: initialInput,
        parent: path,
        update: { name: input },
      });
      this.setState(prevState => ({
        alert: {
          action: null,
          button: '',
          cancel: false,
          has: false,
          text: '',
          type: '',
        },
        file: {
          ...prevState.file,
          initialInput: input,
        },
        tree: renameNode.data,
      }));
    }
    if (alert.type === 'warning' && alert.action === 'save') {
      this.setState(() => ({
        alert: {
          action: null,
          cancel: false,
          button: '',
          has: false,
          text: '',
          type: '',
        },
      }));
    }
    if (alert.type === 'warning' && alert.action === 'delete') {
      try {
        const { file: { id, initialInput }, path } = this.state;
        const name = initialInput;
        const deleteFile = await axios.delete(`/file/remove/${id}`);
        const deleteNode = await axios.delete(`/filesystem/remove/${path}/${name}`);
        this.setState(() => ({
          file: {
            id: '',
            input: '',
            textarea: '',
            initialInput: '',
          },
          alert: {
            action: null,
            cancel: false,
            button: '',
            has: false,
            text: '',
            type: '',
          },
          tree: deleteNode.data,
        }));
      } catch (error) {
        this.setState(() => ({
          alert: {
            action: null,
            button: 'Reload',
            cancel: false,
            has: true,
            text: 'Something went wrong!',
            type: 'error',
          },
        }));
      }
    }
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState(() => ({
      alert: {
        action: null,
        button: '',
        cancel: false,
        has: false,
        type: '',
        text: '',
      },
    }));
  }

  handleEditorChange(event) {
    event.preventDefault();
    const { localName, value } = event.target;
    this.setState((prevState) => {
      const { file } = prevState;
      file[localName] = value;
      return { file };
    });
  }
  // handleNewFile() {

  // }

  // async handleNewDir() {

  // }

  async handleItemDelete(event) {
    const { file: { input }, path } = this.state;
    event.preventDefault();
    this.setState(() => ({
      alert: {
        action: 'delete',
        button: 'Ok',
        cancel: true,
        has: true,
        text: `Delete '${path}/${input}'?`,
        type: 'warning',
      },
    }));
  }

  // console.log(this.state);
  // TODO if 200, show save successful feedback
  // FIXME what if saving an empty file?
  async handleItemSave(event) {
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
        tree,
      } = this.state;

      const duplicate = tree.children.find(node => node.name === input);

      if (duplicate) {
        return this.setState(() => ({
          alert: {
            action: 'save',
            button: 'Ok',
            cancel: false,
            has: true,
            text: `${input} already exists`,
            type: 'warning',
          },
        }));
      }

      if (!input && !textarea) {
        return this.setState(() => ({
          alert: {
            action: 'save',
            button: 'Ok',
            cancel: false,
            has: true,
            text: 'File must include a title and body',
            type: 'warning',
          },
        }));
      }

      if (!id) {
        const insertFile = await axios.post('/file/insert/', {
          name: input,
          data: textarea,
        });

        const insertNode = await axios.post('/filesystem/insert/', {
          id: insertFile.data.id,
          name: input,
          type: 'file',
          parent: path,
          children: [],
        });

        return this.setState(() => ({
          file: {
            input,
            textarea,
            id: insertFile.data.id,
            initialInput: input,
          },
          tree: insertNode.data,
        }));
      }

      if (input !== initialInput) {
        return this.setState(() => ({
          alert: {
            action: 'rename',
            button: 'Ok',
            cancel: true,
            has: true,
            text: `Rename ${initialInput} \n to ${input}?`,
            type: 'warning',
          },
        }));
      }

      const updateNode = await axios.put('/file/update/', {
        id,
        update: {
          name: input,
          data: textarea,
        },
      });
    } catch (error) {
      return this.setState(() => ({
        alert: {
          action: null,
          button: 'Reload',
          cance: false,
          has: true,
          text: 'Something went wrong!',
          type: 'error',
        },
      }));
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
          file: {
            id,
            input: data.name,
            textarea: data.data,
            initialInput: data.name,
          },
        }));
      } catch (error) {
        this.setState(() => ({
          alert: {
            action: null,
            button: 'Reload',
            cancel: false,
            has: true,
            text: 'Something went wrong!',
            type: 'error',
          },
        }));
      }
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
      alert,
      path,
      loader,
      file: { input, textarea },
    } = this.state;
    if (alert.has) {
      // TODO build out Alert function that returns object of props
      return (
        <>
          <GlobalStyle />
          <Alert
            alert={alert}
            handleCancel={this.handleCancel}
            handleClick={this.handleAlert}
          />
        </>
      );
    }
    if (loader) {
      return (
        <>
          <GlobalStyle />
          <Overlay>
            <Message>
              <Message.Loader />
            </Message>
          </Overlay>
        </>
      );
    }
    return (
      <>
        <GlobalStyle />
        <Container>
          <Explorer
            content={this.traverse(path)}
            onItemSelect={this.handleItemSelect}
          />
          <Editor
            input={input}
            textarea={textarea}
            handleChange={this.handleEditorChange}
            handleDelete={this.handleItemDelete}
            handleSave={this.handleItemSave}
          />
        </Container>
      </>
    );
  }
}

export default hot(module)(App);
