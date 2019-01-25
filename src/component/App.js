import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, Modifier, getDefaultKeyBinding, removeEditorStyles } from 'draft-js';
import EditorControls from './EditorControls';
import './clean.scss';
import { EDITOR_STYLE_MAP } from '../util/enum';
import './App.scss';
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
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
  }

  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(EDITOR_STYLE_MAP)
      .filter(item => item !== 'CODE')
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }
    this.onChange(nextEditorState);
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
      case 83: // `S` key 
        return 'cycle-editor-save';
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

  onPaste = () => {
    this.setState({
      editorState: removeEditorStyles(this.state.editorState)
    });
  }

  render() {
    const { editorState } = this.state;
    let placeholder = 'Enter some text...';
    let className = 'CycleEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' CycleEditor-hidePlaceholder';
        placeholder = null;
      }
    }
    return (
      <div>
        <h2 style={{textAlign: 'center'}}>Cycle Rich Editor</h2>
        <div className="CycleEditor-root">
          <EditorControls editorState={editorState} 
            onBlockToggle={this.toggleBlockType} 
            onInlineToggle={this.toggleInlineStyle}
            onColorToggle={this.toggleColor}
             />
          <div className={className} onClick={this.focus}>
            <Editor editorState={editorState}
              blockStyleFn={getBlockStyle}
              keyBindingFn={this.mapKeyToEditorCommand}
              handleKeyCommand={this.handleKeyCommand}
              placeholder={placeholder}
              customStyleMap={EDITOR_STYLE_MAP}
              ref={(ref) => this.editor = ref}
              onChange={this.onChange}
              onPaste={this.onPaste}
              spellCheck={true} />
          </div>
        </div>
      </div>
    );
  }
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': 
      return 'CycleEditor-blockquote';
    default: return null;
  }
}

export default CycleEditor;
