import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  body {
    background-color: ${props => props.theme.colors.light};
    font-family: 'Nunito';
    font-size: 100%;
    line-height: 1.65;
    color: ${props => props.theme.colors.darkOne};
  }
  p { margin-bottom: 1.15rem; }
  h1, h2, h3, h4, h5 {
    margin: 2.75rem 0 1.05rem;
    line-height: 1.15;
  }
  h1 {
    margin-top: 0;
    font-size: ${props => props.theme.typeScale[0]}rem;
  }
  h2 { font-size: ${props => props.theme.typeScale[1]}rem; }
  h3 { font-size: ${props => props.theme.typeScale[2]}rem; }
  h4 { font-size: ${props => props.theme.typeScale[3]}rem; }
  h5 { font-size: ${props => props.theme.typeScale[4]}rem; }
  small, .text_small { font-size: ${props => props.theme.typeScale[5]}rem; }
`;

export default GlobalStyle;