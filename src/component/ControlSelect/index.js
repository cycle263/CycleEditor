import React, { Component } from 'react';
import classnames from 'classnames';
import { COLOR_MAP } from '../../util/enum';
import './index.scss';

const colorIconSvg = (color = '#F5222D') => {
  return <svg width="16px" height="16px" viewBox="0 0 16 16"><g id="color-font" stroke="none" fill="none" fillRule="evenodd"><rect fill={color} id="Rectangle-55" stroke="#F5222D" x="2" y="12.75" width="12" height="1.5" rx="0.125"></rect><path d="M5.29102819,11.25 L3.96365715,11.25 C3.87952002,11.25 3.8113134,11.1817934 3.8113134,11.0976562 C3.8113134,11.08076 3.81412419,11.0639814 3.81963067,11.0480076 L7.0756112,1.60269506 C7.09679504,1.5412426 7.15463644,1.5 7.21963767,1.5 L8.81868806,1.5 C8.883726,1.5 8.94159158,1.54128846 8.96274706,1.60278951 L12.2118,11.048102 C12.239168,11.1276636 12.1968568,11.2143472 12.1172952,11.2417152 C12.1013495,11.2472004 12.0846037,11.25 12.067741,11.25 L10.6761419,11.25 C10.6099165,11.25 10.5512771,11.2072154 10.531066,11.1441494 L9.69970662,8.55 L6.27433466,8.55 L5.43599205,11.1444975 C5.41567115,11.2073865 5.35711879,11.25 5.29102819,11.25 Z M8.02635163,3.18571429 L7.96199183,3.18571429 L6.63904023,7.30714286 L9.33500105,7.30714286 L8.02635163,3.18571429 Z" id="A" fill="#595959"></path></g></svg>;
};
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
    this.props.onToggle( `color_${style.replace('#', '')}`);
    this.setState({ curColor: style, showList: false });
  };

  onToggleShow = () => {
    const { showList } = this.state;
    this.setState({ showList: !showList });
  }

  render() {
    const { showList, curColor } = this.state;
    const { editorState, title = '' } = this.props;
    const curStyle = editorState.getCurrentInlineStyle();
    return (
      <span title={title} className="control-btn control-select">
        <div className="cc-btn-trigger" onClick={this.onToggleShow}>
          <button className="cc-btn">
            <span className="cc-icon cc-icon-svgs">{colorIconSvg(curColor)}</span>
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
              const s = `color_${color.replace('#', '')}`;
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