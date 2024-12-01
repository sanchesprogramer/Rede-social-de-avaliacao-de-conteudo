import React from "react"
import styled from "styled-components"
import axios from "axios";
import { FaTrash, FaEdit, FaRegComment } from "react-icons/fa";
import {useState} from 'react'
import { toast } from "react-toastify";
import Review from "./Review";

const Table = styled.table`
width: 200%;
background-color: #54141d;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
word-break: break-all;
color:white;
`;

export const Tbody = styled.tbody``;
export const Thead = styled.thead``;
export const Tr = styled.tr``;
export const Th = styled.th`

  text-align: center;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;
export const Td = styled.td`
  padding-top: 15px;
  text-align: center;
  //text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  //width: ${(props) => (props.width ? props.width : "auto")};

  //@media (max-width: 500px) {
    //${(props) => props.onlyWeb && "display: none"}
  //}
  border-bottom: inset;
`;

const GridLivro = ({livros,setLivros,setOnEdit}) => {

    const [buttonPopup,setButtonPopup] = useState(false);

    const handleEdit = (item) => {
        setOnEdit(item);
    }

    const handleDelete = async (id) => {

        await axios
            .delete("http://localhost:8800/livros/" + id)
            .then(({data})=>{

                const newArray = livros.filter((livro)=> livro.idlivro !== id);
                setLivros(newArray);
                toast.success(data);
        })
        .catch(({data})=> toast.error(data));

        setOnEdit(null);
    };

    return (

        <Table>
            <Thead>
                <Tr>
                    <Th>Capa</Th>
                    <Th>Título</Th>
                    <Th>Autor</Th>
                    <Th>Ano de Publicação</Th>
                    <Th>Editora</Th>
                    <Th>País</Th>
                    <Th>Gênero</Th>
                    <Th>Deletar</Th>
                    <Th>Editar</Th>
                    <Th>Review</Th>
                </Tr>
            </Thead>
            <Tbody>
                {livros.map((item,i) =>(
                    <Tr key={i}>
                        <Td width="15%"> <img src={item.capa} width="50%"></img></Td>
                        <Td>{item.titulolivro}</Td>
                        <Td>{item.autorlivro}</Td>
                        <Td>{item.anopublicacaolivro}</Td>
                        <Td>{item.editoralivro}</Td>
                        <Td >{item.paislivro}</Td>
                        <Td>{item.generolivro}</Td>
                        <Td width="5%">
                            <FaTrash onClick={() => handleDelete(item.idlivro)}></FaTrash>
                        </Td>
                        <Td width="5%">
                            <FaEdit onClick={()=> handleEdit(item)}></FaEdit>
                        </Td>
                        <Td width="5%">
                            <FaRegComment onClick={()=> setButtonPopup(true)}></FaRegComment>
                            <Review trigger={buttonPopup} setTrigger={setButtonPopup} item={item} id={item.idlivro} idType="FK_idlivro"></Review>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>

    );

}

export default GridLivro;
