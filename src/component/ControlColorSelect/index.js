import React, { Component } from 'react';
import classnames from 'classnames';
import { SelectArrow, CheckedSvg } from '../common/commonSvgs';
import { COLOR_MAP } from '../../util/enum';
import './index.scss';

class ControlColorSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      curColor: '',
    }
  }

  onToggle = (style) => {
    const { onToggle, type } = this.props;
    onToggle(`${type}_${style.replace('#', '')}`);
    this.setState({ curColor: style, showList: false });
  };

  onToggleShow = (e) => {
    e.stopPropagation();
    const { showList } = this.state;
    this.setState({ showList: !showList });
    this.props.onEditorFocus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hideAllModal === true) {
      this.setState({ showList: false });
    }
  }

  render() {
    const { showList, curColor } = this.state;
    const { editorState, iconColorSvg, type, title } = this.props;
    const curStyle = editorState.getCurrentInlineStyle();
    return (
      <span title={title} className="control-btn control-color-select">
        <div className="cc-btn-trigger" onClick={this.onToggleShow}>
          <button className="cc-btn">
            <span className="cc-icon cc-icon-svgs">{iconColorSvg(curColor)}</span>
          </button>
          <button style={{marginLeft: -6}} className="cc-btn cc-btn-arrow">
            <span className="cc-icon cc-icon-svgs">{SelectArrow}</span>
          </button>
        </div>
        <div className={classnames({
            "cc-btn-list": true, 
            "cc-btn-list-active": showList,
          })}>
          {
            COLOR_MAP.map(color => {
              const s = `${type}_${color.replace('#', '')}`;
              const isChecked = curStyle.has(s);
              return (
                <span key={s} style={{ border: isChecked ? '1px solid #ccc' : null}} className="cc-btn-list-item" onMouseDown={(e) => {
                  e.preventDefault();
                  this.onToggle(color);
                }}>
                  <span style={{ backgroundColor: color }}></span>
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

export default ControlColorSelect;