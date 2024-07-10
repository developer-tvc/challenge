import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser';
import Wallet from './Wallet'; // custom code

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser()

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                    {user?.email !== undefined ? (
                <Wallet user={user}/> // Render Wallet component if user email is defined
            ) : (
                <h4>Please login first.</h4>
            )}
                    </div>
                </div>
            </h2>
        </div>
    )
}
