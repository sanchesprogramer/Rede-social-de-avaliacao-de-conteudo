import axios from "axios"
import styled from 'styled-components';
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #54141d;
  padding: 10px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  color:white;
  width: 125%;

`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;

`;

const Input = styled.input`
  width: 100px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #fff;
  height: 30px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #000000;
  color: white;
  height: 42px;
`;

const Label = styled.label``;

const FormFilme = ({getFilmes,onEdit,setOnEdit}) => {

    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const filme = ref.current;

        filme.titulofilme.value = onEdit.titulofilme;
        filme.diretorfilme.value = onEdit.diretorfilme;
        filme.anolancamentofilme.value = onEdit.anolancamentofilme;
        filme.elencofilme.value = onEdit.elencofilme;
        filme.paisfilme.value = onEdit.paisfilme;
        filme.urlfilme.value = onEdit.urlfilme;
        filme.generofilme.value = onEdit.generofilme;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const filme = ref.current;
      if (
        !filme.titulofilme.value ||
        !filme.diretorfilme.value ||
        !filme.anolancamentofilme.value ||
        !filme.elencofilme.value ||
        !filme.paisfilme.value ||
        !filme.urlfilme.value ||
        !filme.generofilme.value
      ){
        return toast.warn("Preencha todos os campos!")
      }
      if (onEdit){
        await axios
        .put ("http://localhost:8800/filmes/"+ onEdit.idfilme,{
          titulofilme: filme.titulofilme.value,
          diretorfilme: filme.diretorfilme.value ,
          anolancamentofilme: filme.anolancamentofilme.value ,
          elencofilme: filme.elencofilme.value ,
          paisfilme: filme.paisfilme.value, 
          urlfilme: filme.urlfilme.value,
          generofilme: filme.generofilme.value
        })
        .then(({data})=> toast.success(data))
        .catch(({data})=> toast.error(data));
      } else{
        await axios
        .post("http://localhost:8800/filmes/",{
          titulofilme: filme.titulofilme.value,
          diretorfilme: filme.diretorfilme.value ,
          anolancamentofilme: filme.anolancamentofilme.value ,
          elencofilme: filme.elencofilme.value ,
          paisfilme: filme.paisfilme.value,
          urlfilme: filme.urlfilme.value,
          generofilme: filme.generofilme.value
        })
        .then(({data})=> toast.success(data))
        .catch(({data})=> toast.error(data));
      }
      filme.titulofilme.value="";
      filme.diretorfilme.value="";
      filme.anolancamentofilme.value="";
      filme.elencofilme.value="";
      filme.paisfilme.value="";
      filme.urlfilme.value="";
      filme.generofilme.value="";
      setOnEdit(null);
      getFilmes();
    };

    return (
        <FormContainer 
        ref={ref} onSubmit={handleSubmit}
        >
            <InputArea>
                <Label> Título</Label>
                <Input name="titulofilme"></Input>
            </InputArea>
            <InputArea>
                <Label> Diretor</Label>
                <Input name="diretorfilme"></Input>
            </InputArea>
            <InputArea>
                <Label> Ano Lançamento</Label>
                <Input name="anolancamentofilme"></Input>
            </InputArea>
            <InputArea>
                <Label> Elenco</Label>
                <Input name="elencofilme"></Input>
            </InputArea>
            <InputArea>
                <Label> País</Label>
                <Input name="paisfilme"></Input>
            </InputArea>
            <InputArea>
                <Label> Poster: </Label>
                <Input name="urlfilme"></Input>
            </InputArea>
            <InputArea>
                <Label> Gênero: </Label>
                <Input name="generofilme"></Input>
            </InputArea>
            <Button type ="submit"> SALVAR </Button>
        </FormContainer>
    );

}
export default FormFilme