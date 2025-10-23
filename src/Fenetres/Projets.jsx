import { useMemo, useState } from 'react';

const projects = [
	{
		title: 'Pulse UI',
		description: 'Dashboard analytics avec transitions douces et mode sombre adaptatif.',
		stack: ['React', 'Framer Motion', 'Tailwind'],
		category: 'ui',
		year: 2025,
		link: '#',
	},
	{
		title: 'Wander Sound',
		description: 'Expérience immersive audio pour explorer des paysages sonores.',
		stack: ['Three.js', 'Web Audio', 'UX'],
		category: 'experiences',
		year: 2024,
		link: '#',
	},
	{
		title: 'Aura Portfolio',
		description: 'Site portfolio à sections parallaxe et navigation gestuelle.',
		stack: ['Next.js', 'GSAP'],
		category: 'experiences',
		year: 2023,
		link: '#',
	},
	{
		title: 'Flow Planner',
		description: 'Application de planification avec IA pour étudiants créatifs.',
		stack: ['React', 'TypeScript', 'OpenAI'],
		category: 'apps',
		year: 2024,
		link: '#',
	},
	{
		title: 'Mood Pixels',
		description: 'Générateur de palettes dynamiques selon la météo et l’heure.',
		stack: ['Vue', 'API REST'],
		category: 'apps',
		year: 2022,
		link: '#',
	},
];

const filters = [
	{ id: 'all', label: 'Tous' },
	{ id: 'ui', label: 'UI Dashboards' },
	{ id: 'apps', label: 'Apps' },
	{ id: 'experiences', label: 'Expériences' },
];

const Projets = () => {
	const [filter, setFilter] = useState('all');
	const [focusIndex, setFocusIndex] = useState(0);

	const filteredProjects = useMemo(() => {
		if (filter === 'all') {
			return projects;
		}
		return projects.filter((project) => project.category === filter);
	}, [filter]);

	const focusedProject = filteredProjects[focusIndex] ?? filteredProjects[0];

	return (
		<div className="grid h-full gap-6 md:grid-cols-[1.4fr_1fr]">
			<div className="flex flex-col gap-4">
				<header className="rounded-3xl bg-white/70 p-6 shadow-xl">
					<h2 className="text-2xl font-semibold text-gray-800">Projets sélectionnés</h2>
					<p className="mt-2 text-sm text-gray-600">
						Des expériences où j’ai mixé micro-interactions, data viz et storytelling.
					</p>
				</header>

				<div className="flex flex-wrap gap-3">
					{filters.map((item) => (
						<button
							key={item.id}
							onClick={() => {
								setFilter(item.id);
								setFocusIndex(0);
							}}
							className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
								filter === item.id
									? 'bg-cyan-400 text-cyan-950 shadow-lg'
									: 'bg-white/60 text-gray-600 hover:bg-white/80'
							}`}
						>
							{item.label}
						</button>
					))}
				</div>

				<div className="grid flex-1 gap-3 overflow-y-auto rounded-3xl bg-white/60 p-5 shadow-xl backdrop-blur">
					{filteredProjects.map((project, idx) => (
						<button
							key={project.title}
							onClick={() => setFocusIndex(idx)}
							className={`flex flex-col gap-2 rounded-2xl border border-transparent bg-white/80 p-4 text-left transition hover:-translate-y-1 hover:shadow-xl ${
								idx === focusIndex ? 'border-cyan-400 shadow-lg' : ''
							}`}
						>
							<div className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-500">
								<span>{project.category}</span>
								<span>{project.year}</span>
							</div>
							<h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
							<p className="text-sm text-gray-600">{project.description}</p>
							<div className="flex flex-wrap gap-2">
								{project.stack.map((tech) => (
									<span key={tech} className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700">
										{tech}
									</span>
								))}
							</div>
						</button>
					))}
				</div>
			</div>

			{focusedProject && (
				<aside className="flex flex-col gap-4 rounded-3xl bg-gradient-to-br from-cyan-500/80 via-teal-500/70 to-blue-500/60 p-6 text-white shadow-2xl">
					<h3 className="text-xl font-semibold">Focus projet</h3>
					<p className="text-lg font-semibold">{focusedProject.title}</p>
					<p className="text-sm text-white/90">{focusedProject.description}</p>
					<div>
						<p className="text-xs uppercase tracking-wide text-white/70">Stack</p>
						<div className="mt-2 flex flex-wrap gap-2">
							{focusedProject.stack.map((tech) => (
								<span key={tech} className="rounded-full border border-white/60 px-3 py-1 text-xs font-semibold">
									{tech}
								</span>
							))}
						</div>
					</div>
					<a
						href={focusedProject.link}
						className="mt-auto inline-flex items-center justify-center rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-white"
					>
						Étude de cas →
					</a>
				</aside>
			)}
		</div>
	);
};

export default Projets;
