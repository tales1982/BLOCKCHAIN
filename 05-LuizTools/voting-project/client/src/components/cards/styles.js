import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #fff;
  margin: 10px;
`;

export const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const Info = styled.div`
  padding: 15px;
`;

export const Name = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

export const Age = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 15px;
`;

export const VoteButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;
