import React, { useState } from 'react';

import ContactSvg from "./assets/Contact.svg";
import ProjetsSvg from "./assets/Dossier.svg";
import CorbeilleSvg from "./assets/Poubelle.svg";
import ProfilSvg from "./assets/Profil.svg";
import ParamSvg from "./assets/settings.svg";
import TerminalSvg from './assets/Terminal.svg'
import MentionSvg from './assets/Mentions.svg'

import Contact from './Fenetres/Contact';
import Apropos from './Fenetres/Apropos';
import Projets from './Fenetres/Projets';
import Navbar from "./Components/Navbar"
import Parametres from './Fenetres/Parametres';
import Projetsnew from './Fenetres/Projets_new';
import Projet from './Components/Projet';
import Corbeille from './Fenetres/Corbeille'
import Terminal from './Fenetres/Terminal';
import MentionsLegales from './Fenetres/MentionsLegales';

const createWindowId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

//création des icones d'applicationgue
const APPS = {
  about: { title: 'À propos', component: Apropos },
  projects: { title: 'Projets', component: Projets },
  contact: { title: 'Contact', component: Contact },
  terminal: { title: 'Terminal', component: Terminal },
  parametres: { title: 'Paramètres', component: Parametres},
  corbeille: { title: 'Corbeille', component: Corbeille },
  mentions: { title: 'Mentions légales', component: MentionsLegales },
};

const DESKTOP_ICONS = [
  { key: 'about', svg: ProfilSvg, label: 'À propos de moi' },
  { key: 'projects', svg: ProjetsSvg, label: 'Mes projets' },
  { key: 'contact', svg: ContactSvg, label: 'Me contacter' },
  { key: 'parametres', svg: ParamSvg, label: 'Paramètres' },
  { key: 'corbeille', svg: CorbeilleSvg, label: 'Corbeille' },
  { key: 'mentions', svg: MentionSvg, label: 'Mentions légales' },
];

const TERMINAL_ICON = { key: 'terminal', svg: TerminalSvg, label: 'Terminal' };


