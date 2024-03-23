
import { Link } from 'react-router-dom';
import React, {useState} from 'react';

function Navigation() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const options = [
        {
            text: 'Login',
            destination: '#'
        },
        {
            text: 'Profile',
            destination: '/profile'
        }
    ]

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <nav className="navbar navbar-expand-md bg-success-subtle border-dark border-bottom">
            <div className="container-fluid">
                <Link className="navbar-brand fs-3 ms-5" to="/">Auditory</Link>
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
                    <div className="navbar-nav ms-auto">
                        {options.map((option, index) => {
                            return (
                                <Link to={option.destination} className="nav-link fs-4 me-5" key={index}>{option.text}</Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav> 
    );
}

export default Navigation;