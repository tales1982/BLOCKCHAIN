import styled from "styled-components";
import GlobalStyle from "../../GlobalStyles";

export const HeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;

`;

export const TitlesStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Div = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export const ImageStyle = styled.div`
  display: flex;
  justify-content:start;
`;

export const ArticleStyles = styled.article`
  padding-top: 30px;
  font-weight: 500;
`;

export const H1 = styled.h1`
  padding-top: 30px;
  font-family: "Sixtyfour Convergence", sans-serif;
  font-weight: 900;
  color: #006666;
  font-size: 3em;
  font-variation-settings: "BLED" 25, "SCAN" 4, "XELA" 0, "YELA" 0;
`;

export const H2 = styled.h2`
  font-family: "Sixtyfour Convergence", sans-serif;
  font-weight: 900;
  color: #008584;
  font-variation-settings: "BLED" 25, "SCAN" 4, "XELA" 0, "YELA" 0;
`;

export const P = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Sixtyfour Convergence", sans-serif;
  font-weight: 600;
  color: #2f2f4d;
`;

export const Img = styled.img`
  margin: 15px;
  height: 160px;
  width: 160px;
`;
