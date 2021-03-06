import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const Globalstyle = createGlobalStyle`
  ${reset};
  @font-face {
    font-family: 'Spoqa Han Sans';
    font-weight: 200;
    src: url('./fonts/Spoqa\ Han\ Sans\ Thin.woff2') format('woff2'),
      url('./fonts/Spoqa\ Han\ Sans\ Thin.woff') format('woff'),
      url('./fonts/Spoqa\ Han\ Sans\ Thin.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'Spoqa Han Sans';
    font-weight: 300;
    src: url('./fonts/Spoqa\ Han\ Sans\ Light.woff2') format('woff2'),
      url('./fonts/Spoqa\ Han\ Sans\ Light.woff') format('woff'),
      url('./fonts/Spoqa\ Han\ Sans\ Light.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'Spoqa Han Sans';
    font-style: normal;
    font-weight: 400;
    src: url('./fonts/Spoqa\ Han\ Sans\ Regular.woff2') format('woff2'),
      url('./fonts/Spoqa\ Han\ Sans\ Regular.woff') format('woff'),
      url('./fonts/Spoqa\ Han\ Sans\ Regular.ttf') format('truetype');
  }
  
  @font-face {
    font-family: 'Spoqa Han Sans';
    font-weight: 500;
    src: url('./fonts/Spoqa\ Han\ Sans\ Bold.woff2') format('woff2'),
      url('./fonts/Spoqa\ Han\ Sans\ Bold.woff') format('woff'),
      url('./fonts/Spoqa\ Han\ Sans\ Bold.ttf') format('truetype');
  }
  
  body {
    font-family: 'Spoqa Han Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #1e1e2f;
    color: #ced4da;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;
export default Globalstyle;
