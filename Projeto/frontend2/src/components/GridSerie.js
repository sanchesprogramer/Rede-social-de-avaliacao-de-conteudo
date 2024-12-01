import React from "react"
import styled from "styled-components"
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaRegComment } from "react-icons/fa";
import {useState} from 'react'
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
// //   text-align: ${(props) => (props.alignCenter ? "center" : "start")};
//   width: ${(props) => (props.width ? props.width : "auto")};

//   @media (max-width: 500px) {
//     ${(props) => props.onlyWeb && "display: none"}
//   }
  border-bottom: inset;
`;

const GridSerie = ({series,setSeries,setOnEdit}) => {

    const [buttonPopup,setButtonPopup] = useState(false);

    const handleEdit = (item) => {
        setOnEdit(item);
    }

    const handleDelete = async (id) => {

        await axios
            .delete("http://localhost:8800/series/" + id)
            .then(({data})=>{

                const newArray = series.filter((serie)=> serie.idserie !== id);
                setSeries(newArray);
                toast.success(data);
        })
        .catch(({data})=> toast.error(data));

        setOnEdit(null);
    };

    return (

        <Table>
            <Thead>
                <Tr>
                    <Th>Poster</Th>
                    <Th>Título</Th>
                    <Th>Ano Lançamento</Th>
                    <Th>Elenco</Th>
                    <Th>País</Th>
                    <Th>Plataforma</Th>
                    <Th>Temporadas</Th>
                    <Th>Gênero</Th>
                    <Th>Deletar</Th>
                    <Th>Editar</Th>
                    <Th>Review</Th>
                </Tr>
                
            </Thead>
            <Tbody>
                {series.map((item,i) =>(
                    <Tr key={i}>
                        <Td width="10%"> <img src={item.urlserie} width="50%"></img>  </Td>
                        <Td>{item.tituloserie}</Td>
                        <Td>{item.anolancamentoserie}</Td>
                        <Td>{item.elencoserie}</Td>
                        <Td>{item.paisserie}</Td>
                        <Td>{item.plataforma}</Td>
                        <Td>{item.temporadas}</Td>
                        <Td width="5%">{item.generoserie}</Td>
                        <Td width="5%">
                            <FaTrash onClick={() => handleDelete(item.idserie)}></FaTrash>
                        </Td>
                        <Td width="5%">
                            <FaEdit onClick={()=> handleEdit(item)}></FaEdit>
                        </Td>
                        <Td width="5%">
                            <FaRegComment onClick={()=> setButtonPopup(true)}></FaRegComment>
                            <Review trigger={buttonPopup} id={item.idserie} setTrigger={setButtonPopup} item={item}idType="FK_idserie"></Review>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>

    );

}

export default GridSerie;