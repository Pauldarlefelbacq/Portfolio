import { useState, useEffect } from 'react';
import Icon from "../assets/icon.svg?react";
import Settings from "../assets/settings.svg?react";
import Github from "../assets/github.svg?react";
import Linkedin from "../assets/linkedin.svg?react";

export default function Parametres() {
    const [theme, setTheme] = useState(() => {
        return 'light';
    });

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
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

            {/* Contact Section */}
            <div className="rounded-xl p-4 border transition-colors duration-300" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <h4 className="font-medium mb-3 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Contact</h4>
                <a 
                    href="mailto:darlefelbacqpaul@gmail.com" 
                    className="block px-4 py-2 border rounded-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 text-center"
                    style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    darlefelbacqpaul@gmail.com
                </a>
            </div>

            {/* Social Links */}
            <div className="rounded-xl p-4 border transition-colors duration-300" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <h4 className="font-medium mb-3 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Réseaux sociaux</h4>
                <div className="flex gap-4 justify-center">
                    <a 
                        href="https://github.com/Pauldarlefelbacq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-3 rounded-lg border hover:border-gray-800 hover:bg-gray-800 group transition-all duration-200 shadow-sm hover:shadow-md"
                        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
                        <Github 
                            className="size-8 transition-all" 
                            style={{ fill: 'var(--text-primary)' }}
                            alt="icone de github" />
                    </a>

                    <a 
                        href="https://www.linkedin.com/in/paul-darle-felbacq-657715226/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-3 rounded-lg border hover:border-blue-600 hover:bg-blue-600 group transition-all duration-200 shadow-sm hover:shadow-md"
                        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
                        <Linkedin 
                            className="size-8 [&_*]:fill-blue-600 group-hover:[&_*]:fill-white transition-all" 
                            alt="icone de linkedin" />
                    </a>
                </div>
            </div>

            {/* Footer Icon */}
            <div className="flex-grow flex items-end justify-center pb-4">
                <Icon className="size-20 opacity-40 hover:opacity-100 transition-opacity duration-300" alt="" />
            </div>
        </div>
    )
};