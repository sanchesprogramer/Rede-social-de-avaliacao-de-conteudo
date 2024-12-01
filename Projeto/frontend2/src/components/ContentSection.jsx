import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import "./ContentSection.css"
import styled from 'styled-components';

const Paia = styled.div `

width: 100vw;
display: flex;
justify-content: center;

`

const Title = styled.h1
`
color: white;
font-size: 200px;
`;
const Container = styled.div`
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ContentSection = ({filmes,livros,series}) => {

  return (
    <div>
        <section className="movie-section">
            <Paia>
            <Container>
                <Title sx={{fontSize:50}}>FILMES</Title>
            </Container>
            </Paia>
            
            <div className="items-container">
                {filmes.map((item,i)=> (
                    <ItemCard item={item} type={"filme"} key={i}></ItemCard>
                ))}
            </div>
        </section>
        <section className='book-section'>
            <Paia>
                <Container>
                <Title>LIVROS</Title>
                </Container>
            </Paia>
            <div className="items-container">
                {livros.map((item,k)=> (
                    <ItemCard item={item} type={"livro"} key={k}></ItemCard>
                ))}
            </div>
           
        </section>
        <section className='series-section'>
            <Paia>
                <Container>
                <Title>SÉRIES</Title>
                </Container>
            </Paia>
            <div className="items-container">
                {series.map((item,k)=> (
                        <ItemCard item={item} type={"serie"} key={k}></ItemCard>
                    ))}
            </div>
            
        </section>
    </div>
  );
};

export default ContentSection;