import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './index.css';

import Navigation from './Navigation';
import Feed from './Feed';

function Home() {
    return (
    <div>
        <div className="">
            <div className="fixed-top">
                <Navigation />
            </div>
            <div className="">
                <Routes>
                    <Route path="/" element={<Feed />} />
                </Routes>
            </div>
        </div>
    </div>
    );
}

export default Home;