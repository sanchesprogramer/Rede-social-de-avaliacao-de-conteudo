import { createGlobalStyle } from "styled-components";
import Background from "../imgs/PFVAI.jpg"
const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-family: "Reddit Mono", monospace;
  }
  
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-image: url(${Background});
    background-size: contain;
  }
`;

export default Global;