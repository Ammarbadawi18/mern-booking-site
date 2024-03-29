import {Link}  from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const Header = () => {
    const {isLoggedIn} = useAppContext();
    return (
        <div className="bg-red-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to ="/">
                        Holidays Ticket
                    </Link>
                </span>
                <span className='rounded-lg flex space-x-2 bg-white'>
                    {isLoggedIn ? (
                    <>
                        <Link to='/my-bookings' className='rounded-lg flex items-center text-red text-1.5xl px-3 font-bold hover:bg-gray-300'>My Bookings</Link>
                        <Link to='/my-hotels' className='rounded-lg flex items-center text-red text-1.5xl px-3 font-bold hover:bg-gray-300'>My Hotels</Link>
                        <button>Sign out</button>
                        </> 
                    ):(
                    <Link to='/sign-in' className='rounded-lg flex items-center text-red text-1.5xl px-3 font-bold hover:bg-gray-300'>Sign in</Link>
                )}
                </span>
            </div>
        </div>
    );
};

export default Header;