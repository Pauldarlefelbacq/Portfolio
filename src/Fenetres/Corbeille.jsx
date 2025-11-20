import Filter from "../assets/filter.svg?react";

import { getAllProjetsCorbeille } from "../lib/backend.mjs";
import { useEffect, useState } from 'react';


const Corbeille = ({ onOpenProjet }) => {
    const [focusIndex, setFocusIndex] = useState(0);
    
    const [projets, setprojets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [showFilterOverlay, setShowFilterOverlay] = useState(false);
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    
    const allTechs = [...new Set(projets.flatMap(p => p.techs || []))];
    const allTags = [...new Set(projets.flatMap(p => p.tags || []))];
    
    const projetsFiltre = projets.filter((prj) => {
        const matchSearch = prj.nom.toLowerCase().includes(search.toLowerCase());
        const matchTechs = selectedTechs.length === 0 || selectedTechs.some(tech => prj.techs?.includes(tech));
        const matchTags = selectedTags.length === 0 || selectedTags.some(tag => prj.tags?.includes(tag));
        return matchSearch && matchTechs && matchTags;
    });
    
    function handleChange(e){
        setSearch(e.target.value);
    }
    
    function toggleTech(tech) {
        setSelectedTechs(prev => 
            prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
        );
    }
    
    function toggleTag(tag) {
        setSelectedTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    }
    
    function resetFilters() {
        setSelectedTechs([]);
        setSelectedTags([]);
    }
    
    useEffect(() => {
        const fetchProjets = async () => {
            try {
                const listeProjets = await getAllProjetsCorbeille();
                
                setprojets(listeProjets); 
            } catch (err) {
                console.error("Echec de la récupération des projets:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjets();
    }, []); 

    useEffect(() => {
        if (focusIndex >= projetsFiltre.length) {
            setFocusIndex(0);
        }
    }, [projetsFiltre.length, focusIndex]);

    if (loading) {
        return <p>Chargement des projets...</p>;
    }

    if (error) {
        return <p>Une erreur a eu lieu: {error.message}</p>;
    }

    return (
        <div>
            <span className="m-4 md:m-10 flex flex-col sm:flex-row gap-4 items-center">
                <input 
                    id='search'
                    name='search'
                    placeholder='Rechercher'
                    className="drop-shadow-md p-4 w-full sm:w-2/3 md:w-2/5 rounded-md focus:translate-y-1 focus:drop-shadow-none transition-all"
                    style={{
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        borderColor: 'var(--border-color)'
                    }}
                    type="text" 
                    value={search}
                    onChange={handleChange} 
                />
                <button 
                    className="flex items-center gap-2 px-4 py-2 drop-shadow-md rounded-md hover:opacity-80 transition-all"
                    style={{
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)'
                    }}
                    onClick={() => setShowFilterOverlay(true)}
                >
                    <Filter className="size-6 md:size-10" />
                    <span className="font-medium">Filtrer</span>
                </button>
            </span>
            <div className="*:text-xl *:my-2 ml-10">
                <h3 className="font-bold">Je ne vois pas la corbeille comme quelque chose de mauvais, tout en est récupérable après tout.</h3>
                <h3 className="">Voici donc plusieurs projets qui n'ont soit pas de lien avec mon parcours professionnel soit qui n'ont pas aboutis.</h3>
                <h3 className="font-bold">Car rien ne mérite d'être complétement abandonné.</h3>
            </div>

            {showFilterOverlay && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                    onClick={() => setShowFilterOverlay(false)}
                >
                    <div 
                        className="rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto shadow-2xl transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                        style={{ backgroundColor: 'var(--bg-primary)' }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Filtrer les projets</h2>
                            <button
                                onClick={() => setShowFilterOverlay(false)}
                                className="hover:opacity-70 text-2xl transition-colors duration-300"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {allTechs.map((tech) => (
                                    <button
                                        key={tech}
                                        onClick={() => toggleTech(tech)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                            selectedTechs.includes(tech)
                                                ? 'bg-blue-500 text-white'
                                                : ''
                                        }`}
                                        style={!selectedTechs.includes(tech) ? {
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)'
                                        } : {}}
                                    >
                                        {tech}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                            selectedTags.includes(tag)
                                                ? 'bg-green-500 text-white'
                                                : ''
                                        }`}
                                        style={!selectedTags.includes(tag) ? {
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)'
                                        } : {}}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between gap-4">
                            <button
                                onClick={resetFilters}
                                className="px-6 py-2 rounded-lg font-semibold transition-all hover:opacity-80"
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                Réinitialiser
                            </button>
                            <button
                                onClick={() => setShowFilterOverlay(false)}
                                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                            >
                                Appliquer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="md:hidden p-4 overflow-auto h-full">
                <div className="grid grid-cols-1 gap-4">
                    {projetsFiltre.map((project, index) => (
                        <div 
                            key={project.id} 
                            onClick={() => {
                                setFocusIndex(index);
                                if (onOpenProjet) {
                                    onOpenProjet(project);
                                }
                            }}
                            className="rounded-lg drop-shadow-md hover:drop-shadow-lg transition-all p-4 cursor-pointer"
                            style={{ background: 'var(--bg-primary)' }}
                        >
                            {project.imgR?.[0] && (
                                <img className="w-full h-48 object-cover rounded-md mb-3" src={project.imgR[0]} alt={project.nom} />
                            )}
                                                        <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-bold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{project.nom}</h2>
                                <span className="text-sm transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>{project.date.slice(0, 7).replace("-", "/")}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {project.techs?.map((tech, idx) => (
                                    <span key={idx} className="inline-block bg-gray-400/70 rounded-full px-3 py-1 text-xs font-semibold text-white">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="hidden md:flex p-4 items-center h-full">
                <div className="w-2/3 overflow-auto">
                    {projetsFiltre.map((project, index) => (
                        <div 
                            key={project.id} 
                            onClick={() => {
                                setFocusIndex(index);
                                if (onOpenProjet) {
                                    onOpenProjet(project);
                                }
                            }}
                            style={{ 
                                fontWeight: focusIndex === index ? 'bold' : 'normal',
                                backgroundColor: 'var(--bg-primary)',
                                borderColor: 'var(--border-color)'
                            }}
                            className="flex justify-between cursor-pointer drop-shadow-sm hover:drop-shadow-none hover:translate-1 transition-all p-2 my-12 rounded border"
                        >
                            <h2 className="text-3xl transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{project.nom}</h2>
                            <h3 className="transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>{project.date.slice(0, 7).replace("-", "/")}</h3>
                        </div>
                    ))}
                </div>
                <div className="w-1/3 flex flex-col justify-center items-center">
                    {projetsFiltre[focusIndex]?.imgR?.[0] && (
                        <img className="max-w-full rounded-md" src={projetsFiltre[focusIndex].imgR[0]} alt={projetsFiltre[focusIndex].nom} />
                    )}
                    <h3>Technologies impliquées</h3>
                    <div className="w-9/10 place-content-center flex flex-wrap">
                        {projetsFiltre[focusIndex]?.techs?.map((tech, idx) => (
                            <span key={idx} className="inline-block bg-gray-400/70 rounded-sm mb-5 px-7 py-2 text-sm font-semibold text-white mr-2">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Corbeille;
