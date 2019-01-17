import React, { Component } from 'react';
import {Editor, EditorState, RichUtils,AtomicBlockUtils} from 'draft-js';
import './index.css';
import image from './media.png';

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '16em',
    cursor: 'text',
    padding: 16,
  },
  buttons: {
    marginBottom: 16,
    marginRight: 16,
  },
  urlInputContainer: {
    marginBottom: 16,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 16,
    padding: '3px 8px',
  },
};

const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media} />;
};
const Image = (props) => {
  return <img src={props.src} style={styles.media} alt="" />;
};
const Video = (props) => {
  return <video controls src={props.src} style={styles.media} />;
};
const Media = (props) => {
  const entity = props.contentState.getEntity( props.block.getEntityAt(0) );
  const {src} = entity.getData();
  const type = entity.getType();
  let media;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }
  return media;
};

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
}

class CycleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showURLInput: false,
      urlValue: '',
      urlType: '',
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.addImage = this.addImage.bind(this);
    this.confirmMedia = this._confirmMedia.bind(this);
    this.onURLChange = (e) => this.setState({urlValue: e.target.value});
    this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
    this.focus = () => this.refs.editor.focus();
  }

  _onBoldClick() {
    const { editorState } = this.state;
    console.log(editorState.getCurrentContent(), editorState.getCurrentInlineStyle());
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    this.addImage = this._addImage.bind(this);
  }

  addImage() {
    this._promptForMedia('image');
  }

  _onURLInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmMedia(e);
    }
  }

  _confirmMedia(e) {
    e.preventDefault();
    const {editorState, urlValue, urlType} = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      urlType,
      'IMMUTABLE',
      {src: urlValue}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity}
    );
    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.focus(), 0);
    });
  }

  _promptForMedia(type) {
    this.setState({
      showURLInput: true,
      urlValue: '',
      urlType: type,
    });
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    const { editorState, urlValue, showURLInput } = this.state;
    return (
      <div style={styles.editor}>
        <ul>
          <li><img src={image} alt="" /></li>
        </ul>
        <button style={styles.button} onMouseDown={this.addImage}>Add Image</button>
        <button style={styles.button} type="button" onClick={this._onBoldClick.bind(this)}>Bold</button>
        {showURLInput && <div style={styles.urlInputContainer}>
          <input
            onChange={this.onURLChange}
            ref="url"
            style={styles.urlInput}
            type="text"
            value={urlValue}
            onKeyDown={this.onURLInputKeyDown}
          />
          <button onMouseDown={this.confirmMedia}>
            Confirm
          </button>
        </div>}
        <Editor editorState={editorState} 
          blockRendererFn={mediaBlockRenderer}
          handleKeyCommand={this.handleKeyCommand}
          placeholder="Enter some text..."
          ref="editor"
          onChange={this.onChange} />
      </div>
    );
  }
}

export default CycleEditor;
