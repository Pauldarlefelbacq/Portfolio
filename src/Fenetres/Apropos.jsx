import { useEffect, useState } from 'react';
import { getAllSkills } from '../lib/backend.mjs';
import Perso from "../assets/Photo_perso.png";
import CV from "../assets/CV_Paul_Darle-Felbacq.pdf";

const tabs = [
	{ id: 'bio', label: 'Parcours' },
	{ id: 'skills', label: 'Compétences' },
	{ id: 'values', label: 'Valeurs' },
];

const timeline = [
	{
		year: '2024 à ce jour',
		title: 'BUT MMI',
		description: 'Approfondissement des expériences immersives, UI/UX et prototypage avancé.',
	},
	{
		year: '2021 à 2024',
		title: 'Licence informatique',
		description: 'Construction d’une application web responsive avec animations micro-interactions.',
	},
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
	const [skills, setSkills] = useState([]);
	const [skillsBySpe, setSkillsBySpe] = useState({});

	useEffect(() => {
		const fetchSkills = async () => {
			try {
				const allSkills = await getAllSkills();
				setSkills(allSkills);

				// Grouper les skills par spécialité
				const grouped = allSkills.reduce((acc, skill) => {
					const spe = skill.spe || 'Autres';
					if (!acc[spe]) {
						acc[spe] = [];
					}
					acc[spe].push(skill);
					return acc;
				}, {});
				setSkillsBySpe(grouped);
			} catch (error) {
				console.error('Erreur lors du chargement des skills:', error);
			}
		};

		fetchSkills();
	}, []);

	const content = (() => {
		switch (activeTab) {
			case 'skills':
				return (
					<div className="grid gap-6">
						{Object.entries(skillsBySpe).map(([spe, speSkills]) => (
							<div key={spe} className="rounded-2xl bg-white/80 p-4 shadow">
								<h3 className="mb-4 text-lg font-semibold capitalize text-gray-800">{spe}</h3>
								<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
									{speSkills.map((skill) => (
										<div
											key={skill.id}
											className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 transition hover:shadow-md"
										>
											<img
												src={skill.logoUrl}
												alt={skill.nom}
												className="h-12 w-12 object-contain"
											/>
											<span className="text-sm font-medium text-gray-700">{skill.nom}</span>
											<span className="text-xs text-gray-500">{skill.maitrise}</span>
										</div>
									))}
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
					<>
						<img src={Perso} alt="Photo de présentation" className="mx-auto mb-6 h-32 w-32 rounded-full object-cover shadow-lg" />
						<ol className="relative border-l border-white/40 pl-6">
							{timeline.map((item, index) => (
								<li key={item.year} className="mb-8 last:mb-0">
									<div className={`absolute -left-[11px] h-5 w-5 rounded-full border-2 border-white/70 ${index === 0 ? 'bg-blue-400' : 'bg-white'}`}></div>
									<p className="text-xs uppercase tracking-wide text-blue-500">{item.year}</p>
									<h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
									<p className="text-sm text-gray-600">{item.description}</p>
								</li>
							))}
						</ol>
						<div className="mt-6 flex flex-col gap-3">
							<a href={CV} download="CV_Paul_Darle-Felbacq.pdf" className="rounded-sm px-4 py-2 text-center text-sm font-semibold text-black hover:bg-black hover:text-white transition">
								Télécharger mon CV
							</a>
							<a href="mailto:darlefelbacqpaul@gmail.com" className="rounded-sm border px-4 py-2 text-center text-sm font-semibold text-black hover:bg-black hover:text-white transition">
								Me contacter
							</a>
						</div>
					</>
				);
		}
	})();

	return (
		<div className="flex h-full flex-col gap-5">
			<header className="rounded-3xl bg-white/70 p-6 shadow-xl">
				<h2 className="text-2xl font-semibold text-gray-800">Paul Darle-Felbacq</h2>
				<p className="mt-2 text-sm text-gray-600">
					Développeur web à en devenir, je cherche à créer plus que de simples sites, je veux créer des expériences inoubliables
				</p>
			</header>

			{/* Tabs - visible uniquement sur mobile */}
			<div className="flex flex-wrap gap-3 md:hidden">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`rounded-sm px-4 py-2 text-sm font-semibold transition ${
							activeTab === tab.id
								? 'bg-blue-400 text-emerald-950 shadow-lg'
								: 'bg-white/60 text-gray-600 hover:bg-white/80'
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Vue mobile - avec tabs */}
			<section className="flex-1 overflow-y-auto rounded-3xl bg-white/60 p-6 shadow-lg backdrop-blur md:hidden">
				{content}
			</section>

			{/* Vue desktop - tout affiché en colonnes */}
			<div className="hidden flex-1 grid-cols-3 gap-4 overflow-y-auto md:grid">
				{/* Colonne Parcours */}
				<section className="rounded-3xl bg-white/60 p-6 shadow-lg backdrop-blur">
					<img src={Perso} alt="Photo de présentation" className="mx-auto mb-4 h-32 w-32 rounded-full object-cover shadow-lg" />
					<h3 className="mb-4 text-lg font-semibold text-gray-800">Parcours</h3>
					<ol className="relative border-l border-white/40 pl-6">
						{timeline.map((item, index) => (
							<li key={item.year} className="mb-8 last:mb-0">
								<div className={`absolute -left-[11px] h-5 w-5 rounded-full border-2 border-white/70 ${index === 0 ? 'bg-blue-400' : 'bg-white'}`}></div>
								<p className="text-xs uppercase tracking-wide text-blue-500">{item.year}</p>
								<h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
								<p className="text-sm text-gray-600">{item.description}</p>
							</li>
						))}
					</ol>
					<div className="mt-6 flex flex-col gap-3">
						<a href={CV} download="CV_Paul_Darle-Felbacq.pdf" className="rounded-sm px-4 py-2 text-center text-sm font-semibold text-black hover:bg-black hover:text-white transition">
							Télécharger mon CV
						</a>
						<a href="mailto:darlefelbacqpaul@gmail.com" className="rounded-sm border px-4 py-2 text-center text-sm font-semibold text-black hover:bg-black hover:text-white transition">
							Me contacter
						</a>
					</div>
				</section>

				{/* Colonne Compétences */}
				<section className="rounded-3xl bg-white/60 p-6 shadow-lg backdrop-blur overflow-y-auto">
					<h3 className="mb-4 text-lg font-semibold text-gray-800">Compétences</h3>
					<div className="grid gap-6">
						{Object.entries(skillsBySpe).map(([spe, speSkills]) => (
							<div key={spe}>
								<h4 className="mb-3 text-sm font-semibold capitalize text-gray-700">{spe}</h4>
								<div className="grid grid-cols-2 gap-2">
									{speSkills.map((skill) => (
										<div
											key={skill.id}
											className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 hover:bg-gray-100"
										>
											<img
												src={skill.logoUrl}
												alt={skill.nom}
												className="h-8 w-8 object-contain"
											/>
											<div className="flex-1">
												<span className="block text-xs font-medium text-gray-700">{skill.nom}</span>
												<span className="text-[10px] text-gray-500">{skill.maitrise}</span>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Colonne Valeurs */}
				<section className="rounded-3xl bg-white/60 p-6 shadow-lg backdrop-blur">
					<h3 className="mb-4 text-lg font-semibold text-gray-800">Valeurs</h3>
					<div className="grid gap-4">
						{values.map((value) => (
							<div key={value.title} className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-lg backdrop-blur">
								<h3 className="text-lg font-semibold text-gray-700">{value.title}</h3>
								<p className="mt-2 text-sm text-gray-600">{value.description}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

export default Apropos;
