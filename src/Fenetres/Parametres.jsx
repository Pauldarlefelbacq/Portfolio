import { useState, useEffect } from 'react';
import Icon from "../assets/icon.svg?react";
import Settings from "../assets/settings.svg?react";
import Github from "../assets/github.svg?react";
import Linkedin from "../assets/linkedin.svg?react";

export default function Parametres({ onOpenMentions }) {
    

    const [theme, setTheme] = useState(() => {
        if (document.documentElement.classList.contains('dark')) {
            return 'dark';
        } else {
            return 'light';
        }
    });

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
        console.log(localStorage.item);
        
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return(
        <div className="h-full flex flex-col gap-6 p-6 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <div className="flex items-center gap-3 pb-4 border-b transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }}>
                <Settings className="size-6 transition-colors duration-300" style={{ color: 'var(--text-secondary)' }} alt="icone de rouages pour signifier les paramètres" />
                <h2 className="text-xl font-semibold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Paramètres</h2>
            </div>

            <div className="rounded-xl p-4 border transition-colors duration-300" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h4 className="font-medium transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Thème</h4>
                        <p className="text-sm transition-colors duration-300" style={{ color: 'var(--text-tertiary)' }}>
                            Mode actuel: {theme === 'light' ? 'Clair' : 'Sombre'}
                        </p>
                    </div>
                    <button 
                        onClick={toggleTheme}
                        className="px-4 py-2 bg-black hover:text-black hover:bg-white text-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white rounded-sm transition-all duration-200 shadow-md hover:shadow-lg">
                        {theme === 'light' ? 'Sombre' : 'Clair'}
                    </button>
                </div>
            </div>

            <div className="rounded-xl p-4 border transition-colors duration-300" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <h4 className="font-medium mb-3 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Contact</h4>
                <a 
                    href="mailto:darlefelbacqpaul@gmail.com" 
                    className="block px-4 py-2 border rounded-sm transition-all duration-200 text-center [background-color:var(--bg-tertiary)] [border-color:var(--border-color)] [color:var(--text-secondary)] hover:[background-color:black] hover:[color:white] dark:hover:[background-color:white] dark:hover:[color:black]">
                    darlefelbacqpaul@gmail.com
                </a>
            </div>

            <div className="rounded-xl p-4 border transition-colors duration-300" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <h4 className="font-medium mb-3 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Réseaux sociaux</h4>
                <div className="flex gap-4 justify-center">
                    <a 
                        href="https://github.com/Pauldarlefelbacq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-3 rounded-lg border hover:border-gray-800 hover:bg-white group transition-all duration-200 shadow-sm hover:shadow-md"
                        style={{ borderColor: 'var(--border-color)' }}>
                        <Github 
                            className="size-8 transition-all" 
                            style={{ fill: 'var(--text-primary)' }}
                            alt="icone de github" />
                    </a>

                    <a 
                        href="https://www.linkedin.com/in/paul-darle-felbacq-657715226/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-3 rounded-lg border hover:bg-blue-500 group transition-all duration-200 shadow-sm hover:shadow-md"
                        style={{ borderColor: 'var(--border-color)' }}>
                        <Linkedin 
                            className="size-8 [&_*]:fill-blue-600 group-hover:[&_*]:fill-white transition-all" 
                            alt="icone de linkedin" />
                    </a>
                </div>
            </div>

            <div className="rounded-xl p-4 border transition-colors duration-300 hover:[background-color:black] hover:[color:white] dark:hover:[background-color:white] dark:hover:[color:black]" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <button 
                    onClick={onOpenMentions}
                    className="w-full text-center py-2 rounded-lg transition-all duration-200 hover:opacity-80 "
                    style={{ 
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)'
                    }}
                >
                    Mentions légales
                </button>
            </div>

            <div className="flex-grow flex items-end justify-center pb-4">
                <Icon className="size-20 opacity-40 hover:opacity-100 transition-opacity duration-300" alt="" />
            </div>
        </div>
    )
};