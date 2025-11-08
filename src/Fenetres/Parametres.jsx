import Icon from "../assets/icon.svg?react";
import Settings from "../assets/settings.svg?react";
import Github from "../assets/github.svg?react";
import Linkedin from "../assets/linkedin.svg?react";

export default function Parametres() {
    return(
        <div className="bg-white/80 rounded-lg flex flex-col p-3 *:my-5 justify-center items-center text-center ">
            <div className="flex *:my-3">
                <Settings className="size-7" alt="icone de rouages pour signifier les paramètres" />
                <h2 className="font-medium">Paramètres</h2>
            </div>
            <div className="flex">
                <h4>Thème</h4>
                <button>Switch</button>
            </div>
            <a 
            href="mailto:darlefelbacqpaul@gmail.com" 
            className=" hover:font-bold transition-all">
                Me contacter
            </a>
            <div className="flex *:mx-5 place-items-center">
                <a 
                href="https://github.com/Pauldarlefelbacq">
                    <Github 
                    className="size-10 hover:[&_*]:fill-blue-400 transition-all" 
                    alt="icone de github" />
                </a>

                <a 
                href="https://www.linkedin.com/in/paul-darle-felbacq-657715226/">
                    <Linkedin 
                    className="size-12 hover:[&_*]:fill-blue-400 transition-all" 
                    alt="icone de linkedin" />
                </a>
            </div>
            <Icon className="size-15" alt="" />
        </div>
    )
};