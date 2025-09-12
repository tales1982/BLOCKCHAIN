"use client";

import React, { useState, useEffect } from "react";
import { Button, Container, ContaineBtn, Img, Description, BtnDiv, P, Span, DivCard } from "../../css/sectionHomeStyles";
import { doLogin, getLastCampaignId, getCampaign } from "@/services/Web3Service"; // Importe suas funções Web3
import Header from "../components/header/Header";
import Link from "next/link";
import Footer from "../components/footer/Footer";
import CampaignCard from "../components/campaignCard/page"; // Importando o card

const SectionHome = () => {
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  // Função para verificar se há carteira armazenada no localStorage ao carregar a página
  useEffect(() => {
    const savedWallet = localStorage.getItem("walletAddress");
    if (savedWallet) {
      setWallet(savedWallet); // Se já existir, atualiza o estado da carteira
    }
  }, []);

  const connectWallet = () => {
    doLogin()
      .then((wallet) => {
        setWallet(wallet);
        localStorage.setItem("walletAddress", wallet); // Armazena a carteira no localStorage
      })
      .catch((error) => setError(error.message));
  };

  // Função para carregar campanhas da blockchain
  const loadCampaigns = async () => {
    try {
      const lastId = await getLastCampaignId(); // Pegue o último ID de campanha
      const campaignsList = [];
      for (let i = 0; i < lastId; i++) {
        const campaign = await getCampaign(i); // Carregar cada campanha
        campaignsList.push(campaign);
      }
      setCampaigns(campaignsList); // Atualize o estado com a lista de campanhas
    } catch (err) {
      console.error("Error loading campaigns:", err);
      setError(err.message);
    }
  };

  // Carrega campanhas quando a carteira estiver conectada
  useEffect(() => {
    if (wallet) {
      loadCampaigns();
    }
  }, [wallet]);

  return (
    <>
      {!wallet ? (
        <Container>
          <Header />
          <P>{wallet}</P>
          <P>{error}</P>
          <BtnDiv>
            <Button size="large" onClick={connectWallet}>
              <Img src="/icon/metamask1.png" alt="" /> Conect Wallet!
            </Button>
          </BtnDiv>
          <Footer />
        </Container>
      ) : (
        <Container>
          <Header />
          <Description>
            <P>Welcome <Span>{wallet}</Span></P>
            <P>Your decentralized donation platform.</P>
            <P>Create your campaign or donate to existing campaigns</P>
          </Description>
          <ContaineBtn>
            <div>
              <Button size="large">
                <Link href="/donate">I want to make a donation</Link>
              </Button>
              <Button size="large">
                <Link href="/createCampaign">I want to create a campaign</Link>
              </Button>
            </div>
            <DivCard>
              {campaigns.length > 0 ? (
                campaigns.map((campaign, index) => (
                  <CampaignCard key={index} campaign={campaign} />
                ))
              ) : (
                <P>No campaigns available</P>
              )}
            </DivCard>
            <Footer />
          </ContaineBtn>
        </Container>
      )}
    </>
  );
};

export default SectionHome;
