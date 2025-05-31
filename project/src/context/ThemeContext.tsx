import { createContext, useContext } from 'react';
import { Theme } from '../types';

export const ThemeContext = createContext<Theme>({
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);