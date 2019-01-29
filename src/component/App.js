import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, Modifier, getDefaultKeyBinding, removeEditorStyles } from 'draft-js';
import EditorControls from './EditorControls';
import './clean.scss';
import { EDITOR_STYLE_MAP } from '../util/enum';
import './App.scss';
import './block.scss'

class CycleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      hideAllModal: false,
    };
    this.onChange = (editorState) => this.setState({ editorState });
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.focus = () => this.editor.focus();
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
  }

  // 颜色toggle
  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // 当前光标区域只激活一个颜色
    const nextContentState = Object.keys(EDITOR_STYLE_MAP)
      .filter(item => item.indexOf('color_') > -1)
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
    console.log(currentStyle, currentStyle.toJS())
    this.onChange(nextEditorState);
  }

  // 增加超链接
  _addLink() {
    // @url 来自弹框的用户输入
    const { editorState, url } = this.state;
    const contentState = editorState.getCurrentContent();
    // contentState上新建entity
    const contentStateWithEntity = contentState.createEmpty('LINK', 'MUTABLE', { url });
    // 获取新建entity的key
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    // 把entity的contentState set到editorState中
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    // 对应entity和选中的文本内容
    this.setState({
      editorState: RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey),
      url: '',
    }, () => {
      setTimeout(() => this.editor.focus(), 0);
    });
  }

  // 编辑器命令
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

  // 隐藏所有modal
  hideAllModal = () => {
    this.setState({
      hideAllModal: true,
    }, function(){
      this.setState({
        hideAllModal: false,
      });
    });
  }

  focusEnd = () => {
    EditorState.moveFocusToEnd();
  }

  componentDidMount() {
    this.focus();
  }

  render() {
    const { editorState, hideAllModal } = this.state;
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
      <div className="container" onClick={this.hideAllModal}>
        <h2 style={{textAlign: 'center'}}>Cycle Rich Editor</h2>
        <div className="CycleEditor-root">
          <EditorControls editorState={editorState} 
            onBlockToggle={this.toggleBlockType} 
            onInlineToggle={this.toggleInlineStyle}
            onColorToggle={this.toggleColor}
            onHeadToggle={this.toggleBlockType}
            onEditorFocus={this.focus}
            hideAllModal={hideAllModal}
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
        <footer><a target="_blank" rel="noopener noreferrer" href="https://draftjs.org/">Draft.js</a></footer>
      </div>
    );
  }
}

function getBlockStyle(block) {
  const type = block.getType();
  if (type) {
    return `CycleEditor-${type}`;
  } else {
    return null;
  }
}

export default CycleEditor;
