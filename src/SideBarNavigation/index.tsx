
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { AuditoryState } from "../store";

function SideBarNavigation() {
    const { pathname } = useLocation();
    const { isLoggedIn } = useSelector((state: AuditoryState) => state.loginReducer);
    const [isCollapsed, setIsCollapsed] = useState(true);
    let setPostActive = "";
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
    const profileLinks = [
        {
            text: "Account",
            destination: "profile/account/posts"
        },
        {
            text: "Playlists",
            destination: "profile/playlists"
        },
        {
            text: "Settings",
            destination: "profile/settings"
        }
    ]

    if (pathname.split('/')[1].includes("post")) {
        setPostActive = "active";
    }

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }
    
    return (
        <div className="navbar feed-offset ms-2 position-fixed navbar-expand-md">
            <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                <span className="fa fa-arrow-right"></span>
            </button>
            <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`}>
                <div className="list-group" style={{width: "9em"}}>
                    {navLocations.map((nav, index) => {
                        var classNameStr = "list-group-item list-group-item-action list-group-item-success text-center";
                        if (pathname === "/" && nav.location === "/") {
                            classNameStr = classNameStr + " active";
                        } else if ((pathname.split('/')[1].includes(nav.location) && nav.location !== "/")) {
                            classNameStr = classNameStr + " active";
                        }
                        return (
                        <Link to={nav.location} className={classNameStr} key={index}>
                            {nav.name}
                        </Link>)
                    })}
                    <Link to="post" className={"list-group-item list-group-item-action list-group-item-success text-center " + setPostActive}>
                        Post
                    </Link>
                </div>
                {pathname.split('/')[1].includes('profile') && isLoggedIn.auditory ? 
                <div className={`list-group ${isCollapsed ? "ms-2" : ""}`} style={{width: "12em"}}>
                    {profileLinks.map((link, index) => {
                        var classNameStr = "list-group-item list-group-item-action list-group-item-success";
                        if ((pathname.includes(link.destination.split('/')[1]) && link.destination !== "/")) {
                            classNameStr = classNameStr + " active";
                        }
                        return (
                            <Link to={link.destination} className={classNameStr} key={index}>{link.text}</Link>
                        );
                    })}
                </div> :
                <div> </div>}
            </div>
        </div>
        
    );
}

export default SideBarNavigation;