// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

export const Color = {
  bg1: "#9cc5a1",
  bg2: "#eaf3ec",
  colorTitle: "#00D2DF",
  bordBtn1: "#a2673d",
  title: "#107acc",
  //title: '#5099EC',
  destaqueParagrafo: "#106FAB",
  paragrafo: "#001540",
};

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background: url("/kinder3.avif") no-repeat center center fixed;
background-size: cover;

    color: #333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;

/*fazendo um teste no vercel*/
