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
  width: 143%;
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

const FormSerie = ({getSeries,onEdit,setOnEdit}) => {

    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const serie = ref.current;

        serie.tituloserie.value = onEdit.tituloserie;
        serie.anolancamentoserie.value = onEdit.anolancamentoserie;
        serie.elencoserie.value = onEdit.elencoserie;
        serie.paisserie.value = onEdit.paisserie;
        serie.plataforma.value = onEdit.plataforma;
        serie.temporadas.value = onEdit.temporadas;
        serie.urlserie.value = onEdit.urlserie;
        serie.generoserie.value = onEdit.generoserie;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const serie = ref.current;
      if (
        !serie.tituloserie.value ||
        !serie.anolancamentoserie.value ||
        !serie.elencoserie.value ||
        !serie.paisserie.value ||
        !serie.plataforma.value ||
        !serie.temporadas.value ||
        !serie.urlserie.value ||
        !serie.generoserie.value 
      ){
        return toast.warn("Preencha todos os campos!")
      }
      if (onEdit){
        await axios
        .put ("http://localhost:8800/series/"+ onEdit.idserie,{
          tituloserie: serie.tituloserie.value,
          anolancamentoserie: serie.anolancamentoserie.value ,
          elencoserie: serie.elencoserie.value ,
          paisserie: serie.paisserie.value ,
          plataforma: serie.plataforma.value ,
          temporadas: serie.temporadas.value ,
          urlserie: serie.urlserie.value ,
          generoserie: serie.generoserie.value 
        })
        .then(({data})=> toast.success(data))
        .catch(({data})=> toast.error(data));
      } else{
        await axios
        .post("http://localhost:8800/series/",{
          tituloserie: serie.tituloserie.value,
          anolancamentoserie: serie.anolancamentoserie.value ,
          elencoserie: serie.elencoserie.value ,
          paisserie: serie.paisserie.value ,
          plataforma: serie.plataforma.value ,
          temporadas: serie.temporadas.value ,
          urlserie: serie.urlserie.value ,
          generoserie: serie.generoserie.value ,
        })
        .then(({data})=> toast.success(data))
        .catch(({data})=> toast.error(data));
      }
      serie.tituloserie.value="";
      serie.anolancamentoserie.value="";
      serie.elencoserie.value="";
      serie.paisserie.value="";
      serie.plataforma.value="";
      serie.temporadas.value="";
      serie.urlserie.value="";
      serie.generoserie.value="";
      setOnEdit(null);
      getSeries();
    };

    return (
        <FormContainer 
        ref={ref} onSubmit={handleSubmit}
        >   
            <InputArea>
                <Label> Título</Label>
                <Input name="tituloserie"></Input>
            </InputArea>
            <InputArea>
                <Label> Ano Lançamento</Label>
                <Input name="anolancamentoserie"></Input>
            </InputArea>
            <InputArea>
                <Label> Elenco</Label>
                <Input name="elencoserie"></Input>
            </InputArea>
            <InputArea>
                <Label> País</Label>
                <Input name="paisserie"></Input>
            </InputArea>
            <InputArea>
                <Label> Plataforma</Label>
                <Input name="plataforma"></Input>
            </InputArea>
            <InputArea>
                <Label> Temporadas</Label>
                <Input name="temporadas"></Input>
            </InputArea>
            <InputArea>
                <Label> Poster</Label>
                <Input name="urlserie"></Input>
            </InputArea>
            <InputArea>
                <Label> Gênero</Label>
                <Input name="generoserie"></Input>
            </InputArea>

            <Button type ="submit"> SALVAR </Button>
        </FormContainer>
    );

}
export default FormSerie