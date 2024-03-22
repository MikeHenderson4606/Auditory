
import React, {useState} from "react";
import { Link } from "react-router-dom";

function SideBarNavigation() {
    const navLocations = [
        {
            name: 'Home',
            location: '/'
        },
        {
            name: 'Messages',
            location: 'messages'
        },
        {
            name: 'Search',
            location: 'search'
        }
    ]

    return (
        <div className="feed-offset border rounded ms-2">
            <div className="list-group">
                {navLocations.map((nav, index) => {
                    return (
                    <Link to={nav.location} className="list-group-item list-group-item-action text-center" key={index}>
                        {nav.name}
                    </Link>)
                })}
            </div>
        </div>
    );
}

export default SideBarNavigation;