import React, { useState } from 'react';
import Contact from './Fenetres/Contact';
import Apropos from './Fenetres/Apropos';
import Projets from './Fenetres/Projets';
import Navbar from "./Components/Navbar"
import Parametres from './Fenetres/Parametres';
import Projetsnew from './Fenetres/Projets_new';
import Projet from './Components/Projet';
import Corbeille from './Fenetres/Corbeille'

const createWindowId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

//création des icones d'applicationgue
const APPS = {
  about: { title: 'À propos', component: Apropos },
  projects: { title: 'Projets', component: Projets },
  contact: { title: 'Contact', component: Contact },
  parametres: { title: 'Paramètres', component: Parametres},
  corbeille: { title: 'Corbeille', component: Corbeille },
};

const DESKTOP_ICONS = [
  { key: 'about', emoji: '👤', label: 'À propos de moi' },
  { key: 'projects', emoji: '🎯', label: 'Mes projets' },
  { key: 'contact', emoji: '📝', label: 'Me contacter' },
  { key: 'parametres', emoji: 'I', label: 'Paramètres' },
  { key: 'corbeille', emoji: 'C', label: 'Corbeille' },
];


//gestion des fenêtres
const Window = ({ title, onClose, onMaximise, isMaximised, onMouseDown, positionY, positionX, children }) => {
  return (
    <div
      className={
        isMaximised
          ? "fixed flex flex-col bg-white/90 backdrop-blur-2xl border border-gray-300/50 shadow-2xl transition-all duration-200 top-0 left-0 w-screen h-screen rounded-none z-40"
          : `fixed flex flex-col bg-white/90 backdrop-blur-2xl border border-gray-300/50 shadow-2xl rounded-2xl transition-all duration-200 w-[90vw] h-[80vh] max-w-[1200px] max-h-[800px] min-w-[320px] min-h-[400px] z-40`
      }
      style={
        isMaximised
          ? { top: 0, left: 0 }
          : { top: positionY, left: positionX }
      }
    >
      <div onMouseDown={onMouseDown} className="title-bar flex justify-between items-center bg-gray-100/80 backdrop-blur-sm px-4 py-3 cursor-move border-b border-gray-300/50 rounded-t-2xl">
        <span className="font-semibold text-sm text-gray-800">{title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={onMaximise}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-300/50 rounded-full transition-colors duration-150"
            title="Maximize"
          >
            <span className="text-gray-600 text-xs">□</span>
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white rounded-full transition-colors duration-150"
            title="Close"
          >
            <span className="text-xs">✕</span>
          </button>
        </div>
      </div>

      <div className="window-body p-4 flex-grow overflow-auto">
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
    const projects = apps.projects;
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
    if (projects) {
      initialWindows.push({
        id: createWindowId('projects'),
        appKey: 'projects',
        title: projects.title,
        isMaximised: false,
        x: centeredPos ? centeredPos.x : '260px',
        y: centeredPos ? '15vh' : '220px',
        component: projects.component,
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
        y: isMobile ? `${10 + offsetShift * 0.5}vh` : `${100 + offsetShift}px`,
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
        y: isMobile ? `${10 + offsetShift * 0.5}vh` : `${100 + offsetShift}px`,
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
      className="desktop w-screen h-screen bg-[url(./assets/bureau_BG.webp)] bg-cover overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="absolute top-8 left-8 flex flex-col gap-6 z-10 ">
        {desktopIcons.map(icon => (
          <button
            key={icon.key}
            className="icon flex flex-col items-center gap-2 p-4 w-28 bg-white/20 backdrop-blur-md rounded-2xl cursor-pointer hover:bg-white/30 hover:scale-105 transition-all duration-200 shadow-xl"
            onClick={() => handleOpenApp(icon.key)}
          >
            <div className="text-4xl">{icon.emoji}</div>
            <span className="text-white text-xs font-medium text-center drop-shadow-lg hover:font-bold">{icon.label}</span>
          </button>
        ))}
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