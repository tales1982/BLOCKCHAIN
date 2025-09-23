import styled from "styled-components";
import { Color } from "../../GlobalStyles";

export const Footer = styled.section`
  width: 100vw;
  text-align: center;
  background: linear-gradient(
    to bottom,
    rgba(156, 197, 161, .3),
    rgba(234, 243, 236, .1)
  );
  padding: 20px;

  p {
    color: ${Color.paragrafo};
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
`;
