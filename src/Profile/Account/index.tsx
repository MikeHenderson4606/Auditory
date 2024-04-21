
import { useSelector } from "react-redux";
import { AuditoryState } from "../../store";
import { useEffect, useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import Posts from "./Posts";
import Likes from "./Likes";
import Details from "./Details";
import './index.css';
import Following from "./Following";

function Account() {
    const { pathname } = useLocation();
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);

    const links = [
        {
            destination: 'posts',
            text: 'Posts'
        },
        {
            destination: 'likes',
            text: 'Likes'
        },
        {
            destination: 'following',
            text: 'Following'
        },
        {
            destination: 'details',
            text: 'Details'
        }
    ]
    

    return (
        <div>
            <ul className="nav nav-underline">
                {links.map((link, index) => {
                    let classNameVar = "nav-link fs-5"
                    if (pathname.includes(link.destination)) {
                        classNameVar = classNameVar + " active";
                    }
                    return (
                    <li className="nav-item me-5" key={index}>
                        <Link className={classNameVar} style={{color: "#198754"}} aria-current="page" to={link.destination}>{link.text}</Link>
                    </li>
                    );
                })}
            </ul>
            <hr className="position-relative" style={{top: "-16px"}} />
            <Routes>
                <Route path="posts" element={<Posts />}></Route>
                <Route path="likes" element={<Likes />}></Route>
                <Route path="details" element={<Details />}></Route>
                <Route path="following" element={<Following />}></Route>
            </Routes>
        </div>
    );
}

export default Account;