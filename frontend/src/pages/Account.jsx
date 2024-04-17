import React from 'react';
import { useAuth } from '../services/AuthContext'; 
import Login from '../components/Login';
import ChangePassword from '../components/ChangePassword';
import SignUp from '../components/SignUp';
import StripeButton from '../components/Buttons/StripeButton';

export default function Account() {
    const { user } = useAuth();

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                {user && user.email ? (
                    <>
                        <h2>Hello, {user.email}</h2>
                        <p>Current Subscription Tier: {user.subscriptionTier}</p>
                        <ChangePassword />
                        <StripeButton />
                    </>
                ) : (
                    <>
                        <h2>Log in or sign up!</h2>
                        <Login />
                        <SignUp />
                    </>
                )}
            </div>
        </div>
    );
}
