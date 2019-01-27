import React, { Component } from 'react';
import classnames from 'classnames';
import { COLOR_MAP } from '../../util/enum';
import './index.scss';

const selectArrow = <svg width="12px" height="12px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4025"><path d="M0 0h1024v1024H0z" fill="#FFFFFF" p-id="4026"></path><path d="M872.384 352.704L512 813.44 151.616 352.704" fill="#8b8b8b" p-id="4027"></path></svg>
const checkedSvg = <svg width="14px" height="14px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2652"><path d="M113.92 430.08a48 48 0 0 0-67.84 67.84l320 320a48 48 0 0 0 67.84 0l544-544a48 48 0 0 0-67.84-67.84L400 716.096l-286.08-286.08z" fill="#999999" p-id="2653"></path></svg>

class ControlSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      curColor: '',
    }
  }

  onToggle = (style) => {
    const { onEditorFocus, onToggle, type } = this.props;
    onEditorFocus();
    onToggle( `${type}_${style.replace('#', '')}`);
    this.setState({ curColor: style, showList: false });
  };

  onToggleShow = () => {
    const { showList } = this.state;
    this.setState({ showList: !showList });
  }

  render() {
    const { showList, curColor } = this.state;
    const { editorState, title = '', iconColorSvg, type } = this.props;
    const curStyle = editorState.getCurrentInlineStyle();
    return (
      <span title={title} className="control-btn control-select">
        <div className="cc-btn-trigger" onClick={this.onToggleShow}>
          <button className="cc-btn">
            <span className="cc-icon cc-icon-svgs">{iconColorSvg(curColor)}</span>
          </button>
          <button style={{marginLeft: -6}} className="cc-btn cc-btn-arrow">
            <span className="cc-icon cc-icon-svgs">{selectArrow}</span>
          </button>
        </div>
        <div className={classnames({
            "cc-btn-list": true, 
            "cc-btn-list-active": showList,
          })}>
          {
            COLOR_MAP.map(color => {
              const s = `${type}_${color.replace('#', '')}`;
              return (
                <span key={s} style={{border: curStyle.has(s) ? '1px solid #ccc' : null}} className="cc-btn-list-item" onMouseDown={(e) => {
                  e.preventDefault();
                  this.onToggle(color);
                }}>
                  <span style={{ backgroundColor: color }}></span>
                  {curStyle.has(s) && <span className="cc-icon cc-icon-svgs cc-icon-checked">{checkedSvg}</span>}
                </span>
              )
            })
          }
        </div>
      </span>
    )
  }
};

export default ControlSelect;