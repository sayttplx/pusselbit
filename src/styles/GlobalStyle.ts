import { createGlobalStyle } from 'styled-components';
import './fonts.css';

const GlobalStyle = createGlobalStyle`

  html, #root {
    height: 100%;
  }

  * { box-sizing: border-box; }

  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    height: 100%;
    text-align: center;
  }

`;

export default GlobalStyle;