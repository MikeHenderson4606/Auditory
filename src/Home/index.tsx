import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './index.css';

import Navigation from './Navigation';
import Feed from './Feed/Feed';

function Home() {
    return (
    <div>
        <div className="row border-component">
            <div className="col-2 d-none d-md-block">
                <Navigation />
            </div>
            <div className="col">
                <Routes>
                    <Route path="/" element={<Feed />} />
                </Routes>
            </div>
        </div>
    </div>
    );
}

export default Home;