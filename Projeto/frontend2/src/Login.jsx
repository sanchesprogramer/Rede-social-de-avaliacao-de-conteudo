import React, { useState } from 'react'
import styled from 'styled-components';
import GlobalStyle from './styles/global';
import axios from 'axios';

const Corpo = styled.body`

  align-items:center

`;

const FormContainer = styled.form`
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #54141d;
  padding: 100px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  color:white;
  justify-items:center

`;

const InputArea = styled.div`
  display: flex;
  flex-direction: row;

`;

const Input = styled.input`
  width: 100px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #fff;
  height: 30px;
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #000000;
  color: white;
  height: 42px;
`;

const Label = styled.label` `

function Login() {

  const [email,setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function handleSubmit(event){
    event.preventDefault();
    axios.post('http://localhost:8800/users', {email,senha})
    .then (res => console.log(res))
    .catch(err => console.log(err));

  }

  return (
    <Corpo>
        <FormContainer onSubmit={handleSubmit}
        >
            <InputArea>
                <Label> Email:</Label>
                <Input name="emailuser" onChange={e => setEmail(e.target.value)}></Input>
            </InputArea>
            <InputArea>
                <Label> Senha:</Label>
                <Input type='password' name="senhauser" onChange={e => setSenha(e.target.value)}></Input>
            </InputArea>
            <Button> Logar </Button>
            <GlobalStyle></GlobalStyle>
        </FormContainer>
    </Corpo>
    
  )
}

export default Login