import express from 'express';
import filmeRoutes from './routes/filmes.js'
import LivroRoutes from './routes/livros.js'
import SerieRoutes from './routes/series.js'
import AvaliacoesRoutes from './routes/avaliacoes.js'
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", filmeRoutes )
app.use("/", LivroRoutes )
app.use("/", SerieRoutes)
app.use("/", AvaliacoesRoutes)
console.log("socorr")

app.post('/login', (req,res)=> {

const sql = 'SELECT * FROM user WHERE emailuser = ? AND password = ?';

db.query(sql, [req.body.emailuser, req.body.senhauser], (err,data) =>{
    if (err)
    return res.json ("Login Failed")
    return res.json(data)
})
   
})

app.listen(8800);