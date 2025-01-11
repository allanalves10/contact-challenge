
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: #FFF;
    font-family: 'Montserrat', sans-serif;
  }

  body, input, button {
    font-size: 14px;
  }

  button {
    cursor: pointer;
  }
`;
