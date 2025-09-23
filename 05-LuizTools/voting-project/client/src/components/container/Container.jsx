import React from "react";
import Header from "../header/Header"; 
import Article from "../article/Article";
import Footer from "../footer/Footer";

import {
  AsideStyles,
  MainStyles,
  FooterStyles,
  ContainerStyles as ContainerStyle,
  HeaderStyles,
  ContentWrapper,
} from "./styles";
const Container = () => {
  return (
    <ContainerStyle>
      <ContentWrapper>
        <AsideStyles>
          <h1>Aside</h1>
        </AsideStyles>
        <MainStyles>
          <HeaderStyles>
            <Header/>
          </HeaderStyles>
          <Article />
        </MainStyles>
      </ContentWrapper>
        <Footer />
    </ContainerStyle>
  );
};

export default Container;
