// pages/index.tsx or pages/HomePage.tsx

import React from 'react';
import NavBar from '../components/NavBar';
import { ClerkProvider } from '@clerk/nextjs';

const HomePage = () => {
    return (
        <ClerkProvider>
            <div>
                <NavBar />
                <div>
                    <h1>Welcome to My Movie App</h1>
                </div>
            </div>
        </ClerkProvider>
    );
};

export default HomePage;
