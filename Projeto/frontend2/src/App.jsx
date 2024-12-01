import Filmes from "./Filmes";
import Livros from "./Livros";
import Login from "./Login";
import Series from "./Series";
import Home from "./Home"
import ItemPageFilme from "./components/ItemPageFilme";
import ItemPageLivro from "./components/ItemPageLivro";
import ItemPageSerie from "./components/ItemPageSerie";
import { Routes, Route, useParams} from "react-router-dom";
import React, { useEffect, useState } from 'react';

function App() {

  return (
      <div className= "App">
        <Routes>
          <Route path="/filmes" element={<Filmes/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/filmes/:id" element={<ItemPageFilme/>}/>
          <Route path="/livros/:id" element={<ItemPageLivro />}/>
          <Route path="/series/:id" element={<ItemPageSerie/>}/>
          <Route path="/series" element={<Series/>}/>
          <Route path="/livros" element={<Livros/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
  );
}

export default App;