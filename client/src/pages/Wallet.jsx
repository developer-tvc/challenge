import React, { useEffect, useState } from 'react';
import '../styles/Wallet.css';
import Web3 from 'web3';


const testnet = process.env.REACT_APP_TESTNET_URI;

const Wallet = ({ user }) => {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
  

    useEffect(() => {
        const fetchBalance = async () => {
            if (!user || !user.wallet_address) {
                return; // Handle case where user or wallet address is not available
            }

            try {
                const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
                const balanceInWei = await web3.eth.getBalance(user.wallet_address);
                const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
                setBalance(balanceInEth);
            } catch (error) {
                console.error('Error fetching balance:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, [user]);

    return (
        <div className="wallet-container">
            <h2 className="wallet-heading">Wallet Details</h2>
            {loading ? (
                <p className="loading-text">Loading wallet balance...</p>
            ) : (
                <div className="wallet-details">
                    <p><strong>Wallet Address:</strong> {user.wallet_address}</p>
                    {balance ? (
                        <p><strong>Wallet Balance:</strong> {balance} ETH</p>
                    ) : (
                        <p><strong>Wallet Balance:</strong> Unable to fetch balance</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Wallet;
