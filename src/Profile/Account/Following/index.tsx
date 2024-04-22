import React, { useEffect, useState } from "react";
import * as client from '../../../Client';
import { Link } from "react-router-dom";


function Following() {
    const [follows, setFollows] = useState<any>([]);

    useEffect(() => {
        const getUserFollows = async () => {
            const profile = await client.getProfile();
            const follows = await Promise.all(profile.follows.map((userId:number) => {
                return client.getUser(userId);
            }));
            setFollows(follows);
        }
        getUserFollows();
    }, []);

    return (
        <div>
            <h2 className="text-center">Following</h2>
            <div className="list-group">
                {follows.length > 0 ? follows.map((follow:any, index:number) => {
                    return (
                    <Link to={`/user/${follow.user.userId}`} className="list-group-item list-group-item-action list-group-item-light text-decoration-none" key={index}>
                        {follow.user.username}
                    </Link>
                    );
                }) : 
                <div className="text-center">
                    You aren't following anyone    
                </div>}
            </div>
        </div>
    )
}

export default Following;