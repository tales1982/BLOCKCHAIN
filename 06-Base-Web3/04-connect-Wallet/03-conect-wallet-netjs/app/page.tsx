'use client'

import styled from 'styled-components'
import ConectWallet from './components/conectWallet/ConectWallet';

const Section = styled.main`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
`


export default function Home() {
  return (
    <Section>
      <h1>Conect Wallet!</h1>
      <ConectWallet/>
    </Section>
  );
}