//gestion des fenêtres
const Window = ({ title, onClose, onMaximise, isMaximised, onMouseDown, positionY, positionX, children }) => {
  return (
    <div
      className={
        isMaximised
          ? "fixed flex flex-col backdrop-blur-2xl border shadow-2xl transition-all duration-300 top-0 left-0 w-screen rounded-none z-40"
          : `fixed flex flex-col backdrop-blur-2xl border shadow-2xl rounded-2xl transition-all duration-300 w-[90vw] h-[80vh] max-w-[1200px] max-h-[800px] min-w-[320px] min-h-[400px] z-40`
      }
      style={{
        ...(isMaximised ? { top: 0, left: 0, height: 'calc(100vh - 64px)' } : { top: positionY, left: positionX }),
        backgroundColor: 'var(--window-bg)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div onMouseDown={onMouseDown} className="title-bar flex justify-between items-center backdrop-blur-sm px-4 py-3 cursor-move border-b rounded-t-2xl transition-colors duration-300"
           style={{ backgroundColor: 'var(--window-titlebar)', borderColor: 'var(--border-color)' }}>
        <span className="font-semibold text-sm transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={onMaximise}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 hover:bg-gray-300/50 dark:hover:bg-gray-600/50"
            title="Maximize"
          >
            <span className="text-md font-bold transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>□</span>
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white rounded-full transition-colors duration-150"
            title="Close"
          >
            <span className="text-xl" style={{ color: 'var(--text-primary)' }}>✕</span>
          </button>
        </div>
      </div>

      <div className="window-body p-4 flex-grow overflow-auto transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
        {children}
      </div>
    </div>
  );
};

//gestion des mouvements des fenêtres sur le bureau ainsi qu'entre autres le bureau
const Desktop = () => {
  const apps = APPS;
  const desktopIcons = DESKTOP_ICONS;
  
  // Fonction pour calculer la position centrée
  const getCenteredPosition = () => {
    if (window.innerWidth < 768) { // Mobile
      return { x: '5vw', y: '10vh' };
    }
    return null; // Desktop: utiliser les positions fixes
  };

  const [openWindows, setOpenWindows] = useState(() => {
    const initialWindows = [];
    const about = apps.about;
    const centeredPos = getCenteredPosition();

    if (about) {
      initialWindows.push({
        id: createWindowId('about'),
        appKey: 'about',
        title: about.title,
        isMaximised: false,
        x: centeredPos ? centeredPos.x : '140px',
        y: centeredPos ? centeredPos.y : '100px',
        component: about.component,
      });
    }

    return initialWindows;
  });
  const [fenetreQuiBouge, setFenetreQuiBouge] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });


  const handleOpenApp = (appKey) => {
    const app = apps[appKey];
    if (!app) return;

    setOpenWindows(prev => {
      const existing = prev.find(win => win.appKey === appKey);
      if (existing) {
        const others = prev.filter(win => win.appKey !== appKey);
        return [...others, existing];
      }

      const isMobile = window.innerWidth < 768;
      const offsetShift = prev.length * 36;
      const newWindow = {
        id: createWindowId(appKey),
        appKey,
        title: app.title,
        isMaximised: false,
        x: isMobile ? '5vw' : `${140 + offsetShift}px`,
        y: isMobile ? `${5 + offsetShift * 0.3}vh` : `${100 + offsetShift}px`,
        component: app.component,
      };

      return [...prev, newWindow];
    });
  };

  const handleOpenProjet = (projet) => {
    setOpenWindows(prev => {
      const isMobile = window.innerWidth < 768;
      const offsetShift = prev.length * 36;
      const newWindow = {
        id: createWindowId('projet'),
        appKey: `projet-${projet.id}`,
        title: projet.nom,
        isMaximised: false,
        x: isMobile ? '5vw' : `${140 + offsetShift}px`,
        y: isMobile ? `${5 + offsetShift * 0.3}vh` : `${100 + offsetShift}px`,
        component: () => <Projet projet={projet} />,
      };

      return [...prev, newWindow];
    });
  };


  const handleCloseApp = (idToClose) => {
    setOpenWindows(prevWindows => prevWindows.filter(win => win.id !== idToClose));
  };
  const handleMaximiseApp = (id) => {
    setOpenWindows(currentWindows =>
      currentWindows.map(win => {
        if (win.id === id) {
          return { ...win, isMaximised: !win.isMaximised };
        }
        return win;
      })
    );
  };
  const handleMouseDown = (e, id) => {
    const windowRef = openWindows.find(win => win.id === id);
    if (!windowRef || windowRef.isMaximised) return;
    e.preventDefault();
    const offsetX = e.clientX - parseInt(windowRef.x, 10);
    const offsetY = e.clientY - parseInt(windowRef.y, 10);
    setOffset({ x: offsetX, y: offsetY });
    setFenetreQuiBouge(id);

    setOpenWindows(prev => {
      const index = prev.findIndex(win => win.id === id);
      if (index === -1) return prev;
      const updated = [...prev];
      const [dragged] = updated.splice(index, 1);
      return [...updated, dragged];
    });
  };
  const handleMouseMove = (e) => {
    if (!fenetreQuiBouge) return;
    setOpenWindows(currentWindows =>
      currentWindows.map(win => {
        if (win.id === fenetreQuiBouge) {
          if (win.isMaximised) {
            return win;
          }
          const newX = e.clientX - offset.x;
          const newY = e.clientY - offset.y;
          return { ...win, x: `${newX}px`, y: `${newY}px` };
        }
        return win;
      })
    );
  };
  const handleMouseUp = () => {
    setFenetreQuiBouge(null);
  };

  //affichage de tout ça
  return (
    <div
      className="desktop w-screen h-screen bg-[url(./assets/bureau_BG.webp)] bg-cover overflow-hidden relative transition-colors duration-500"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 transition-colors duration-500" 
             style={{ backgroundColor: 'var(--desktop-gradient)' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 transition-colors duration-500"
             style={{ backgroundColor: 'var(--desktop-gradient)' }}></div>
      </div>

      <div className="absolute top-8 left-8 flex flex-wrap max-w-4/5 gap-6 z-10">
        {desktopIcons.map(icon => (
          <button
            key={icon.key}
            className="icon flex flex-col items-center gap-2 p-4 w-28 backdrop-blur-md rounded-2xl cursor-pointer hover:scale-105 transition-all duration-200 shadow-xl group"
            onClick={() => handleOpenApp(icon.key)}
            style={{ 
              backgroundColor: 'var(--icon-bg)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--icon-bg-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--icon-bg)'}
          >
            {icon.svg ? (
              <img 
                src={icon.svg} 
                alt={icon.label} 
                className="w-12 h-12 transition-all duration-200" 
                style={{ 
                  filter: 'brightness(0) saturate(100%) invert(100%)'
                }}
              />
            ) : (
              <div className="text-4xl">{icon.emoji}</div>
            )}
            <span className="text-xs text-white font-medium text-center drop-shadow-lg hover:font-bold transition-all duration-200"
              >{icon.label}</span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-20 right-8 z-10">
        <button
          className="icon flex flex-col items-center gap-2 p-4 w-28 backdrop-blur-md rounded-2xl cursor-pointer hover:scale-105 transition-all duration-200 shadow-xl"
          onClick={() => handleOpenApp(TERMINAL_ICON.key)}
          style={{ 
            backgroundColor: 'var(--icon-bg)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--icon-bg-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--icon-bg)'}
        >
          <img 
                src={TERMINAL_ICON.svg} 
                alt={TERMINAL_ICON.label} 
                className="w-12 h-12 transition-all duration-200" 
                style={{ 
                  filter: 'brightness(0) saturate(100%) invert(100%)'
                }}
              />
          <span className="text-xs font-medium text-center drop-shadow-lg hover:font-bold transition-all duration-200"
                style={{ color: 'var(--text-primary)' }}>{TERMINAL_ICON.label}</span>
        </button>
      </div>

      {openWindows.map(win => {
        const Content = win.component;
        return (
          <Window
            key={win.id}
            title={win.title}
            isMaximised={win.isMaximised}
            positionX={win.x}
            positionY={win.y}
            onClose={() => handleCloseApp(win.id)}
            onMaximise={() => handleMaximiseApp(win.id)}
            onMouseDown={(e) => handleMouseDown(e, win.id)}
          >
            {win.appKey === 'projects' || win.appKey === 'corbeille' ? (
              <Content onOpenProjet={handleOpenProjet} />
            ) : win.appKey === 'parametres' ? (
              <Content onOpenMentions={() => handleOpenApp('mentions')} />
            ) : (
              <Content />
            )}
          </Window>
        );
      })}
      <Navbar handleOpenApp={handleOpenApp} />

    </div>
  );
};

export default Desktop;