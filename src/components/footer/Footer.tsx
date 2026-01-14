import { LinkedinLogoIcon, InstagramLogoIcon, GithubLogoIcon } from "@phosphor-icons/react"
function Footer() {
    let data = new Date().getFullYear()


    return (
        <>
        <div className="flex justify-center bg-indigo-900 text-white">
        <div className="container flex flex-col items-center py-4">
            <p className="text-x1 font-bold">
                Blog Pessoal | Copyright - {data}
            </p>
            <p className="text-lg">Acesso as redes sociais</p>
            <div className="flex gap-2">
                <LinkedinLogoIcon size={48} weight="bold"/>
                <GithubLogoIcon size={48} weight="bold"/>
                <InstagramLogoIcon size={48} weight="bold"/>
            </div>
        </div>
        </div>
        
        
        </>
    )
}

export default Footer;