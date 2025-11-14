import Github from "../assets/github.svg?react"
import { useState } from 'react';

const Projet = ({ projet }) => {
    const [lightboxImage, setLightboxImage] = useState(null);

    if (!projet) {
        return <p>Aucun projet sélectionné</p>;
    }

    return (
        <div className="p-4 flex flex-col md:flex-row gap-4 h-full overflow-auto">
            {lightboxImage && (
                <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <img 
                        src={lightboxImage} 
                        alt={projet.nom}
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
                    >
                        ✕
                    </button>
                </div>
            )}

            <div className="md:hidden w-full">
                <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory">
                    {projet.imgR?.map((img, index) => (
                        <img
                            className="flex-shrink-0 w-4/5 h-64 object-cover rounded-lg cursor-pointer snap-center"
                            key={index} 
                            src={img} 
                            alt={projet.nom}
                            onClick={() => setLightboxImage(img)} 
                        />
                    ))}
                </div>
            </div>

            <div className="hidden md:block w-2/5 overflow-auto ">
                {projet.imgR?.map((img, index) => (
                    <img
                    className="my-5 hover:translate-y-2 transition-all cursor-pointer"
                    key={index} 
                    src={img} 
                    alt={projet.nom}
                    onClick={() => setLightboxImage(img)} />
                ))}
            </div>

            <div className="w-full md:w-3/5">
                <div className="flex flex-col md:flex-row justify-between mb-3.5 gap-4">
                    <div className="w-full md:max-w-[40%]">
                        <h2 className="text-2xl font-bold my-5 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Technologies utilisées</h2>
                        {projet.techs?.map((tech, idx) => (
                            <span key={idx} className="inline-block rounded-full mb-5 px-3 py-1 text-sm font-semibold mr-2 transition-colors duration-300" 
                            style={{ 
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-primary)'
                            }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="w-full md:text-end md:max-w-[30%]">
                        <h2 className="text-2xl font-bold my-5 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Tags</h2>
                        {projet.tags?.map((tag, idx) => (
                            <span key={idx} className="inline-block rounded-full mb-5 px-3 py-1 text-sm font-semibold mr-2 transition-colors duration-300"
                            style={{ 
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-primary)'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row md:my-10 gap-4 items-start sm:items-center">
                    <a 
                    className="p-2 rounded-md drop-shadow-md hover:drop-shadow-none hover:translate-y-1 transition-all hover:bg-blue-400 hover:text-white w-full sm:w-auto text-center"
                    style={{
                        backgroundColor: 'var(--text-primary)',
                        color: 'var(--bg-primary)'
                    }}
                    target="_blank"
                    href={projet.lien_site}>
                        Retrouver ce projet
                    </a>
                    <a 
                    target="_blank"
                    href={projet.lien_github}>
                        <Github className="size-10 hover:[&_*]:fill-blue-400 transition-all" />
                    </a>
                </div>
                <article className="my-10">
                    <h3 className="text-2xl font-medium transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Contexte</h3>
                    <p className="transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{projet.contexte_fr}</p>
                </article>
                <article className="mb-10">
                    <h3 className="text-2xl font-medium transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Description</h3>
                    <p className="transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{projet.desc_fr}</p>
                </article>
            </div>
        </div>
    );
};

export default Projet;
