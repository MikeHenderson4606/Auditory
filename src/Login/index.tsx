
import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as client from "../Client";
import { Modal } from "react-bootstrap";
import { setLoggedIn } from "./loginReducer";
import { setUserData } from "./userDataReducer";
import { useDispatch, useSelector } from "react-redux";
import { AuditoryState } from "../store";
import { Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state:AuditoryState) => state.loginReducer);
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleModalShow = () => {
        setShowModal(!showModal);
    }

    return (
        <div style={{marginTop: "100px"}}>
            <h1 className='text-center'>Login to Auditory!</h1>
            <div className="d-flex justify-content-center">
                <div className="bg-light border p-2 rounded" >
                    <input className="form-control" placeholder="username" onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                    <input className="form-control mt-2" placeholder="password" type="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <button className="btn btn-success mt-2" onClick={async () => {
                        const response = await client.loginUser({username: username, password:password});
                        if (response !== 400) {
                            dispatch(setUserData({
                                username: response.profile.username,
                                userId: response.profile.userId
                            }));
                            dispatch(setLoggedIn(true));
                            navigate('/profile');
                        } else {
                            handleModalShow();
                        }
                    }}>Login</button>
                    <p className="mt-4">
                        Don't have an account? <br /> 
                        Register here: 
                        <Link to="/register">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
            <Modal show={showModal} onHide={handleModalShow}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    There was an error logging you in
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger' onClick={() => {
                        handleModalShow();
                    }}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Login;