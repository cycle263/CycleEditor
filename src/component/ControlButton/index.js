import React, { Component } from 'react';
import classnames from 'classnames';

class ControlButton extends Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  
  render() {
    const { active, label } = this.props;
    return (
      <span className={classnames({
        controlBtn: true,
        controlBtn_active: active,
      })} onMouseDown={this.onToggle}>{label}</span>
    )
  }
};

export default ControlButton;