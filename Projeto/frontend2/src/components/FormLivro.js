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
  width: 130%;
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

const FormLivro = ({getLivros,onEdit,setOnEdit}) => {

    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const livro = ref.current;

        livro.titulolivro.value = onEdit.titulolivro;
        livro.autorlivro.value = onEdit.autorlivro;
        livro.anopublicacaolivro.value = onEdit.anopublicacaolivro;
        livro.editoralivro.value = onEdit.editoralivro;
        livro.paislivro.value = onEdit.paislivro;
        livro.capa.value = onEdit.capa;
        livro.generolivro.value = onEdit.generolivro;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const livro = ref.current;
      if (
        !livro.titulolivro.value ||
        !livro.autorlivro.value ||
        !livro.anopublicacaolivro.value ||
        !livro.editoralivro.value ||
        !livro.paislivro.value ||
        !livro.capa.value ||
        !livro.generolivro.value
      ){
        return toast.warn("Preencha todos os campos!")
      }
      if (onEdit){
        await axios
        .put ("http://localhost:8800/livros/"+ onEdit.idlivro,{
          titulolivro: livro.titulolivro.value,
          autorlivro: livro.autorlivro.value ,
          anopublicacaolivro: livro.anopublicacaolivro.value ,
          editoralivro: livro.editoralivro.value ,
          paislivro: livro.paislivro.value,
          capa: livro.capa.value,
          generolivro: livro.generolivro.value
        })
        .then(({data})=> toast.success(data))
        .catch(({data})=> toast.error(data));
      } else{
        await axios
        .post("http://localhost:8800/livros/",{
          titulolivro: livro.titulolivro.value,
          autorlivro: livro.autorlivro.value ,
          anopublicacaolivro: livro.anopublicacaolivro.value ,
          editoralivro: livro.editoralivro.value ,
          paislivro: livro.paislivro.value,
          capa: livro.capa.value,
          generolivro:livro.generolivro.value

        })
        .then(({data})=> toast.success(data))
        .catch(({data})=> toast.error(data));
      }
      livro.titulolivro.value="";
      livro.autorlivro.value="";
      livro.anopublicacaolivro.value="";
      livro.editoralivro.value="";
      livro.paislivro.value="";
      livro.capa.value="";
      livro.generolivro.value="";
      setOnEdit(null);
      getLivros();
    };

    return (
        <FormContainer 
        ref={ref} onSubmit={handleSubmit}
        >
            <InputArea>
                <Label> Título</Label>
                <Input name="titulolivro"></Input>
            </InputArea>
            <InputArea>
                <Label> Autor</Label>
                <Input name="autorlivro"></Input>
            </InputArea>
            <InputArea>
                <Label> Ano de Publicação</Label>
                <Input name="anopublicacaolivro"></Input>
            </InputArea>
            <InputArea>
                <Label> Editora</Label>
                <Input name="editoralivro"></Input>
            </InputArea>
            <InputArea>
                <Label> País</Label>
                <Input name="paislivro"></Input>
            </InputArea>
            <InputArea>
                <Label> Capa</Label>
                <Input name="capa"></Input>
            </InputArea>
            <InputArea>
                <Label> Gênero</Label>
                <Input name="generolivro"></Input>
            </InputArea>
            <Button type ="submit"> SALVAR </Button>
        </FormContainer>
    );

}
export default FormLivro