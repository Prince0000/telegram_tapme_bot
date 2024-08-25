import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function Boost({user}) {
    const [userData, setUserData] = useState(null);
    const username = user;
    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('username', username)
                    .single();

                if (error) {
                    throw error;
                }

                if (data) {
                    setUserData(data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, []);

    // Handle Multitap Upgrade
    const handleMultitapUpgrade = async () => {
        if (!userData) return;

        const currentLevel = userData.per_click_lavel || 1;
        const cost = currentLevel * 500;

        if (userData.total_coins < cost) {
            alert("Insufficient coins for Multitap upgrade!");
            return;
        }

        const newClickPerPoint = userData.click_per_point + 1;
        const newClickPerLavel = currentLevel + 1;
        const newTotalCoins = userData.total_coins - cost;

        try {
            const { data, error } = await supabase
                .from('users')
                .update({
                    click_per_point: newClickPerPoint,
                    per_click_lavel: newClickPerLavel,
                    total_coins: newTotalCoins,
                })
                .eq('username', username)
                .single();

            if (error) {
                throw error;
            }

            setUserData({ 
                ...userData, 
                click_per_point: newClickPerPoint, 
                per_click_lavel: newClickPerLavel, 
                total_coins: newTotalCoins 
            });
        } catch (error) {
            console.error('Error upgrading multitap:', error.message);
        }
    };

    // Handle Energy Upgrade
    const handleEnergyUpgrade = async () => {
        if (!userData) return;

        const currentLevel = userData.coin_lavel || 1;
        const cost = (currentLevel * 5) * 500;

        if (userData.total_coins < cost) {
            alert("Insufficient coins for Energy upgrade!");
            return;
        }

        const newCoinLavel = currentLevel + 1;
        const newTotalClicks = userData.total_clicks + 2000;
        const newCurrentClicks = userData.current_clicks + 2000;
        const newTotalCoins = userData.total_coins - cost;

        try {
            const { data, error } = await supabase
                .from('users')
                .update({
                    coin_lavel: newCoinLavel,
                    total_clicks: newTotalClicks,
                    current_clicks: newCurrentClicks,
                    total_coins: newTotalCoins,
                })
                .eq('username', username)
                .single();

            if (error) {
                throw error;
            }

            setUserData({
                ...userData,
                coin_lavel: newCoinLavel,
                total_clicks: newTotalClicks,
                current_clicks: newCurrentClicks,
                total_coins: newTotalCoins,
            });
        } catch (error) {
            console.error('Error upgrading energy:', error.message);
        }
    };

    return (
        <div className='container text-white'>
            <div className="row text-center pt-2">
                <div className="col-12 my-3">
                    <h3 className="text-warning">TapMe - @{username}</h3>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12 my-3">
                    <div className="card bg-dark text-light border border-light">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="card-title">Multitap</h5>
                                <p className="card-text">Level: {userData?.per_click_lavel || 1}</p>
                            </div>
                            <div>
                                <button
                                    className='btn btn-outline-warning'
                                    onClick={handleMultitapUpgrade}
                                >
                                    {userData?.per_click_lavel ? `${userData.per_click_lavel * 500}` : "-500"} Upgrade
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card bg-dark text-light border border-light">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="card-title">Energy Limit X2</h5>
                                <p className="card-text">Level: {userData?.coin_lavel || 1}</p>
                            </div>
                            <div>
                                <button
                                    className='btn btn-outline-warning'
                                    onClick={handleEnergyUpgrade}
                                >
                                     {userData?.coin_lavel ? `${userData.coin_lavel * 5 * 500}` : "-2500"} Upgrade
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
