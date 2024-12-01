import GlobalStyle from './styles/global';
import styled from 'styled-components';
import{toast,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import FormLivro from './components/FormLivro.js';
import GridLivro from './components/GridLivro.js';
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

const Title = styled.h1`
color:white`;

function Livros() {
  const[livros,setLivros] = useState([])
  const[onEdit, setOnEdit] = useState(null)

  const getLivros = async() => {

    try{
      const res = await axios.get("http://localhost:8800/livros");
      setLivros(res.data.sort((a,b) => (a.titulo > b.nome ? 1:-1)));
    } catch (error){
      toast.error(error);
    }
  };

  useEffect(()=>{
    getLivros();
  }, [setLivros])

  return (
    <div className="Livros">
      <Navbar>
      </Navbar>
      <Container>
        <Title>GERENCIAMENTO DE LIVROS</Title>
        <FormLivro onEdit={onEdit} setOnEdit={setOnEdit} getLivros={getLivros}></FormLivro>
        <GridLivro livros={livros} setLivros={setLivros} setOnEdit={setOnEdit}></GridLivro>
      </Container>
      <ToastContainer autoClose={3000}/>
      <GlobalStyle></GlobalStyle>
    </div>
  );
}

export default Livros;
