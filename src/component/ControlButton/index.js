import React, { Component } from 'react';
import classnames from 'classnames';
import './index.scss';

class ControlButton extends Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(props.style);
    };
  }

  render() {
    const { active, label, title, fontDisabled } = this.props;

    return (
      <span title={title} className={classnames({
        'control-btn': true,
        'control-btn-active': active,
        'control-btn-disabeld': fontDisabled,
      })} onMouseDown={!fontDisabled ? this.onToggle : null}>
        <button className="cc-btn"><span className={classnames(['cc-icon', `cc-icon-${label}`])}></span></button>
      </span>
    )
  }
};

export default ControlButton;