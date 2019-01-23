import React from 'react';
import { INLINE_STYLES } from '../../util/enum';
import ControlButton from '../ControlButton';

const InlineControls = (props) => {
  const { editorState = {} } = props;
  let curStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="CycleEditor-controls">
      {INLINE_STYLES.map(type =>
        <ControlButton
          key={type.label}
          active={curStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default InlineControls;