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

export {
  INLINE_STYLES,
  BLOCK_TYPES,
};