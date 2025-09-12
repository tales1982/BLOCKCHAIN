import React from 'react';
import { CardContainer, Image, Info, Name, Age, VoteButton } from './styles'; // Importando os estilos do arquivo correto

const StudentCard = ({ name, age, image, onVote }) => {
  return (
    <CardContainer>
      <Image src={image} alt={name} />
      <Info>
        <Name>{name}</Name>
        <Age>Age: {age}</Age>
        <VoteButton onClick={onVote}>Poll</VoteButton>
      </Info>
    </CardContainer>
  );
};

export default StudentCard; // Certifique-se de que o componente está sendo exportado como default
