
import { Routes, Route, useParams } from "react-router-dom";
import Message from "./Messenger";
import UserContacts from "../UserContacts";

import './index.css';

function Messenges() {
    return (
        <div className="feed-offset">
            <div className="row messenger-style">
                <div className="col-3 overflow-y-scroll pt-1 pb-1">
                    <UserContacts />
                </div>
                <div className="col-8">
                    <Routes>
                        <Route path='/:userId' element={<Message />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Messenges;