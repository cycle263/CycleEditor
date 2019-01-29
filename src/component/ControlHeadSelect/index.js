import React, { Component } from 'react';
import classnames from 'classnames';
import { SelectArrow, CheckedSvg } from '../common/commonSvgs';
import './index.scss';

class ControlHeadSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
    }
  }

  onToggle = (style) => {
    this.props.onToggle(style);
    this.setState({ showList: false });
  };

  onToggleShow = (e) => {
    e.stopPropagation();
    this.props.onEditorFocus();
    const { showList } = this.state;
    this.setState({ showList: !showList });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hideAllModal === true) {
      this.setState({ showList: false });
    }
  }

  render() {
    const { showList } = this.state;
    const { editorState, title = '', selectStypes, fontDisabled } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    let selectedHead = selectStypes.filter(item => item.style === blockType)[0];
    let isDefaultValue = selectedHead === undefined;
    const isHead = title === '标题正文';
    selectedHead = isDefaultValue ? selectStypes[0] : selectedHead;
    
    return (
      <span title={title} className={classnames({
        'control-btn': true, 
        'control-head-select': true,
        'control-btn-disabeld': fontDisabled,
      })}>
        <div className="cc-btn-trigger" onClick={!fontDisabled ? this.onToggleShow : null}>
          <button className="cc-btn">
            <span className="cc-button-inner-text">{isHead ? selectedHead.title : selectedHead.size}</span>
          </button>
          <button style={{ marginLeft: -6 }} className="cc-btn cc-btn-arrow">
            <span className="cc-icon cc-icon-svgs">{SelectArrow}</span>
          </button>
        </div>
        <div className={classnames({
          "cc-btn-list": true,
          "cc-btn-list-active": showList,
        })}>
          {
            selectStypes.map((option, i) => {
              const isChecked = blockType === option.style || (isDefaultValue && i === 0);
              return (
                <span key={option.style} title={option.title} className="cc-head-item" onMouseDown={(e) => {
                  e.preventDefault();
                  this.onToggle(option.style);
                }}>
                  <span style={{ fontSize: isHead ? option.size : 14, fontWeight: option.style !== 'unstyled' ? 700 : null }}>{isHead ? option.title : option.size}</span>
                  {isChecked && <span className="cc-icon cc-icon-svgs cc-icon-checked">{CheckedSvg}</span>}
                </span>
              )
            })
          }
        </div>
      </span>
    )
  }
};

export default ControlHeadSelect;