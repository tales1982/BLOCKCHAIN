import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,700;1,400&family=Sixtyfour+Convergence&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* Adicione mais estilos globais conforme necessário */
`;

export default GlobalStyle;
