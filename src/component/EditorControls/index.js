import React from 'react';
import { BLOCK_TYPES, INLINE_STYLES } from '../../util/enum';
import ControlButton from '../ControlButton';
import ControlColorSelect from '../ControlColorSelect';
import ControlHeadSelect from '../ControlHeadSelect';

const fontColorSvg = (color = '#F5222D') => {
  return <svg width="16px" height="16px" viewBox="0 0 16 16"><g id="color-font" stroke="none" fill="none" fillRule="evenodd"><rect fill={color} stroke="#F5222D" x="2" y="12.75" width="12" height="1.5" rx="0.125"></rect><path d="M5.29102819,11.25 L3.96365715,11.25 C3.87952002,11.25 3.8113134,11.1817934 3.8113134,11.0976562 C3.8113134,11.08076 3.81412419,11.0639814 3.81963067,11.0480076 L7.0756112,1.60269506 C7.09679504,1.5412426 7.15463644,1.5 7.21963767,1.5 L8.81868806,1.5 C8.883726,1.5 8.94159158,1.54128846 8.96274706,1.60278951 L12.2118,11.048102 C12.239168,11.1276636 12.1968568,11.2143472 12.1172952,11.2417152 C12.1013495,11.2472004 12.0846037,11.25 12.067741,11.25 L10.6761419,11.25 C10.6099165,11.25 10.5512771,11.2072154 10.531066,11.1441494 L9.69970662,8.55 L6.27433466,8.55 L5.43599205,11.1444975 C5.41567115,11.2073865 5.35711879,11.25 5.29102819,11.25 Z M8.02635163,3.18571429 L7.96199183,3.18571429 L6.63904023,7.30714286 L9.33500105,7.30714286 L8.02635163,3.18571429 Z" id="A" fill="#595959"></path></g></svg>;
};
const backColorSvg = (color = '#F5222D') => {
  return <svg width="16px" height="16px" viewBox="0 0 16 16"><g id="highlight" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect stroke="#FADB14" strokeWidth="0.5" fill={color} x="2" y="12.75" width="12" height="1.5" rx="0.125"></rect><g id="Group-2" transform="translate(2.781250, 1.375000)" fillRule="nonzero"><path fill="#595959" d="M2.86079849,6.64817222 L2.05713835,5.84451208 C2.00832281,5.79569655 2.00832281,5.71655092 2.05713835,5.66773539 L3.61029491,4.11457882 L3.11963835,3.62392225 C3.07082281,3.57510672 3.07082281,3.49596109 3.11963835,3.44714556 L6.47839556,0.0883883476 C6.52721109,0.0395728112 6.60635672,0.0395728112 6.65517225,0.0883883476 L11.5165314,4.94974747 C11.5653469,4.998563 11.5653469,5.07770863 11.5165314,5.12652416 L8.15777416,8.48528137 C8.10895863,8.53409691 8.029813,8.53409691 7.98099747,8.48528137 L7.38889678,7.89318068 L5.83574021,9.44633725 C5.78692467,9.49515278 5.70777905,9.49515278 5.65896351,9.44633725 L5.0267407,8.81411444 L4.48856529,9.35326519 C4.39477378,9.44720966 4.26747335,9.5 4.13472392,9.5 L0.608857988,9.5 C0.470786801,9.5 0.358857988,9.38807119 0.358857988,9.25 C0.358857988,9.18363253 0.385247413,9.11998865 0.432210608,9.07309408 L2.86079849,6.64817222 Z M6.56678391,1.67937861 L4.71062861,3.53553391 L8.06938582,6.89429112 L9.92554112,5.03813582 L6.56678391,1.67937861 Z M3.64812861,5.75612373 L5.74735186,7.85534699 L6.54284699,7.05985186 L4.44362373,4.96062861 L3.64812861,5.75612373 Z" id="Combined-Shape"></path></g></g></svg>;
};
const logState = (editorState) => {
  console.log(editorState.toJS());
};

const BlockControls = (props) => {
  const { editorState = {}, onBlockToggle, onInlineToggle, onColorToggle, onEditorFocus, 
    onHeadToggle, hideAllModal, curBackgroundColor, curColor } = props;
  const selection = editorState.getSelection();
  const curStyle = editorState.getCurrentInlineStyle();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const commonProps = {
    editorState,
    hideAllModal,
    onEditorFocus,
  };

  return (
    <div className="CycleEditor-controls">
      <div className="controls-area">
        <ControlHeadSelect
          {...commonProps}
          onToggle={onHeadToggle}
        />
      </div>
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
        <ControlColorSelect
          onToggle={onColorToggle}
          {...commonProps}
          type="color"
          color={curColor}
          iconColorSvg={fontColorSvg}
        />
        <ControlColorSelect
          {...commonProps}
          onToggle={onColorToggle}
          type="backgroundColor"
          color={curBackgroundColor}
          iconColorSvg={backColorSvg}
        />
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
      <ControlButton
        key="log"
        title="StateToJS"
        label="log"
        onToggle={() => logState(editorState)}
      />
    </div>
  );
};

export default BlockControls;