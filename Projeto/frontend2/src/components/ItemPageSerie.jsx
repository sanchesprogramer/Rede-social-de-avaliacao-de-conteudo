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
  const idSerieCerto = parseInt(parametros.id);

  const [buttonPopup,setButtonPopup] = useState(false);
  const [series, setSeries] = useState([]);
  const [seriecorreta, setSeriecorreta] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([])
  const [avaliacaoCorreta, setAvaliacaocorreta] = useState([])

  const getSeries = async () => {
    try {
      console.log("Starting request to /series");
      const res = await axios.get("http://localhost:8800/series");
      console.log("Response received:", res.data);
      setSeries(res.data);
    } catch (error) {
      console.error("Error fetching séries:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSeries();
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
    if (series.length > 0) {
      console.log("Series loaded:", series);
      const SerieEncontrado = series.find(serie => serie.idserie === idSerieCerto);
      if (SerieEncontrado) {
        setSeriecorreta(SerieEncontrado);
        console.log("Serie encontrada:", SerieEncontrado);
      } else {
        console.log("Serie não encontrada");
      }
    }
  }, [series, idSerieCerto]);

  useEffect(() => {
    if (avaliacoes.length > 0) {
      console.log("avaliacoes loaded:", avaliacoes);
      const avaliacaoEncontrada = avaliacoes.filter(avaliacao => avaliacao.FK_idserie === idSerieCerto);
      if (avaliacaoEncontrada.length >0 ) {
        setAvaliacaocorreta(avaliacaoEncontrada);
        console.log("Avaliação encontrada:", avaliacaoEncontrada);
      } else {
        console.log("Avaliação não encontrada");
      }
    }
  }, [avaliacoes, idSerieCerto]);


return (
  <div>
    <HomeStyle></HomeStyle>
    <Navbar></Navbar>
      <section className="movie-section">
          <Paia>
          <Container>
            <Title>
              {seriecorreta ? seriecorreta.tituloserie : "Carregando..."}
            </Title>
            <img src={seriecorreta ? seriecorreta.urlserie : "Carregando..."} width="75%"></img>
            <Info>
             Diretor: {seriecorreta ? seriecorreta.elencoserie : "Carregando..."}
            </Info>
            <Info>
              Ano de Lançamento: {seriecorreta ? seriecorreta.anolancamentoserie : "Carregando..."}
            </Info>
            <Info>
              Elenco: {seriecorreta ? seriecorreta.paisserie : "Carregando..."}
            </Info>
            <Info>
              País: {seriecorreta ? seriecorreta.plataforma : "Carregando..."}
            </Info>
            <Info>
              Gênero: {seriecorreta ? seriecorreta.temporadas : "Carregando..."}
            </Info>
            <Info>
              Gênero: {seriecorreta ? seriecorreta.generoserie : "Carregando..."}
            </Info>
            <Info>
              Avaliações:
            </Info>
            <ContainerReview>
              {avaliacaoCorreta.map((item,i)=> (
                <Avaliacao type={"serie"} item={item} key={i}></Avaliacao>
              ))}
            </ContainerReview>
            <Button onClick={()=> setButtonPopup(true)} sx={{
              backgroundColor: "#f54545",
              marginBottom: "20px"
            }} variant="contained">ENVIAR UMA AVALIAÇÃO:</Button>
            <Review trigger={buttonPopup} setTrigger={setButtonPopup} id={idSerieCerto} idType="FK_idserie"></Review>
          </Container>
          </Paia>
          <div className="items-container">
          </div>
      </section>
  </div>
)
};

export default ItemPage;