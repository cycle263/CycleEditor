const INLINE_STYLES = [
  { label: 'bold', style: 'BOLD', title: '加粗' },
  { label: 'italic', style: 'ITALIC', title: '斜体' },
  { label: 'underline', style: 'UNDERLINE', title: '下划线' },
  { label: 'code', style: 'CODE', title: '代码' },
  { label: 'strikethrough', style: 'STRIKETHROUGH', title: '删除线' },
];

const BLOCK_TYPES = [
  { label: 'h1', style: 'header-one', title: '标题1' },
  { label: 'h2', style: 'header-two', title: '标题2' },
  { label: 'h3', style: 'header-three', title: '标题3' },
  { label: 'h4', style: 'header-four', title: '标题4' },
  { label: 'h5', style: 'header-five', title: '标题5' },
  { label: 'h6', style: 'header-six', title: '标题6' },
  { label: 'quote', style: 'blockquote', title: '引用' },
  { label: 'uList', style: 'unordered-list-item', title: '无序列表' },
  { label: 'oList', style: 'ordered-list-item', title: '有序列表' },
  { label: 'codeblock', style: 'code-block', title: '代码块' },
];

const COLOR_MAP = [
  '#191919', '#3B3738', '#161616', '#000000',
  '#2B2B2B', '#404040', '#585858', '#190019',
  '#C63D0F', '#DE1B1B', '#FF4136', '#B22222',
  '#7D1935', '#B71427', '#FF0000', '#E44424',
  '#9370DB', '#B10DC9', '#FF69B4', '#FFC0CB',
  '#FFD700', '#DAA520', '#D9853B', '#FF851B',
  '#FFA500', '#FF9009', '#FF8C00', '#FF7F50',
  '#FFF056', '#FFDC00', '#FFE658', '#F3FAB6',
  '#005A31', '#A8CD1B', '#CBE32D', '#ADFF2F',
  '#3D9970', '#2ECC40', '#00FF00', '#118C4E',
  '#228B22', '#E9E581', '#C1E1A6', '#A2AB58',
  '#00008B', '#4A96AD', '#6DBDD6', '#67BCDB',
  '#191970', '#0074D9', '#7FDBFF', '#39CCCC',
  '#AAAAAA', '#DDDDDD', '#DFE2DB', '#ECECEA',
  '#FDF3E7', '#FEFBEC', '#F6F6F6', '#FFFFFF',
  '#FAEBD7', '#F5F5F5', '#F8F8FF', '#FFFAF0'
];

const COLOR_MAP_FUNC = (arr, type) => {
  let obj = {};
  arr.forEach(item => {
    obj[`${type}_${item.replace('#', '')}`] = {[`${type}`]: item};
  });
  return obj;
};

// Custom overrides for "code" style.
const EDITOR_STYLE_MAP = (() => {
  const COLOR_MAP_STYLE = COLOR_MAP_FUNC(COLOR_MAP, 'color');
  const BACKGROUND_COLOR_MAP_STYLE = COLOR_MAP_FUNC(COLOR_MAP, 'backgroundColor');
  return {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
    ...COLOR_MAP_STYLE,
    ...BACKGROUND_COLOR_MAP_STYLE,
  }
})();

export {
  INLINE_STYLES,
  BLOCK_TYPES,
  EDITOR_STYLE_MAP,
  COLOR_MAP,
};