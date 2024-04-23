import { useSelector } from "react-redux";
import GenericFeed from "./GenericFeed";
import PersonalFeed from "./PersonalFeed";
import { AuditoryState } from "../store";
import { useEffect, useState } from "react";


function Feed() {
    const [currentFeed, setCurrentFeed] = useState<any>();
    const { isLoggedIn } = useSelector((state:AuditoryState) => state.loginReducer);

    useEffect(() => {
        if (isLoggedIn.auditory) {
            setCurrentFeed(<PersonalFeed />);
        } else {
            setCurrentFeed(<GenericFeed />);
        }
    }, [isLoggedIn]);

    return currentFeed;
}

export default Feed;