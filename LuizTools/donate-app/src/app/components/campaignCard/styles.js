import styled from 'styled-components';
import { Color } from "../../../../GlobalStyles";


export const Content = styled.div`
  display: flex;
  flex-direction: column !important;
  background: linear-gradient(
    to bottom,
    rgba(156, 197, 161, 1),
    rgba(234, 243, 236, 0)
  );
  width: 500px !important;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: auto; /* Adiciona a barra de rolagem */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 5px;

  h2{ 
    color: ${Color.title};
    font-size: 1.6rem;
    margin-bottom: 10px;
    text-align: center;
  }

  p{
    
    color: ${Color.paragrafo};
    font-size: 1.2rem;
    font-weight: 700;
    text-align: center;
    padding: 10px;
  }
`;


export const Status = styled.span`
  display: inline-block;

  background-color: ${({ active }) => (active ? 'green' : 'red')};
  color: white;
  border-radius: 4px;
  font-size: 0.9em;
  padding: 4px 8px;
  margin: 10px;
`;


export const Img = styled.img`
width: 300px;
height: auto;
`;