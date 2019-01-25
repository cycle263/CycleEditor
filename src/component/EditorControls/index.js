import React from 'react';
import { BLOCK_TYPES, INLINE_STYLES, COLOR_TYPES } from '../../util/enum';
import ControlButton from '../ControlButton';
import ControlSelect from '../ControlSelect';

const BlockControls = (props) => {
  const { editorState = {}, onBlockToggle, onInlineToggle, onColorToggle } = props;
  const selection = editorState.getSelection();
  const curStyle = editorState.getCurrentInlineStyle();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="CycleEditor-controls">
      <div className="controls-area">
        {BLOCK_TYPES.map((type, i) =>
          <ControlButton
            key={type.label}
            title={type.title}
            active={type.style === blockType}
            label={type.label}
            onToggle={onBlockToggle}
            style={type.style}
          />
        )}
      </div>
      <div className="controls-area">
        {INLINE_STYLES.map((type, i) =>
          <ControlButton
            key={type.label}
            title={type.title}
            active={curStyle.has(type.style)}
            label={type.label}
            onToggle={onInlineToggle}
            style={type.style}
          />
        )}
      </div>
      <div className="controls-area">
        <ControlSelect
          editorState={editorState}
          onToggle={onColorToggle}
          options={COLOR_TYPES}
        />
      </div>
    </div>
  );
};

export default BlockControls;