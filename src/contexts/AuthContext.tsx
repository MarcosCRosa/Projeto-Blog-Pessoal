import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

export interface AuthContextProps {
   usuario: UsuarioLogin;
   handleLogout(): void;
   handleLogin(usuario:UsuarioLogin): Promise<void>;
   isLoading:boolean;
}

interface AuthProviderProps{
    children: ReactNode;

}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({children}:AuthProviderProps){
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id:0,
        nome:"",
        usuario:"",
        senha:"",
        foto:"",
        token:"",
    })

    const [isLoading,setIsLoading] = useState(false)

    async function handleLogin(UsuarioLogin:UsuarioLogin){
        setIsLoading(true)

        try {
            await login(`/usuarios/logar`,UsuarioLogin, setUsuario)
            ToastAlerta("Usuário foi atenticado com sucesso!", "sucesso")
         } catch (error){
            ToastAlerta("Os dados do usuario estão inconsistentes!", "erro")
         }
         setIsLoading(false)
    }

    function handleLogout() {
        setUsuario({
            id:0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{usuario,handleLogin,handleLogout,isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}