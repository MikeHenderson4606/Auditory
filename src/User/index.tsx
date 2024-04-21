import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import * as client from '../Client';


function User() {
    const { userId } = useParams();
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        const getUserDetails = async () => {
            if (userId) {
                const user = await client.getUser(parseInt(userId));

                if (user) {
                    console.log(user);
                    setUser(user.user);
                } else {
                    setUser({});
                }
            }
        }
        getUserDetails();
    }, []);

    return (
        <div className="feed-offset">
            <h1>
                User {user.username}

                <div>
                    {user.follows.map((follow:any) => {
                        
                    })}
                </div>
            </h1>
        </div>
    )
}

export default User;