const INLINE_STYLES = [
  { label: 'bold', style: 'BOLD' },
  { label: 'italic', style: 'ITALIC' },
  { label: 'underline', style: 'UNDERLINE' },
  { label: 'monospace', style: 'CODE' },
  { label: 'strikethrough', style: 'STRIKETHROUGH' },
];

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'quote', style: 'blockquote' },
  { label: 'uList', style: 'unordered-list-item' },
  { label: 'oList', style: 'ordered-list-item' },
  { label: 'codeblock', style: 'code-block' },
];

export {
  INLINE_STYLES,
  BLOCK_TYPES,
};