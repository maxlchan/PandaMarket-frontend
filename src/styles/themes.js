const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(60),
};

const boxShadows = {
  default: '0px 2px 2px rgba(0, 0, 0, 0.25)',
};

const colors = {
  bamboo: '#88b234',
  light_black: '#333040',
  light_white: '#f8f8f8',
  lavender: '#dad7ff',
  purple: '#e1eaff',
  pastel_blue: '#E8D7FF',
  pastel_red: '#ffd7d7',
};

const themes = {
  fontSizes,
  boxShadows,
  colors,
};

export default themes;
