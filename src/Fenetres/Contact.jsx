const Contact = () => {
	return (
		<div className="flex h-full items-center justify-center p-4">
			<form 
				className="w-full max-w-lg space-y-6" 
				action="https://formspree.io/f/xqawedan	" 
				method="POST"
			>
				<div className="text-center">
					<h2 className="text-2xl font-semibold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Me contacter</h2>
					<p className="mt-2 text-sm transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>Envoyez-moi un message, je vous réponds rapidement !</p>
				</div>

				<div className="space-y-4">
					<div>
						<label htmlFor="mail" className="mb-1.5 block text-sm font-medium transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
							Adresse e-mail
						</label>
						<input
							className="w-full rounded-lg border px-4 py-2.5 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
							style={{ 
								backgroundColor: 'var(--bg-primary)', 
								color: 'var(--text-primary)',
								borderColor: 'var(--border-color)'
							}}
							type="email"
							name="_replyto"
							id="mail"
							placeholder="votre@email.com"
							required
						/>
					</div>

					<div>
						<label htmlFor="sujet" className="mb-1.5 block text-sm font-medium transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
							Sujet
						</label>
						<input
							className="w-full rounded-lg border px-4 py-2.5 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
							style={{ 
								backgroundColor: 'var(--bg-primary)', 
								color: 'var(--text-primary)',
								borderColor: 'var(--border-color)'
							}}
							type="text"
							name="_subject"
							id="sujet"
							placeholder="Objet de votre message"
							required
						/>
					</div>

					<div>
						<label htmlFor="message" className="mb-1.5 block text-sm font-medium transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
							Message
						</label>
						<textarea
							className="min-h-[150px] w-full resize-y rounded-lg border px-4 py-2.5 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
							style={{ 
								backgroundColor: 'var(--bg-primary)', 
								color: 'var(--text-primary)',
								borderColor: 'var(--border-color)'
							}}
							id="message"
							name="message"
							placeholder="Écrivez votre message ici..."
							required
						></textarea>
					</div>
				</div>

				<button
					type="submit"
					className="w-full rounded-lg px-6 py-3 font-semibold bg-black text-white transition hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
				>
					Envoyer le message
				</button>
			</form>
		</div>
	);
};

export default Contact;