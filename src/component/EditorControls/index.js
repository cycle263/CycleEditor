import React from 'react';
import { BLOCK_TYPES, INLINE_STYLES } from '../../util/enum';
import ControlButton from '../ControlButton';

const BlockControls = (props) => {
  const { editorState = {} } = props;
  const selection = editorState.getSelection();
  const curStyle = editorState.getCurrentInlineStyle();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="CycleEditor-controls">
      {BLOCK_TYPES.map((type, i) =>
        <ControlButton
          isLast={BLOCK_TYPES.length === i + 1}
          key={type.label}
          title={type.title}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onBlockToggle}
          style={type.style}
        />
      )}
      {INLINE_STYLES.map((type, i) =>
        <ControlButton
          isLast={BLOCK_TYPES.length === i + 1}
          key={type.label}
          title={type.title}
          active={curStyle.has(type.style)}
          label={type.label}
          onToggle={props.onInlineToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default BlockControls;