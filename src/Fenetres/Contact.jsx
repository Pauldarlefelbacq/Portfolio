const Contact = () =>{
    return (
        <form className="text-center" action="" method="post">
            <ul className="*:my-4 *:flex *:flex-col">
                <li>
                    <label htmlFor="mail">Adresse mail</label>
                    <input className="border rounded-lg w-2/3 mx-auto" type="email" name="mail" id="mail" />
                </li>
                <li>
                    <label htmlFor="sujet">Sujet</label>
                    <input className="border rounded-lg w-2/3 mx-auto" type="text" name="sujet" id="sujet" />
                </li>
                <li>
                    <label htmlFor="message">Message</label>
                    <textarea className="border rounded-lg w-2/3 mx-auto" id="msg" name="message"></textarea>
                </li>
                <li className="items-end">
                    <button className="border rounded-lg w-1/5 p-2 font-bold text-xl">Envoyer</button>
                </li>
            </ul>
        </form>
    )
};

export default Contact;