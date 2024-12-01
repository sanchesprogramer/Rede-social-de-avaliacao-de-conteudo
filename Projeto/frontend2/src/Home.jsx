
import Navbar from './components/Navbar'
import styled from 'styled-components';
import HomeStyle from './styles/home';
import ContentSection from './components/ContentSection';
import axios from 'axios';
import{toast} from 'react-toastify';
import React, { useEffect, useState } from 'react';

const Label = styled.label` `

const Title = styled.h2`
color: white;
margin-top: 20px
`;

function Home() {

// GET FILMES
const[filmes,setFilmes] = useState([])
const getFilmes = async() => {

  try{
    const res = await axios.get("http://https://frontendtest-teal.vercel.app/filmes");
    setFilmes(res.data.sort((a,b) => (a.titulo > b.nome ? 1:-1)));
  } catch (error){
    toast.error(error);
  }
};
useEffect(()=>{
  getFilmes();
}, [setFilmes])

// GET LIVROS
const[livros,setLivros] = useState([])
const getLivros = async() => {

  try{
    const res = await axios.get("http://https://frontendtest-teal.vercel.app/livros");
    setLivros(res.data.sort((a,b) => (a.titulo > b.nome ? 1:-1)));
  } catch (error){
    toast.error(error);
  }
};
useEffect(()=>{
  getLivros();
}, [setLivros])

// GET SERIES

const[series,setSeries] = useState([])

const getSeries = async() => {
  try{
    const res = await axios.get("http://https://frontendtest-teal.vercel.app/series");
    setSeries(res.data.sort((a,b) => (a.titulo > b.nome ? 1:-1)));
  } catch (error){
    toast.error(error);
  }
};
useEffect(()=>{
  getSeries();
}, [setSeries])

console.log(filmes)
console.log(livros)
console.log(series)
  
  return (
    <div>
        <Navbar></Navbar>
        <HomeStyle></HomeStyle>
        <ContentSection filmes={filmes} livros={livros} series={series}>
        </ContentSection>

    </div>
  )
}

export default Home