import GlobalStyle from './styles/global';
import styled from 'styled-components';
import{toast,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import FormSerie from './components/FormSerie.js';
import GridSerie from './components/GridSerie.js';
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

function Series() {
  const[series,setSeries] = useState([])
  const[onEdit, setOnEdit] = useState(null)

  const getSeries = async() => {

    try{
      const res = await axios.get("http://localhost:8800/series");
      setSeries(res.data.sort((a,b) => (a.titulo > b.nome ? 1:-1)));
    } catch (error){
      toast.error(error);
    }
  };

  useEffect(()=>{
    getSeries();
  }, [setSeries])

  return (
    <div className="Series">
      <Navbar>
      </Navbar>
      <Container>
        <Title>GERENCIAMENTO DE SERIES</Title>
        <FormSerie onEdit={onEdit} setOnEdit={setOnEdit} getSeries={getSeries}></FormSerie>
        <GridSerie series={series} setSeries={setSeries} setOnEdit={setOnEdit}></GridSerie>
      </Container>
      <ToastContainer autoClose={3000}/>
      <GlobalStyle></GlobalStyle>
    </div>
  );
}

export default Series;
