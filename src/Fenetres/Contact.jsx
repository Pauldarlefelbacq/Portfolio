const Contact = () => {
	return (
		<div className="flex h-full items-center justify-center p-4">
			<form className="w-full max-w-lg space-y-6" action="" method="post">
				<div className="text-center">
					<h2 className="text-2xl font-semibold text-gray-800">Me contacter</h2>
					<p className="mt-2 text-sm text-gray-600">Envoyez-moi un message, je vous réponds rapidement !</p>
				</div>

				<div className="space-y-4">
					<div>
						<label htmlFor="mail" className="mb-1.5 block text-sm font-medium text-gray-700">
							Adresse e-mail
						</label>
						<input
							className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
							type="email"
							name="mail"
							id="mail"
							placeholder="votre@email.com"
							required
						/>
					</div>

					<div>
						<label htmlFor="sujet" className="mb-1.5 block text-sm font-medium text-gray-700">
							Sujet
						</label>
						<input
							className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
							type="text"
							name="sujet"
							id="sujet"
							placeholder="Objet de votre message"
							required
						/>
					</div>

					<div>
						<label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">
							Message
						</label>
						<textarea
							className="min-h-[150px] w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
							id="message"
							name="message"
							placeholder="Écrivez votre message ici..."
							required
						></textarea>
					</div>
				</div>

				<button
					type="submit"
					className="w-full rounded-lg px-6 py-3 font-semibold text-black transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
				>
					Envoyer le message
				</button>
			</form>
		</div>
	);
};

export default Contact;