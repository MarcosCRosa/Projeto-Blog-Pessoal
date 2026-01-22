import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Postagem from '../../../models/Postagem';
import type Tema from '../../../models/Tema';
import { ClipLoader } from 'react-spinners';

function FormPostagem() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [temas, setTemas] = useState<Tema[]>([])

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', })
    
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                alert('Postagem atualizada com sucesso')

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    alert('Erro ao atualizar a Postagem')
                }
            }

        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                })

                alert('Postagem cadastrada com sucesso');

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    alert('Erro ao cadastrar a Postagem');
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.descricao === '';
    
  return (
    <div className='container flex flex-col mx-auto items-center px-6 py-8 max-w-2xl'>
     <h1 className='text-4xl text-center my-6 font-bold text-indigo-900'>
        {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
     </h1>

     <form className='flex flex-col w-full gap-6'
     onSubmit={gerarNovaPostagem}>
     <div className='flex flex-col gap-2'>
        <label htmlFor="titulo" className='font-semibold text-slate-700'>Título da Postagem</label>
        <input type="text"
               placeholder="Digite o título"
               name="titulo"
               required
               className="border-2 border-indigo-400 rounded p-3 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 transition"
               value={postagem.titulo}
               onChange={(e: ChangeEvent<HTMLInputElement>)=>atualizarEstado(e)}
        />
     </div>
     <div className='flex flex-col gap-2'>
     <label htmlFor="texto" className='font-semibold text-slate-700'>Texto da Postagem</label>
     <input
            placeholder='Digite o conteúdo'
            name='texto'
            required
            className='border-2 border-indigo-400 rounded p-3 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 transition resize-none'
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}
        />
     </div>
     <div className='flex flex-col gap-2'>
     <label className='font-semibold text-slate-700'>Tema da Postagem</label>
     <select name="tema" id="tema" className='border-2 border-indigo-400 p-3 rounded focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 transition cursor-pointer'
        onChange={(e)=> buscarTemaPorId(e.currentTarget.value)}>
        <option value=""selected disabled>Selecione um Tema</option>
        {temas.map((tema)=>(
         <>
         <option value={tema.id}>{tema.descricao}</option>
         </>
        ))}
     </select>
     </div>
     <button type='submit'
             className='rounded bg-indigo-500 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-3 px-6 mt-4 transition duration-200 transform hover:scale-105 active:scale-95'
     disabled={carregandoTema}> 
        {
            isLoading?
            <ClipLoader
            color="#ffffff"
            size={24}
            />:
            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
        }
       </button>
     </form>
    </div>
  )
}

export default FormPostagem