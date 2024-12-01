import {db} from '../db.js';
export const getLivros = (_,res) => {

    const q = "SELECT * FROM livros";

    db.query(q,(err,data) =>{

        if (err) return res.json(err);
        return res.status(200).json(data);

    });

};

export const addLivro = (req,res) => {

    const q =
    "INSERT INTO livros(`titulolivro`,`autorlivro`,`anopublicacaolivro`,`editoralivro`,`paislivro`, `capa`, `generolivro`) VALUES(?)";

    const values = [
        req.body.titulolivro,
        req.body.autorlivro,
        req.body.anopublicacaolivro,
        req.body.editoralivro,
        req.body.paislivro,
        req.body.capa,
        req.body.generolivro
    ];
    db.query(q,[values], (err)=>{
        if(err) return res.json(err);
        return res.status(200).json("Livro criado com sucesso");
    });

};

export const updateLivro = (req,res) => {

    const q =
    "UPDATE livros SET `titulolivro`=?,`autorlivro`=?,`anopublicacaolivro`=?,`editoralivro`=?,`paislivro`=?,`capa`=?, `generolivro`=? WHERE `idlivro` = ?";

    const values = [
        req.body.titulolivro,
        req.body.autorlivro,
        req.body.anopublicacaolivro,
        req.body.editoralivro,
        req.body.paislivro,
        req.body.capa,
        req.body.generolivro
    ];
    db.query(q,[...values, req.params.id], (err)=>{

        if(err) return res.json(err);
        return res.status(200).json("Livro atualizado com sucesso");
    });

};

export const deleteLivro = (req,res) => {

    const q =
    "DELETE FROM livros WHERE `idlivro` = ?";

    db.query(q,[req.params.id], (err)=>{

        if(err) return res.json(err);
        return res.status(200).json("Livro deletado com sucesso");
    });

};