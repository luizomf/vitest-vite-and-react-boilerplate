# Creating a boilerplate for React 18 in ViteJS

## Editorconfig

If your are using editorconfig, this is my config:

```
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

## For ESLint and Prettier

```
npm i eslint @babel/eslint-parser @babel/preset-env @babel/preset-react prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-storybook -D
```

Create the files `.eslintrc.js`, `.prettierrc.js` and a file called
`babel.config.js`.

.eslintrc.js

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
```

.prettierrc.js

```javascript
module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  insertPragma: false,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  vueIndentScriptAndStyle: false,
  embeddedLanguageFormatting: 'off',
};
```

babel.config.js

```javascript
module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
```

## Prop-types?

If your are using proptypes, install it:

```
npm i prop-types
```

And use:

## Testing

For tests, we're going to use `vitest` and `testing-library`.

### For vitest

```
npm i -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

Now, in your vite.config.js:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src',
  build: {
    outDir: '../dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['../.test/setup.js'],
    include: ['**/*(*.)?{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
  },
});
```

For the file in `/.test/setup.js`, use:

```javascript
import '@testing-library/jest-dom';
import 'jest-styled-components';
```

Ps.: I added `jest-styled-components` to make it easy for me. I am going to use
Styled-Components. If your aren't, please comment that line out.

### For Styled Components

```
npm i styled-components
npm i -D jest-styled-components @types/styled-components
```

Create a folder called styles in `src`. Add the files `render-theme.jsx`,
`global-styles.jsx`, `theme.js` and a `styled-theme-provider.jsx`.

The file `theme.js` is where you should add the theme for your application, for
example (the most simple and ugly theme you would ever see):

```javascript
export const theme = {
  colors: {
    primary: 'red',
    secondary: 'blue',
  },
};
```

The `global-styles.jsx` is where we add the global theme for our application.
Here we can add fonts, provide css reset and more.

```javascript
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }
`;
```

The `styled-theme-provider.jsx` makes things easier by providing the theme to
other components.

```javascript
import { ThemeProvider } from 'styled-components';
import Proptypes from 'prop-types';
import { GlobalStyles } from './global-styles';
import { theme } from './theme';

export const StyledThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

StyledThemeProvider.propTypes = {
  children: Proptypes.node.isRequired,
};
```

The file `render-theme.jsx` is going to be used for tests. It will provide the
`StyledThemeProvider` so we can use styled-components in our tests.

This is the most basic version of the `renderTheme` function.

```javascript
import { render } from '@testing-library/react';
import { StyledThemeProvider } from './styled-theme-provider';

export const renderTheme = (children) => {
  return render(<StyledThemeProvider>{children}</StyledThemeProvider>);
};
```

And on the `main.jsx`, you may want to wrap everything using
`StyledThemeProvider`.

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledThemeProvider } from './styles/styled-theme-provider';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledThemeProvider>
      <App />
    </StyledThemeProvider>
  </React.StrictMode>,
);
```
