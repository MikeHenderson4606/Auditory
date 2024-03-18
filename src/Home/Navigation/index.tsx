
import { Link } from 'react-router-dom';

import Song from '../Feed/Song';

function Navigation() {
    const options = [
        {
            text: 'Login',
            destination: '/#'
        },
        {
            text: 'Profile',
            destination: '/#'
        },
        {
            text: 'Search',
            destination: '/#'
        }
    ]

    return (
        <div className='border-component list-group'>
            <h1>Navigation</h1>
            {options.map((option) => {
                return (
                    <Link to={option.destination} className="list-group-item list-group-item-action list-group-item-secondary my-1 text-center border border-none rounded">{option.text}</Link>
                );
            })}
        </div>
    );
}

export default Navigation;