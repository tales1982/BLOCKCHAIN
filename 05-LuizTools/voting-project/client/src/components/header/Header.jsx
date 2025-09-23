import React from "react";
import {
  HeaderStyle,
  TitlesStyle,
  ImageStyle,
  ArticleStyles,
  Div,
  H1,
  H2,
  Img,
  P,
} from "./styles"; // Importe o Container corretamente

const Header = () => {
  return (
    <HeaderStyle>
      <TitlesStyle>
        <Div>
        <H1>Student Elections 2024: </H1>
        <H2>The Future in the Age of Smart Contracts</H2>
        <ArticleStyles>
          <P>
            Welcome to the official platform for student elections in smart
            contracts! Experience innovation and transparency with blockchain
            <P>
              technology, enabling a secure and modern voting process. Vote,
              track real-time results, and see how our technology is reshaping
              elections.
            </P>
          </P>
        </ArticleStyles>
        </Div>
      <ImageStyle>
        <Img
          src="https://i.pinimg.com/originals/2b/23/5e/2b235e5507d90a2796bb8ebad20c7e86.png"
          alt="Grafico de blockchain"
        />
      </ImageStyle>
      </TitlesStyle>
    </HeaderStyle>
  );
};

export default Header;
