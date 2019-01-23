import React from 'react';
import { BLOCK_TYPES } from '../../util/enum';
import ControlButton from '../ControlButton';

const BlockControls = (props) => {
  const { editorState = {} } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="CycleEditor-controls">
      {BLOCK_TYPES.map(type =>
        <ControlButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default BlockControls;