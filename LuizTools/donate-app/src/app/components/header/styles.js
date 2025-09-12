import styled from "styled-components";
import { Color } from "../../../../GlobalStyles";

export const Nav = styled.nav`

  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: linear-gradient(
    to bottom,
    rgba(156, 197, 161, 1),
    rgba(234, 243, 236, 0)
  );
  color: #fff;
  padding-top: 50px;
`;

export const Title_img = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: center;
`

export const Img = styled.img`
    width: 80px;
    margin-right: 50px;
`;


export const H1 = styled.h1`
font-size: 2.5rem;
  color: ${Color.title};
  padding-left: 10px;
`;

export const H2 = styled.h2`
color: ${Color.paragrafo};
`;

export const Div_Paragraphe = styled.div`
width: 70%;
margin: 0 auto;
`;

export const Paragraphe = styled.p`
color: ${Color.paragrafo};
font-size: 1.2rem;
font-weight: 700;
`;