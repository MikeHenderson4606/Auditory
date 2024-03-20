
import { Link } from 'react-router-dom';

import Song from '../Feed/Song';

function Navigation() {
    const options = [
        {
            text: 'Login',
            destination: '#'
        },
        {
            text: 'Profile',
            destination: '#'
        },
        {
            text: 'Search',
            destination: '#'
        }
    ]

    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-success-subtle">
            <div className="container-fluid">
            <Link className="navbar-brand fs-3" to="#">Auditory</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {options.map((option, index) => {
                            return (
                            <li className="nav-item" key={index}>
                                <Link to={option.destination} className="nav-link fs-4">{option.text}</Link>
                            </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;