import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background: url("/image.jpg") no-repeat center center fixed;

  background-size: cover;
`;

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  padding-top: 50px;
  h1{
    color: black;
    font-size: 2.5rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: auto;
  align-items: center;

  input {
    width: 100%;
    height: 60px;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 10px;
    border: 1px solid black;
    font-size: 1.3rem;
  }
  textarea {
    width: 100%;
    height: 200px;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 1.3rem;
  }
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    background-color: #5099EC;
    color: black;
    font-weight: bolder;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 1.3rem;
    cursor: pointer;
    &:hover {
      background-color: #106FAB;
      color: black;
    }
  }
`;


export const MessageDiv = styled.div`
height: 150px;
width: 600px;
color:black;
`;

export const BtnReturn = styled.div`
display: flex;
width: 160px;
height: 36px;
border-radius: 10px;
align-items: center;
justify-content: center;
border: solid 1px black;
color: black;
font-weight: bolder;
background-color: #5099EC;
cursor: pointer;
    &:hover {
      background-color: #106FAB;
      color: black;
    }
`;