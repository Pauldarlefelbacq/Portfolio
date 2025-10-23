import { useMemo, useState } from 'react';

const tabs = [
	{ id: 'bio', label: 'Parcours' },
	{ id: 'skills', label: 'Compétences' },
	{ id: 'values', label: 'Valeurs' },
];

const timeline = [
	{
		year: '2025',
		title: 'Bachelor MMI',
		description: 'Approfondissement des expériences immersives, UI/UX et prototypage avancé.',
	},
	{
		year: '2024',
		title: 'Stage design & dev',
		description: 'Construction d’une application web responsive avec animations micro-interactions.',
	},
	{
		year: '2023',
		title: 'Initiation JS & React',
		description: 'Création des premières interfaces interactives multi-plateforme.',
	},
];

const skills = [
	{ label: 'React', value: 86 },
	{ label: 'UI/UX', value: 90 },
	{ label: 'Motion', value: 72 },
	{ label: 'Prototypage', value: 84 },
];

const values = [
	{
		title: 'Curiosité',
		description: 'Je décortique chaque interface pour comprendre ce qui la rend mémorable ou fluide.',
	},
	{
		title: 'Empathie',
		description: 'Chaque choix de design part d’une question : comment simplifier la vie de l’utilisateur ?'
	},
	{
		title: 'Storytelling',
		description: 'J’aime embarquer l’utilisateur dans une narration claire, du micro-détail à l’expérience globale.',
	},
];

const Apropos = () => {
	const [activeTab, setActiveTab] = useState('bio');

	const content = useMemo(() => {
		switch (activeTab) {
			case 'skills':
				return (
					<div className="grid gap-4">
						{skills.map((skill) => (
							<div key={skill.label} className="rounded-2xl bg-white/80 p-4 shadow">
								<div className="flex items-center justify-between text-sm font-semibold text-gray-700">
									<span>{skill.label}</span>
									<span>{skill.value}%</span>
								</div>
								<div className="mt-2 h-2 rounded-full bg-gray-200">
									<div
										className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
										style={{ width: `${skill.value}%` }}
									></div>
								</div>
							</div>
						))}
					</div>
				);
			case 'values':
				return (
					<div className="grid gap-4 md:grid-cols-3">
						{values.map((value) => (
							<div key={value.title} className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-lg backdrop-blur">
								<h3 className="text-lg font-semibold text-gray-700">{value.title}</h3>
								<p className="mt-2 text-sm text-gray-600">{value.description}</p>
							</div>
						))}
					</div>
				);
			case 'bio':
			default:
				return (
					<ol className="relative border-l border-white/40 pl-6">
						{timeline.map((item, index) => (
							<li key={item.year} className="mb-8 last:mb-0">
								<div className={`absolute -left-[11px] h-5 w-5 rounded-full border-2 border-white/70 ${index === 0 ? 'bg-emerald-400' : 'bg-white'}`}></div>
								<p className="text-xs uppercase tracking-wide text-emerald-500">{item.year}</p>
								<h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
								<p className="text-sm text-gray-600">{item.description}</p>
							</li>
						))}
					</ol>
				);
		}
	}, [activeTab]);

	return (
		<div className="flex h-full flex-col gap-5">
			<header className="rounded-3xl bg-white/70 p-6 shadow-xl">
				<h2 className="text-2xl font-semibold text-gray-800">Salut, moi c’est Paul 👋</h2>
				<p className="mt-2 text-sm text-gray-600">
					Je conçois des expériences numériques qui mixent design audacieux et interactions fluides. Navigue entre mon parcours, mes skills et ce qui m’anime.
				</p>
			</header>

			<div className="flex flex-wrap gap-3">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
							activeTab === tab.id
								? 'bg-emerald-400 text-emerald-950 shadow-lg'
								: 'bg-white/60 text-gray-600 hover:bg-white/80'
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			<section className="flex-1 overflow-y-auto rounded-3xl bg-white/60 p-6 shadow-lg backdrop-blur">
				{content}
			</section>
		</div>
	);
};

export default Apropos;
