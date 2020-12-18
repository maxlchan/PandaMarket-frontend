import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import themes from '../styles/themes';

const ThemeProviderWrapper = ({ children }) => (
  <ThemeProvider theme={themes}>{children}</ThemeProvider>
);

// set this util test to avoid stlyed component with enzyme error issue
export const shallowWithTheme = (tree) =>
  shallow(tree, {
    wrappingComponent: ThemeProviderWrapper,
  });

export const mountWithTheme = (tree) =>
  mount(tree, {
    wrappingComponent: ThemeProviderWrapper,
  });
