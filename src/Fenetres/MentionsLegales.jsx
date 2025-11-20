const MentionsLegales = () => {
    return (
        <div className="h-full overflow-auto p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                    Mentions légales
                </h1>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                        Éditeur du site
                    </h2>
                    <div className="space-y-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                        <p>
                            Le site est édité par <strong>Paul Darle-Felbacq</strong>, étudiant, projet réalisé dans le cadre scolaire.
                        </p>
                        <p>
                            <strong>Email :</strong> <a href="mailto:andrea.mestre4510@gmail.com" className="text-blue-500 hover:text-blue-600 underline">darlefelbacqpaul@gmail.com</a>
                        </p>
                        <p>
                            Le site constitue un portfolio personnel, à but non commercial, destiné à présenter différents projets réalisés par l'auteur dans les domaines web, applicatif, graphique et audiovisuel.
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                        Hébergement
                    </h2>
                    <div className="space-y-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                        <p>Le site est hébergé sur un vps personnel fourni par :</p>
                        <p>
                            <strong>L'IUT Nord Franche Comté</strong>
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                        Fournisseur d'adresse
                    </h2>
                    <div className="space-y-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                        <p>L'adresse du site est fournie par :</p>
                        <p>
                            <strong>Infomaniak Network SA</strong>
                        </p>
                                                <p>
                            Rue Eugène-Marziano 25
                        </p>
                        <p>
                            1227 Genève, Suisse
                        </p>
                        <p>
                            Site : <a href="https://www.infomaniak.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 underline">www.infomaniak.com</a>
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                        Propriété intellectuelle
                    </h2>
                    <div className="space-y-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                        <p>
                            L'ensemble des contenus présents sur ce site (textes, images, vidéos, animations, graphismes, logos, code source, etc.) est la propriété exclusive de <strong>Paul Darle-Felbacq</strong>, sauf mention contraire.
                        </p>
                        <p>
                            L'image de fond n'est pas la propriété de <strong>Paul Darle-Felbacq</strong> mais est une image libre d'utilisation qui a été upscale grâce à un outil d'IA, la prétention aux droits d'auteur ne s'applique donc pas.
                        </p>
                        <p>
                            Toute reproduction à l'identique, par quelque procédé que ce soit, constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                        Données personnelles
                    </h2>
                    <div className="space-y-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                        <p>
                            Aucune donnée personnelle n'est collectée à des fins commerciales ou statistiques.
                        </p>
                        <p>
                            Le formulaire de contact permet uniquement d'envoyer un message directement par email à l'éditeur(via formspree). Les messages ne sont pas stockés sur le site.
                        </p>
                        <p>
                            Aucun cookie de traçage ni outil tiers (Analytics, reCAPTCHA, etc.) n'est utilisé.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MentionsLegales;
