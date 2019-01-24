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

export {
  INLINE_STYLES,
  BLOCK_TYPES,
  COLOR_TYPES,
  EDITOR_STYLE_MAP,
};