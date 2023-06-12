import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --main-color: #fca91b;
    --main-text-color: #464343;
    --sub-text-color: #767676;
    --border-color: #dbdbdb;
    --white: #fff;
    --light-gray: #c4c4c4;
    --red: #eb5757;
  }

  * {
    box-sizing: border-box;
    color: var(--main-text-color);
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;
