import Icon from '../assets/icon.svg?react';
import Settings from "../assets/settings.svg?react";

export default function Navbar({ handleOpenApp }) {
    const date = new Date();
    let jour = date.getDate();
    let mois = date.getMonth() + 1;
    let annee = date.getFullYear();
    const dateComplete = `${jour}/${mois}/${annee}`;

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/30 backdrop-blur-xl shadow-2xl z-50 flex items-center justify-between px-6 ">
            <a href="/"><Icon alt="Icone marquée Paul.DF" className="[&_*]:fill-white" /></a>

            <div className="max-md:hidden flex items-center gap-6 ml-12 *:border *:border-black/30 *:p-2 *:rounded-lg *:bg-white/80 *:hover:drop-shadow-md *:hover:drop-shadow-blue-300 *:transition-all">
                <button className="text-black/80 hover:text-black text-sm font-medium transition-colors duration-200" onClick={() => handleOpenApp('projects')}>
                    Récent
                </button>
                <button className="text-black/80 hover:text-black text-sm font-medium transition-colors duration-200" onClick={() => handleOpenApp('about')}>
                    Accueil
                </button>
                <button className="text-black/80 hover:text-black text-sm font-medium transition-colors duration-200" onClick={() => handleOpenApp('about')}>
                    À propos
                </button>
                <button className="text-black/80 hover:text-black text-sm font-medium transition-colors duration-200" onClick={() => handleOpenApp('projects')}>
                    Projets
                </button>
                <button className="text-black/80 hover:text-black text-sm font-medium transition-colors duration-200"
                    onClick={() => handleOpenApp('contact')}>
                    Me contacter
                </button>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-white/80 text-xl transition-colors duration-200" onClick={() => handleOpenApp('parametres')}>
                    <Settings className=" hover:[&_*]:stroke-white  hover:scale-125 hover:rotate-180 cursor-pointer size-7 transition-all" />
                </button>
                <div className="text-white/90 text-sm font-medium">
                    {dateComplete}
                </div>
            </div>
        </div>
    )
};