import React, { useEffect, useState } from 'react';
import HomeStyle from '../styles/home'
import "./ContentSection.css"
import styled from 'styled-components';
import Navbar from './Navbar'
import { Routes, Route, useParams} from "react-router-dom";
import{toast} from 'react-toastify';
import axios from 'axios';
import Avaliacao from './Avaliacao';
import { Button } from '@mui/material';
import Review from './Review';

const Paia = styled.div `

width: 100vw;
display: flex;
justify-content: center;

`

const Title = styled.h1
`
color: white;
font-size: 100px;
padding:10px
`;

const Info = styled.h1
`
color: white;
font-size: 25px;
padding:10px
`;
const Container = styled.div`
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color:#54141d;
  margin-bottom: 50px;
`;

const ContainerReview = styled.div`
  margin-top: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #262626;
  color:white;
  border-radius:10%;
  margin-bottom: 20px;
`;

const ItemPage = (type) => {

  const parametros = useParams();
  const idLivroCerto = parseInt(parametros.id);

  const [buttonPopup,setButtonPopup] = useState(false);
  const [livros, setLivros] = useState([]);
  const [livroCorreto, setLivroCorreto] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([])
  const [avaliacaoCorreta, setAvaliacaocorreta] = useState([])


  const getLivros = async () => {
    try {
      console.log("Starting request to /livros");
      const res = await axios.get("http://localhost:8800/livros");
      console.log("Response received:", res.data);
      setLivros(res.data);
    } catch (error) {
      console.error("Error fetching livros:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getLivros();
  }, []);

  const getAvaliacoes = async () => {
    try {
      console.log("Starting request to /avaliacoes");
      const res = await axios.get("http://localhost:8800/avaliacoes");
      console.log("Response received:", res.data);
      setAvaliacoes(res.data);
    } catch (error) {
      console.error("Error fetching avaliacoes:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAvaliacoes();
  }, []);

  useEffect(() => {
    if (livros.length > 0) {
      console.log("Livros loaded:", livros);
      const livroEncontrado = livros.find(livro => livro.idlivro === idLivroCerto);
      if (livroEncontrado) {
        setLivroCorreto(livroEncontrado);
        console.log("Livro encontrado:", livroEncontrado);
      } else {
        console.log("Livro não encontrado");
      }
    }
  }, [livros, idLivroCerto]);

  useEffect(() => {
    if (avaliacoes.length > 0) {
      console.log("avaliacoes loaded:", avaliacoes);
      const avaliacaoEncontrada = avaliacoes.filter(avaliacao => avaliacao.FK_idlivro === idLivroCerto);
      if (avaliacaoEncontrada.length >0 ) {
        setAvaliacaocorreta(avaliacaoEncontrada);
        console.log("Avaliação encontrada:", avaliacaoEncontrada);
      } else {
        console.log("Avaliação não encontrada");
      }
    }
  }, [avaliacoes, idLivroCerto]);

return (
  <div>
    <HomeStyle></HomeStyle>
    <Navbar></Navbar>
      <section className="movie-section">
          <Paia>
          <Container>
            <Title>
              {livroCorreto ? livroCorreto.titulolivro : "Carregando..."}
            </Title>
            <img src={livroCorreto ? livroCorreto.capa : "Carregando..."} width="75%"></img>
            <Info>
             Autor: {livroCorreto ? livroCorreto.autorlivro : "Carregando..."}
            </Info>
            <Info>
              Ano Publicação: {livroCorreto ? livroCorreto.anopublicacaolivro : "Carregando..."}
            </Info>
            <Info>
              Editora: {livroCorreto ? livroCorreto.editoralivro : "Carregando..."}
            </Info>
            <Info>
              País: {livroCorreto ? livroCorreto.paislivro : "Carregando..."}
            </Info>
            <Info>
              Gênero: {livroCorreto ? livroCorreto.generolivro : "Carregando..."}
            </Info>
            <Info>
              Avaliações:
            </Info>
            <ContainerReview>
              {avaliacaoCorreta.map((item,i)=> (
                <Avaliacao type={"livro"} item={item} key={i}></Avaliacao>
              ))}
            </ContainerReview>
            <Button onClick={()=> setButtonPopup(true)} sx={{
              backgroundColor: "#f54545",
              marginBottom: "20px"
            }} variant="contained">ENVIAR UMA AVALIAÇÃO:</Button>
            <Review trigger={buttonPopup} setTrigger={setButtonPopup} id={idLivroCerto} idType="FK_idlivro"></Review>
          </Container>
          </Paia>
          <div className="items-container">
          </div>
      </section>
  </div>
)
};

export default ItemPage;