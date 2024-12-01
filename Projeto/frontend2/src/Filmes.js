import GlobalStyle from './styles/global.js';
import styled from 'styled-components';
import Form from './components/FormFilme.js'
import{toast,ToastContainer} from 'react-toastify';
import Grid from './components/GridFilme.js'
import "react-toastify/dist/ReactToastify.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar.jsx'

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h1
`
color: white
`;

function Filmes() {
  const[filmes,setFilmes] = useState([])
  const[onEdit, setOnEdit] = useState(null)

  const getFilmes = async() => {

    try{
      const res = await axios.get("https://api-nc3oa0wpf-pivas-projects.vercel.app/filmes");
      setFilmes(res.data.sort((a,b) => (a.titulo > b.nome ? 1:-1)));
    } catch (error){
      toast.error(error);
    }
  };

  useEffect(()=>{
    getFilmes();
  }, [setFilmes])

  return (
    <div className="Filmes">
      <Navbar>
      </Navbar>
      <Container>
        <Title> GERENCIAMENTO DE FILMES</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getFilmes={getFilmes}></Form>
        <Grid filmes={filmes} setFilmes={setFilmes} setOnEdit={setOnEdit}></Grid>
      </Container>
      <ToastContainer autoClose={3000}/>
      <GlobalStyle></GlobalStyle>
    </div>
  );
}

export default Filmes;
