import { Link } from "react-router-dom";
import { useLocation } from "react-router";

function ProfileLinks() {
    const { pathname } = useLocation();
    const profileLinks = [
        {
            text: "Account",
            destination: "account",
            element: <div></div>
        },
        {
            text: "Playlists",
            destination: "playlists",
            element: <div></div>
        },
        {
            text: "Settings",
            destination: "settings",
            element: <div></div>
        },
    ]

    return (
        <div className="list-group col-3">
            {profileLinks.map((link, index) => {
                var classNameStr = "list-group-item list-group-item-action";
                if ((pathname.includes(link.destination) && link.destination !== "/")) {
                    classNameStr = classNameStr + " active";
                }
                return (
                    <Link to={link.destination} className={classNameStr} key={index}>{link.text}</Link>
                );
            })}
        </div>
    )
}

export default ProfileLinks;