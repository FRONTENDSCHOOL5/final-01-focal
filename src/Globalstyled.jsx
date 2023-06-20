import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    font-weight: normal;
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
  }

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

  body {
    font-family: 'SpoqaHanSansNeo-Regular';
  }

  button {
    border: none;
    background: transparent;
    font-family: 'SpoqaHanSansNeo-Regular';
    cursor: pointer;

    :disabled {
      cursor: default;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    border: none;
    background: none;
    outline: none;
  }

  textarea{
    border: none;
    outline: none;
    padding: 0;
    background: transparent;
    resize: none;
    box-shadow: none;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
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
