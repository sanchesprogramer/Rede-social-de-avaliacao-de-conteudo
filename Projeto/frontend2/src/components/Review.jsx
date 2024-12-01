
// import './Review.css'
// import styled from 'styled-components';
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import React, { useEffect, useRef } from "react";
// import { toast } from "react-toastify";
// import axios from "axios"

// const InputArea = styled.div`
//   display: flex;
//   flex-direction: column;
  
// `;

// const Button = styled.button`
//   cursor: pointer;
//   border-radius: 5px;
//   border: none;
//   background-color: #000000;
//   color: white;
//   margin-top:30px;
//   margin-left: 250px;
//   width:20%;
//   height:40px;
// `;

// const Input = styled.input`
  
//   padding: 0 10px;
//   border: 1px solid #bbb;
//   border-radius: 5px;
//   background-color: #fff;
//   height: 100px
  
// `;

// const Label = styled.label`
// margin-bottom:20px`;

// function Review({ trigger, setTrigger, children, id, onEdit, getFilmes, setOnEdit }) {
//   const ref = useRef();

//   useEffect(() => {
//     if (onEdit && ref.current) {
//       const review = ref.current;
//       if (review && review.avaliacao) {
//         review.avaliacao.value = onEdit.avaliacao;
//       }
//     }
//   }, [onEdit]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const review = ref.current;

//     if (review && review.avaliacao && !review.avaliacao.value) {
//       return toast.warn("Preencha a avaliação!");
//     }

//     const payload = {
//       avaliacao: review.avaliacao.value,
//       FK_idfilme: id,
//       FK_idlivro: id,
//       FK_idserie: id
//     };

//     try {
//       const response = await axios.post("http://localhost:8800/avaliacoes", payload);
//       toast.success(response.data);
//     } catch (error) {
//       toast.error(error.response.data);
//     }

//     if (review && review.avaliacao) {
//       review.avaliacao.value = "";
//     }
//     setOnEdit(null);
//     getFilmes();
//     setTrigger(false);
//   };
    
//     return trigger ? (
//       <form ref={{ref}} onSubmit={handleSubmit}>
//           <div className="popup">
//             <div className="popup-inner">
//                 <IoIosCloseCircleOutline className='close-btn' onClick={()=> setTrigger(false)} ></IoIosCloseCircleOutline>
//                 {children}
//                 <InputArea>
//                     <Label> Escreva sua Review: </Label>
//                     <Input name="avaliacao"></Input>
//                     <Button type ="submit"> ENVIAR </Button>
//             </InputArea>
//             </div>
//         </div>
//       </form>
        
//     ) :null;
//   }
// export default Review

import './Review.css';
import styled from 'styled-components';
import { IoIosCloseCircleOutline } from "react-icons/io";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #000000;
  color: white;
  margin-top: 30px;
  width: 100px;
  height: 40px;
  align-self: flex-end;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #fff;
  height: 40px;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

function Review({ trigger, setTrigger, id, idType }) {
  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = ref.current;

    if (!review.avaliacao.value) {
      return toast.warn("Preencha a avaliação!");
    }

    const payload = {
      avaliacao: review.avaliacao.value,
      [idType]: id,
    };

    console.log("Payload:", payload); // Adicionando log para verificar o payload

    try {
      const response = await axios.post("http://localhost:8800/avaliacoes", payload);
      console.log("Response:", response.data); // Adicionando log para verificar a resposta
      toast.success("Avaliação enviada com sucesso!");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message); // Adicionando log para verificar o erro
      toast.error("Erro ao enviar a avaliação.");
    }

    review.avaliacao.value = "";
    setTrigger(false);
  };


  return trigger ? (
    <form ref={ref} onSubmit={handleSubmit}>
      <div className="popup">
        <div className="popup-inner">
          <IoIosCloseCircleOutline className="close-btn" onClick={() => setTrigger(false)} />
          <InputArea>
            <Label>Escreva sua Review:</Label>
            <Input name="avaliacao" />
            <Button type="submit">ENVIAR</Button>
          </InputArea>
        </div>
      </div>
    </form>
  ) : null;
}

export default Review;