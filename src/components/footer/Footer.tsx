import { useContext, type ReactNode } from "react";
import { LinkedinLogoIcon, InstagramLogoIcon, GithubLogoIcon } from "@phosphor-icons/react"
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
    const { usuario } = useContext(AuthContext)
    
    let data = new Date().getFullYear()
    let component: ReactNode

    if (usuario.token !== "") {
        component = (
            <div className="flex justify-center bg-indigo-900 text-white">
            <div className="container flex flex-col items-center py-4">
                <p className="text-x1 font-bold">
                    Blog Pessoal | Copyright - {data}
                </p>
                <p className="text-lg">Acesso as redes sociais</p>
                <div className="flex gap-2">
                    <a href="https://linkedin.com/in/devmarcosrosa" target="_blank">
                    <LinkedinLogoIcon size={48} weight="bold"/>
                    </a>
                    <a href="https://github.com/MarcosCRosa" target="_blank">
                    <GithubLogoIcon size={48} weight="bold"/>
                    </a>
                    <a href="https://www.instagram.com/marcos_luiz?igsh=bXRxdHJtNmx3cWFu" target="_blank">
                    <InstagramLogoIcon size={48} weight="bold"/>
                    </a>
                </div>
            </div>
            </div>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Footer;