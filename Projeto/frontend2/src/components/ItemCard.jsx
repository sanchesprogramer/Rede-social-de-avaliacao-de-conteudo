import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function ItemCard({item,type}) {
  if (type =="filme"){
    return (
      <Card sx={{ width: 345, borderRadius: 10, margin: "20px",  background: "#54141d", color: "#ffffff" }}>
        <CardActionArea component={Link} to={`./filmes/${item.idfilme}`}>
          <CardMedia 
            component="img"
            sx={{ height: 500 }}
            image={item.urlfilme}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {item.titulofilme}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Diretor: {item.diretorfilme}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Ano Lançamento: {item.anolancamentofilme}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Elenco: {item.elencofilme}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                País: {item.paisfilme}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Gênero: {item.generofilme}
            </Typography>
            </CardContent>
        </CardActionArea>
      </Card>
);

  }
  if (type=="livro"){
    return(
    <Card sx={{ width: 345, borderRadius: 10, margin: "20px",  background: "#54141d", color: "#ffffff" }}>
        <CardActionArea component={Link} to={`./livros/${item.idlivro}`}>
          <CardMedia 
            component="img"
            sx={{ height: 500 }}
            image={item.capa}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {item.titulolivro}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Autor: {item.autorlivro}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Ano de Publicação: {item.anopublicacaolivro}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Editora: {item.editoralivro}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                País: {item.paislivro}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Gênero: {item.generolivro}
            </Typography>
            </CardContent>
        </CardActionArea>
      </Card>
);

  }

  if (type=="serie"){
    return(
    <Card sx={{ width: 345, borderRadius: 10, margin: "20px",  background: "#54141d", color: "#ffffff" }}>
        <CardActionArea component={Link} to={`./series/${item.idserie}`}>
          <CardMedia 
            component="img"
            sx={{ height: 500 }}
            image={item.urlserie}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {item.tituloserie}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Ano Lançamento: {item.anolancamentoserie}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Elenco: {item.elencoserie}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                País: {item.paisserie}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Plataforma: {item.plataforma}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Temporadas: {item.temporadas}
            </Typography>
            <Typography variant="body2" color="#d9d9d9">
                Gênero: {item.generoserie}
            </Typography>
            </CardContent>
        </CardActionArea>
      </Card>
);

  }
  
  
}