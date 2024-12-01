import {db} from '../db.js';
export const getFilmes = (_,res) => {

    const q = "SELECT * FROM filmes";

    db.query(q,(err,data) =>{

        if (err) return res.json(err);
        return res.status(200).json(data);

    });

};

export const addFilme = (req,res) => {

    const q =
    "INSERT INTO filmes(`titulofilme`,`diretorfilme`,`anolancamentofilme`,`elencofilme`,`paisfilme`,`urlfilme`,`generofilme`) VALUES(?)";

    const values = [
        req.body.titulofilme,
        req.body.diretorfilme,
        req.body.anolancamentofilme,
        req.body.elencofilme,
        req.body.paisfilme,
        req.body.urlfilme,
        req.body.generofilme,
    ];
    db.query(q,[values], (err)=>{
        if(err) return res.json(err);
        return res.status(200).json("Filme criado com sucesso");
    });

};

export const updateFilme = (req,res) => {

    const q =
    "UPDATE filmes SET `titulofilme`=?,`diretorfilme`=?,`anolancamentofilme`=?,`elencofilme`=?,`paisfilme`=?,`urlfilme`=?,`generofilme`=? WHERE `idfilme` = ?";

    const values = [
        req.body.titulofilme,
        req.body.diretorfilme,
        req.body.anolancamentofilme,
        req.body.elencofilme,
        req.body.paisfilme,
        req.body.urlfilme,
        req.body.generofilme
    ];
    db.query(q,[...values, req.params.id], (err)=>{

        if(err) return res.json(err);
        return res.status(200).json("Filme atualizado com sucesso");
    });

};

export const deleteFilme = (req,res) => {

    const q =
    "DELETE FROM filmes WHERE `idfilme` = ?";

    db.query(q,[req.params.id], (err)=>{

        if(err) return res.json(err);
        return res.status(200).json("Filme deletado com sucesso");
    });

};