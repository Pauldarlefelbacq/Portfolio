import Icon from './assets/icon.svg';
import { Link } from 'react-router-dom';

const Lock = () =>{
    return(
        <main className='flex items-center justify-center min-h-screen bg-gradient-to-tr from-green-400 via-teal-500 to-blue-600'>
            <div className='flex flex-col justify-center items-center w-fit '>
                <img className='mb-10' src={Icon} alt="Icone marquée Paul.DF" />
                <div className='*:my-3 w-3/2'>
                    <h1 className='text-xl font-bold text-center p-2 bg-white rounded-lg'>Portfolio Paul Darle-Felbacq</h1>
                    <input className='bg-white rounded-lg w-full p-2 text-xl' type="password" />
                </div>
                <div className='flex w-fit h-auto m-auto justify-center hover:*:mx-2 hover:*:transition-discrete text-white text-md'>
                    <Link to='/destktop'>Se connecter</Link>
                    <span>→</span>
                </div>
            </div>
        </main>
    )
}

export default Lock;