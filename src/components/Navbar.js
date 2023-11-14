import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
             <a className="btn btn-ghost normal-case text-xl"><Link to={`/`}>restCountries</Link></a>
            </div>
        <div className="flex-none gap-2">

    </div>
    </div>
    );
};

export default Navbar;