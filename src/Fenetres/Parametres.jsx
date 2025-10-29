import Icon from "../assets/icon.svg?react";
import Settings from "../assets/settings.svg?react";
import Github from "../assets/github.svg?react";
import Linkedin from "../assets/linkedin.svg?react";

export default function Parametres() {
    return(
        <div className="bg-white/80 rounded-lg flex-col p-3 *:my-5 justify-center place-items-center text-center m-auto">
            <div className="flex *:mx-3">
                <Settings className="size-7" alt="icone de rouages pour signifier les paramètres" />
                <h2 className="font-medium">Paramètres</h2>
            </div>
            <div className="flex">
                <h4>Thème</h4>
                <button>Switch</button>
            </div>
            <h3>Me contacter</h3>
            <div>
                <a href="https://github.com/Pauldarlefelbacq">
                    <Github className="size-7 fill-amber-500" alt="icone de github" />
                </a>
                <a href="https://www.linkedin.com/in/paul-darle-felbacq-657715226/" className="hover:fill-blue-400">
                    <Linkedin className="size-7" alt="icone de linkedin" />
                </a>
            </div>
            <Icon className="size-7" alt="" />
        </div>
    )
};