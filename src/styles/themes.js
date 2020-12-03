const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(16),
  base: calcRem(20),
  lg: calcRem(30),
  xl: calcRem(40),
  xxl: calcRem(50),
  xxxl: calcRem(60),
  titleSize: calcRem(80),
};

const boxShadows = {
  default: '0px 2px 2px rgba(0, 0, 0, 0.25)',
};

const colors = {
  bamboo: '#88b234',
  light_black: '#333040',
  light_white: '#f8f8f8',
  pastel_lavender: '#dad7ff',
  pastel_blue: '#e1eaff',
  pastel_pink: '#E8D7FF',
  pastel_red: '#ffd7d7',
};

const themes = {
  fontSizes,
  boxShadows,
  colors,
};

export default themes;
