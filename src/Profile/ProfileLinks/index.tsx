import { Link } from "react-router-dom";
import { useLocation } from "react-router";

function ProfileLinks() {
    const { pathname } = useLocation();

    const profileLinks = [
        {
            text: "Account",
            destination: "account/posts"
        },
        {
            text: "Playlists",
            destination: "playlists"
        },
        {
            text: "Settings",
            destination: "settings"
        },
    ]

    return (
        <div>
            <div className="list-group col-3 mt-2 position-fixed" style={{width: "12em"}}>
                {profileLinks.map((link, index) => {
                    var classNameStr = "list-group-item list-group-item-action list-group-item-success";
                    if ((pathname.includes(link.destination.split('/')[0]) && link.destination !== "/")) {
                        classNameStr = classNameStr + " active";
                    }
                    return (
                        <Link to={link.destination} className={classNameStr} key={index}>{link.text}</Link>
                    );
                })}
            </div>
        </div>
        
    )
}

export default ProfileLinks;