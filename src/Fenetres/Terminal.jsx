import { useState, useEffect, useRef } from 'react';
import { loginUser, logoutUser, getCurrentUser, isAuthenticated, getAllProjets, createProjet, updateProjet, deleteProjet, getProjetById, moveToTrash, restoreFromTrash } from '../lib/backend.mjs';

const Terminal = () => {
	const [history, setHistory] = useState([]);
	const [input, setInput] = useState('');
	const [currentPath, setCurrentPath] = useState('~');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState('visiteur');
	const [awaitingPassword, setAwaitingPassword] = useState(false);
	const [loginUsername, setLoginUsername] = useState('');
	const [gameState, setGameState] = useState({
		started: false,
		level: 0,
		score: 0,
		foundItems: [],
	});
	
	const inputRef = useRef(null);
	const historyEndRef = useRef(null);

	// Système de fichiers virtuel pour le jeu
	const [fileSystem, setFileSystem] = useState({
		'~': ['Documents', 'Photos', 'secret.txt'],
		'~/Documents': ['projet.txt', 'notes.md', 'cv.pdf'],
		'~/Photos': ['vacances.jpg', 'famille.png', 'tresor.jpg'],
		'~/secret': ['clef.key', 'message.txt'],
	});

	const treasureItems = ['tresor.jpg', 'clef.key', 'secret.txt'];

	useEffect(() => {
		if (isAuthenticated()) {
			const user = getCurrentUser();
			setIsLoggedIn(true);
			setUsername(user.username || user.email);
			setFileSystem(prev => ({
				...prev,
				'~': [...new Set([...prev['~'], 'secret'])]
			}));
		}

		setHistory([
			{ type: 'system', text: '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀' },
			{ type: 'system', text: '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀' },
			{ type: 'system', text: '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀' },
			{ type: 'system', text: '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀' },
			{ type: 'system', text: '⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣷⣤⣙⢻⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀' },
			{ type: 'system', text: '⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀' },
			{ type: 'system', text: '⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀' },
			{ type: 'system', text: '⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⡿⠛⠛⠿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀' },
			{ type: 'system', text: '⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀' },
			{ type: 'system', text: '⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⠿⣆⠀⠀⠀⠀' },
			{ type: 'system', text: '⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀' },
			{ type: 'system', text: '⠀⢀⣾⣿⣿⠿⠟⠛⠋⠉⠉⠀⠀⠀⠀⠀⠀⠉⠉⠙⠛⠻⠿⣿⣿⣷⡀⠀' },
			{ type: 'system', text: '⣠⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣄' },
			{ type: 'system', text: '' },
			{ type: 'system', text: '================================================' },
			{ type: 'system', text: '    Portfolio Terminal v1.0' },
			{ type: 'system', text: '================================================' },
			{ type: 'system', text: '' },
			{ type: 'info', text: 'Tapez "help" pour voir les commandes disponibles' },
			{ type: 'info', text: 'Tapez "game" pour démarrer le challenge' },
			{ type: 'system', text: '' },
		]);
	}, []);

	useEffect(() => {
		historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [history]);

	const addToHistory = (entry) => {
		setHistory((prev) => [...prev, entry]);
	};

	const executeCommand = (cmd) => {
		const trimmedCmd = cmd.trim().toLowerCase();
		const parts = trimmedCmd.split(' ');
		const command = parts[0];
		const args = parts.slice(1);

		addToHistory({ type: 'command', text: `${username}@portfolio:${currentPath}$ ${cmd}` });

		switch (command) {
			case 'help':
				addToHistory({ type: 'output', text: 'Commandes disponibles:' });
				addToHistory({ type: 'output', text: '  help          - Affiche cette aide' });
				addToHistory({ type: 'output', text: '  ls            - Liste les fichiers du répertoire' });
				addToHistory({ type: 'output', text: '  cd <dir>      - Change de répertoire' });
				addToHistory({ type: 'output', text: '  cat <file>    - Affiche le contenu d\'un fichier' });
				addToHistory({ type: 'output', text: '  pwd           - Affiche le chemin actuel' });
				addToHistory({ type: 'output', text: '  whoami        - Affiche l\'utilisateur actuel' });
				addToHistory({ type: 'output', text: '  clear         - Efface l\'écran' });
				addToHistory({ type: 'output', text: '  game          - Lance le challenge' });
				addToHistory({ type: 'output', text: '  score         - Affiche votre score' });
				if (isLoggedIn) {
					addToHistory({ type: 'system', text: '' });
					addToHistory({ type: 'system', text: 'Commandes Admin (Projets):' });
					addToHistory({ type: 'output', text: '  projects-list         - Liste tous les projets' });
					addToHistory({ type: 'output', text: '  project-view <id>     - Affiche un projet' });
					addToHistory({ type: 'output', text: '  project-add           - Ajoute un nouveau projet' });
					addToHistory({ type: 'output', text: '  project-edit <id>     - Modifie un projet' });
					addToHistory({ type: 'output', text: '  project-trash <id>    - Déplace vers la corbeille' });
					addToHistory({ type: 'output', text: '  project-restore <id>  - Restaure de la corbeille' });
					addToHistory({ type: 'output', text: '  project-delete <id>   - Supprime définitivement' });
				}
				break;

			case 'ls':
				const files = fileSystem[currentPath] || [];
				if (files.length === 0) {
					addToHistory({ type: 'output', text: 'Répertoire vide' });
				} else {
					files.forEach((file) => {
						const isTreasure = treasureItems.includes(file);
						const style = isTreasure ? 'success' : 'output';
						addToHistory({ type: style, text: `  ${file}${isTreasure ? ' *' : ''}` });
					});
				}
				break;

			case 'pwd':
				addToHistory({ type: 'output', text: currentPath });
				break;

			case 'cd':
				if (args.length === 0) {
					setCurrentPath('~');
					addToHistory({ type: 'success', text: 'Retour au répertoire home' });
				} else if (args[0] === '..') {
					if (currentPath !== '~') {
						const newPath = currentPath.split('/').slice(0, -1).join('/') || '~';
						setCurrentPath(newPath);
					}
				} else {
					const newPath = currentPath === '~' ? `~/${args[0]}` : `${currentPath}/${args[0]}`;
					if (fileSystem[newPath]) {
						setCurrentPath(newPath);
					} else {
						addToHistory({ type: 'error', text: `cd: ${args[0]}: No such file or directory` });
					}
				}
				break;

			case 'cat':
				if (args.length === 0) {
					addToHistory({ type: 'error', text: 'cat: missing file operand' });
				} else {
					const fileName = args[0];
					const files = fileSystem[currentPath] || [];
					
					if (files.includes(fileName)) {
						if (fileName === 'secret.txt') {
							addToHistory({ type: 'success', text: '[SUCCESS] Premier secret découvert' });
							addToHistory({ type: 'output', text: 'Indice: Regardez dans le dossier Photos...' });
							updateGameProgress('secret.txt');
						} else if (fileName === 'tresor.jpg') {
							addToHistory({ type: 'success', text: '[SUCCESS] Trésor localisé, mais verrouillé' });
							addToHistory({ type: 'output', text: 'Indice: Une clef est cachée dans un dossier secret...' });
							updateGameProgress('tresor.jpg');
						} else if (fileName === 'clef.key') {
							addToHistory({ type: 'success', text: '[SUCCESS] Clef acquise - Challenge terminé !' });
							addToHistory({ type: 'success', text: `Score final: ${gameState.score + 100} points` });
							updateGameProgress('clef.key');
						} else {
							addToHistory({ type: 'output', text: `Contenu de ${fileName}: [Document standard]` });
						}
					} else {
						addToHistory({ type: 'error', text: `cat: ${fileName}: No such file or directory` });
					}
				}
				break;

			case 'whoami':
				addToHistory({ type: 'output', text: username });
				if (isLoggedIn) {
					addToHistory({ type: 'success', text: 'Statut: Administrateur' });
				}
				break;

			case 'clear':
				setHistory([]);
				break;

			case 'game':
				if (!gameState.started) {
					setGameState({ started: true, level: 0, score: 0, foundItems: [] });
					addToHistory({ type: 'success', text: '[GAME] Challenge démarré' });
					addToHistory({ type: 'info', text: 'Mission: Localiser 3 objets cachés dans le système' });
					addToHistory({ type: 'info', text: 'Indice: Commencez par chercher "secret.txt"' });
					addToHistory({ type: 'info', text: 'Utilisez "ls" et "cat" pour explorer' });
				} else {
					addToHistory({ type: 'warning', text: 'Challenge déjà en cours' });
				}
				break;

			case 'score':
				if (gameState.started) {
					addToHistory({ type: 'info', text: `Score actuel: ${gameState.score} points` });
					addToHistory({ type: 'info', text: `Objets trouvés: ${gameState.foundItems.length}/3` });
					gameState.foundItems.forEach(item => {
						addToHistory({ type: 'success', text: `  [OK] ${item}` });
					});
				} else {
					addToHistory({ type: 'warning', text: 'Lancez le jeu avec "game" pour commencer' });
				}
				break;

			case 'login':
				if (args.length === 0) {
					addToHistory({ type: 'info', text: 'Usage: login <username>' });
					addToHistory({ type: 'info', text: 'La connexion se fait via PocketBase' });
				} else {
					setLoginUsername(args[0]);
					setAwaitingPassword(true);
					addToHistory({ type: 'info', text: `Password for ${args[0]}:` });
				}
				break;

			case 'logout':
				if (isLoggedIn) {
					logoutUser();
					setIsLoggedIn(false);
					setUsername('visiteur');
					setFileSystem(prev => ({
						...prev,
						'~': prev['~'].filter(item => item !== 'secret')
					}));
					addToHistory({ type: 'success', text: '[OK] Déconnexion réussie' });
				} else {
					addToHistory({ type: 'warning', text: 'Aucune session active' });
				}
				break;

			case 'projects-list':
				if (!isLoggedIn) {
					addToHistory({ type: 'error', text: 'Permission denied: Authentication required' });
					break;
				}
				addToHistory({ type: 'info', text: 'Chargement des projets...' });
				getAllProjets().then(projects => {
					addToHistory({ type: 'success', text: `Nombre de projets: ${projects.length}` });
					projects.forEach(p => {
						addToHistory({ type: 'output', text: `  [${p.id}] ${p.nom} - ${p.tags?.join(', ') || 'N/A'}` });
					});
				}).catch(error => {
					addToHistory({ type: 'error', text: `Error: ${error.message}` });
				});
				break;

			case 'project-view':
				if (!isLoggedIn) {
					addToHistory({ type: 'error', text: 'Permission denied: Authentication required' });
					break;
				}
				if (args.length === 0) {
					addToHistory({ type: 'error', text: 'Usage: project-view <id>' });
					break;
				}
				getProjetById(args[0]).then(result => {
					if (result.success) {
						const p = result.record;
						addToHistory({ type: 'success', text: `Projet: ${p.nom}` });
						addToHistory({ type: 'output', text: `ID: ${p.id}` });
						addToHistory({ type: 'output', text: `Contexte: ${p.contexte_fr}` });
						addToHistory({ type: 'output', text: `Description: ${p.desc_fr}` });
						addToHistory({ type: 'output', text: `Technologies: ${p.techs?.join(', ') || 'N/A'}` });
						addToHistory({ type: 'output', text: `Tags: ${p.tags?.join(', ') || 'N/A'}` });
						addToHistory({ type: 'output', text: `Site: ${p.lien_site || 'N/A'}` });
						addToHistory({ type: 'output', text: `GitHub: ${p.lien_github || 'N/A'}` });
						addToHistory({ type: 'output', text: `Date: ${p.date}` });
						addToHistory({ type: 'output', text: `Corbeille: ${p.corbeille ? 'Oui' : 'Non'}` });
					} else {
						addToHistory({ type: 'error', text: `Error: ${result.error}` });
					}
				});
				break;

			case 'project-add':
				if (!isLoggedIn) {
					addToHistory({ type: 'error', text: 'Permission denied: Authentication required' });
					break;
				}
				addToHistory({ type: 'info', text: 'Format: nom|contexte|description|site|github|techs|tags' });
				addToHistory({ type: 'info', text: 'Exemple: Mon Projet|Contexte du projet|Description détaillée|https://site.com|https://github.com|HTML,CSS,JS|Front-end,Web' });
				addToHistory({ type: 'warning', text: 'Entrez les données (séparées par |):' });
				break;

			case 'project-edit':
				if (!isLoggedIn) {
					addToHistory({ type: 'error', text: 'Permission denied: Authentication required' });
					break;
				}
				if (args.length < 2) {
					addToHistory({ type: 'error', text: 'Usage: project-edit <id> field=value [field2=value2...]' });
					addToHistory({ type: 'info', text: 'Exemple: project-edit abc123 nom="Nouveau nom" tags=Front-end,Web' });
					break;
				}
				const projectId = args[0];
				const updates = {};
				args.slice(1).forEach(arg => {
					const [key, ...valueParts] = arg.split('=');
					let value = valueParts.join('=').replace(/^["']|["']$/g, '');
					if (key === 'techs' || key === 'tags' || key === 'img') {
						value = value.split(',').map(v => v.trim());
					} else if (key === 'corbeille') {
						value = value === 'true';
					}
					updates[key] = value;
				});
				updateProjet(projectId, updates).then(result => {
					if (result.success) {
						addToHistory({ type: 'success', text: `[OK] Projet ${projectId} mis à jour` });
					} else {
						addToHistory({ type: 'error', text: `Error: ${result.error}` });
					}
				});
				break;

			case 'project-trash':
				if (!isLoggedIn) {
					addToHistory({ type: 'error', text: 'Permission denied: Authentication required' });
					break;
				}
				if (args.length === 0) {
					addToHistory({ type: 'error', text: 'Usage: project-trash <id>' });
					break;
				}
				moveToTrash(args[0]).then(result => {
					if (result.success) {
						addToHistory({ type: 'success', text: `[OK] Projet ${args[0]} déplacé vers la corbeille` });
					} else {
						addToHistory({ type: 'error', text: `Error: ${result.error}` });
					}
				});
				break;

			case 'project-restore':
				if (!isLoggedIn) {
					addToHistory({ type: 'error', text: 'Permission denied: Authentication required' });
					break;
				}
				if (args.length === 0) {
					addToHistory({ type: 'error', text: 'Usage: project-restore <id>' });
					break;
				}
				restoreFromTrash(args[0]).then(result => {
					if (result.success) {
						addToHistory({ type: 'success', text: `[OK] Projet ${args[0]} restauré` });
					} else {
						addToHistory({ type: 'error', text: `Error: ${result.error}` });
					}
				});
				break;

			case 'project-delete':
				if (!isLoggedIn) {
					addToHistory({ type: 'error', text: 'Permission denied: Authentication required' });
					break;
				}
				if (args.length === 0) {
					addToHistory({ type: 'error', text: 'Usage: project-delete <id>' });
					break;
				}
				addToHistory({ type: 'warning', text: `ATTENTION: Suppression définitive du projet ${args[0]}` });
				deleteProjet(args[0]).then(result => {
					if (result.success) {
						addToHistory({ type: 'success', text: `[OK] Projet ${args[0]} supprimé définitivement` });
					} else {
						addToHistory({ type: 'error', text: `Error: ${result.error}` });
					}
				});
				break;

			case '':
				break;

			default:
				addToHistory({ type: 'error', text: `${command}: command not found` });
				addToHistory({ type: 'info', text: 'Tapez "help" pour voir les commandes disponibles' });
				break;
		}
	};

	const updateGameProgress = (item) => {
		if (gameState.started && !gameState.foundItems.includes(item)) {
			const newFoundItems = [...gameState.foundItems, item];
			const points = treasureItems.indexOf(item) === 0 ? 50 : treasureItems.indexOf(item) === 1 ? 75 : 100;
			
			setGameState({
				...gameState,
				foundItems: newFoundItems,
				score: gameState.score + points,
				level: newFoundItems.length,
			});

			if (newFoundItems.length === 3) {
				addToHistory({ type: 'success', text: '[COMPLETED] Tous les objectifs atteints !' });
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (input.trim()) {
			if (awaitingPassword) {
				// Mode password - on masque le mot de passe dans l'historique
				addToHistory({ type: 'command', text: `${username}@portfolio:${currentPath}$ ********` });
				
				// Tentative de connexion
				const result = await loginUser(loginUsername, input);
				
				if (result.success) {
					setIsLoggedIn(true);
					setUsername(result.user.username || result.user.email);
					addToHistory({ type: 'success', text: `[OK] Authentification réussie en tant que ${result.user.username || result.user.email}` });
					addToHistory({ type: 'info', text: 'Accès au dossier secret déverrouillé' });
					// Déverrouiller le dossier secret
					setFileSystem(prev => ({
						...prev,
						'~': [...new Set([...prev['~'], 'secret'])]
					}));
				} else {
					addToHistory({ type: 'error', text: '[FAILED] Authentification échouée' });
					addToHistory({ type: 'error', text: result.error });
				}
				
				setAwaitingPassword(false);
				setLoginUsername('');
			} else {
				executeCommand(input);
			}
			setInput('');
		}
	};

	const getTypeColor = (type) => {
		switch (type) {
			case 'command':
				return 'text-green-400';
			case 'error':
				return 'text-red-400';
			case 'success':
				return 'text-emerald-400';
			case 'warning':
				return 'text-yellow-400';
			case 'info':
				return 'text-blue-400';
			case 'system':
				return 'text-purple-400';
			default:
				return 'text-gray-300';
		}
	};

	return (
		<div className="flex h-full flex-col bg-gray-900 p-4 font-mono text-sm">
			<div className="flex-1 overflow-y-auto">
				{history.map((entry, index) => (
					<div key={index} className={`${getTypeColor(entry.type)} mb-1`}>
						{entry.text}
					</div>
				))}
				<div ref={historyEndRef} />
			</div>

			<form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
				<span className="text-green-400">
					{awaitingPassword ? 'Password:' : `${username}@portfolio:${currentPath}$`}
				</span>
				<input
					ref={inputRef}
					type={awaitingPassword ? 'password' : 'text'}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="flex-1 bg-transparent text-white outline-none"
					autoFocus
					spellCheck="false"
				/>
			</form>

			{gameState.started && (
				<div className="mt-2 flex items-center justify-between border-t border-gray-700 pt-2 text-xs">
					<span className="text-blue-400">
						[GAME] Actif | Score: {gameState.score}
					</span>
					<span className="text-emerald-400">
						Progrès: {gameState.foundItems.length}/3 objets
					</span>
				</div>
			)}
		</div>
	);
};

export default Terminal;
