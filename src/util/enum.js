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

const COLOR_TYPES = [
  {label: 'Red', style: 'red', title: '红色'},
  {label: 'Orange', style: 'orange', title: '橘色'},
  {label: 'Yellow', style: 'yellow', title: '黄色'},
  {label: 'Green', style: 'green', title: '绿色'},
  {label: 'Blue', style: 'blue', title: '蓝色'},
  {label: 'Indigo', style: 'indigo', title: '紫蓝色'},
  {label: 'Violet', style: 'violet', title: '紫罗兰'},
];

// Custom overrides for "code" style.
const EDITOR_STYLE_MAP = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
};

const COLOR_MAP = [
  '#191919', '#3B3738', '#161616', '#000000',
  '#2B2B2B', '#404040', '#585858', '#191919',
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
]

export {
  INLINE_STYLES,
  BLOCK_TYPES,
  COLOR_TYPES,
  EDITOR_STYLE_MAP,
};