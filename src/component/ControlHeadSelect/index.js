import React, { Component } from 'react';
import classnames from 'classnames';
import { HEAD_TYPES } from '../../util/enum';
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

  componentDidMount() {
    this.onToggle(HEAD_TYPES[1].style);
  }

  render() {
    const { showList } = this.state;
    const { editorState, title = '', } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    const selectedHead = HEAD_TYPES.filter(item => item.style === blockType)[0] || HEAD_TYPES[0];
    
    return (
      <span title={title} className="control-btn control-head-select">
        <div className="cc-btn-trigger" onClick={this.onToggleShow}>
          <button className="cc-btn">
            <span className="cc-button-inner-text">{selectedHead.title}</span>
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
            HEAD_TYPES.map(option => {
              const isChecked = blockType === option.style;
              return (
                <span key={option.style} className="cc-head-item" onMouseDown={(e) => {
                  e.preventDefault();
                  this.onToggle(option.style);
                }}>
                  <span style={{ fontSize: option.size, fontWeight: option.style !== 'unstyled' ? 700 : null }}>{option.title}</span>
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