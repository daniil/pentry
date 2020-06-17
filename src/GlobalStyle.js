import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  body {
    font-family: 'Nunito';
    font-size: 16px;
  }
`;

export default GlobalStyle;