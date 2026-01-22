import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Perfil(){
 const navigate = useNavigate()
 const {usuario} = useContext(AuthContext)
 
 useEffect(()=>{
    if (usuario.token === ""){
        navigate("/")
    }
 },[usuario.token])

 return (
    <div className="flex justify-center mx-4">
        <div className="container mx-auto my-4 rounded-2x1 overflow-hidden">
            <img className="w-full h-72 object-cover border-b-8 border-white" src="https://i.imgur.com/ZZFAmzo.jpg" alt="Capa do perfil" />
            <img  className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative" src={usuario.foto} alt={`Foto do perfil de ${usuario.nome}`}/>
          <div className="relative mt-[-6rem] h-72 flex flex-col bg-sky-500 text-white text-2x1 items-center justify-center">
           <p>Nome: {usuario.nome}</p>
           <p>Email: {usuario.usuario}</p>
          </div>
        </div>
    </div>
 )
}

export default Perfil;