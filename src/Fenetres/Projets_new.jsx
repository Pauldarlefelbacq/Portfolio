import Github from "../assets/github.svg?react"

export default function Projetsnew(){
    return(
        <div className="flex bg-white/60 rounded-lg">
            <div>
                <h2>Mes projets les plus récents</h2>
            </div>
            <div className="flex">
                {/* listedesprojetsrankedpardate.slice(0,2).map(m) =>{
                    composant déjà fait de chaque projet(props = m)} */}
                <article className="rounded-lg bg-white"></article>
            <div>
            </div>
                <Github classNamesize="size-7" />
                <a href="https://github.com/Pauldarlefelbacq" target="blank" className="bg-white font-bold text-xl p-2 rounded-lg ">
                    Les retrouver
                </a>
            </div>
        </div>
    )
};