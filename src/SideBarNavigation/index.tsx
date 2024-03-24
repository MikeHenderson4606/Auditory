
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

function SideBarNavigation() {
    const { pathname } = useLocation();
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
                    var classNameStr = "list-group-item list-group-item-action list-group-item-success text-center";
                    if (pathname === "/" && nav.location === "/") {
                        classNameStr = classNameStr + " active";
                    } else if ((pathname.includes(nav.location) && nav.location !== "/")) {
                        classNameStr = classNameStr + " active";
                    }
                    return (
                    <Link to={nav.location} className={classNameStr} key={index}>
                        {nav.name}
                    </Link>)
                })}
            </div>
        </div>
    );
}

export default SideBarNavigation;