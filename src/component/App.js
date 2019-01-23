import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import EditorControls from './EditorControls';
import './App.css';
// import image from '../logo.svg';

class CycleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({ editorState });
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.focus = () => this.editor.focus();
  }

  _mapKeyToEditorCommand(e) {
    const { editorState } = this.state;
    switch (e.keyCode) {
      case 9: // TAB
        const newEditorState = RichUtils.onTab(e, editorState, 4,/* maxDepth */);
        if (newEditorState !== editorState) {
          this.onChange(newEditorState);
        }
        return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const { editorState } = this.state;
    let className = 'CycleEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' CycleEditor-hidePlaceholder';
      }
    }
    return (
      <div>
        <h2 style={{textAlign: 'center'}}>Cycle Rich Editor</h2>
        <div className="CycleEditor-root">
          <EditorControls editorState={editorState} onBlockToggle={this.toggleBlockType} onInlineToggle={this.toggleInlineStyle} />
          <div className={className} onClick={this.focus}>
            <Editor editorState={editorState}
              blockStyleFn={getBlockStyle}
              handleKeyCommand={this.handleKeyCommand}
              placeholder="Enter some text..."
              customStyleMap={styleMap}
              ref={(ref) => this.editor = ref}
              onChange={this.onChange} 
              spellCheck={true} />
          </div>
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': 
      return 'CycleEditor-blockquote';
    default: return null;
  }
}

export default CycleEditor;
