import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';
import CountUp from 'react-countup';

export default function ClickPage({user}) {
    const [animate, setAnimate] = useState(false);
    const [totalClicks, setTotalClicks] = useState(0);
    const [currentClicks, setCurrentClicks] = useState(0);
    const [totalCoins, setTotalCoins] = useState(0);
    const username = user;
    const [clickPerPoint, setClickPerPoint] = useState(1);
    const [animateCoins, setAnimateCoins] = useState(false);
    const [animateClicks, setAnimateClicks] = useState(false);
    const [userId,setUserId] = useState('');
    const imageRef = useRef(null);

    // Function to fetch or create user data from Supabase
    const fetchUserData = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .single();

            if (error && error.code === 'PGRST116') { // Not Found
                // If user doesn't exist, create one
                const { data: newUser, error: insertError } = await supabase
                    .from('users')
                    .insert({
                        username: username,
                        total_clicks: 1000,
                        current_clicks: 1000,
                        total_coins: 0,
                        click_per_point: 1,
                    })
                    .select()
                    .single();

                if (insertError) {
                    throw insertError;
                }
                setUserId(newUser.id);
                setTotalClicks(newUser.total_clicks);
                setCurrentClicks(newUser.current_clicks);
                setTotalCoins(newUser.total_coins);
                setClickPerPoint(newUser.click_per_point);
            } else if (data) {
                // If user exists, set the state with the fetched data
                setUserId(data.id);
                setTotalClicks(data.total_clicks || 1000);
                setCurrentClicks(data.current_clicks || 1000);
                setTotalCoins(data.total_coins || 0);
                setClickPerPoint(data.click_per_point || 1);
            }
        } catch (error) {
            console.error('Error fetching or creating user data:', error.message);
        }
    };

    useEffect(() => {
        fetchUserData();

        const intervalId = setInterval(() => {
            setCurrentClicks((prevClicks) => {
                if (prevClicks + 2 <= totalClicks) {
                    return Math.max(prevClicks + 2, 0);
                }
                return prevClicks;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [totalClicks]);

    const handleImageClick = async (event) => {
        if (currentClicks > 0) {
            setAnimate(true);
            setAnimateCoins(true);
            setAnimateClicks(true);
            setCurrentClicks(currentClicks - clickPerPoint);
            setTotalCoins(totalCoins + clickPerPoint);

            // Create and animate the floating element
            const clickX = event.clientX;
            const clickY = event.clientY;

            const floatElement = document.createElement('div');
            floatElement.textContent = `+${clickPerPoint}`;
            floatElement.style.position = 'absolute';
            floatElement.style.left = `${clickX}px`;
            floatElement.style.top = `${clickY}px`;
            floatElement.style.fontSize = '28px';
            floatElement.style.color = 'white';
            floatElement.style.pointerEvents = 'none';
            floatElement.className = 'float-animation';
            document.body.appendChild(floatElement);

            setTimeout(() => {
                floatElement.remove();
            }, 1000);

            // Update the backend with new values
            await updateUserData(userId, totalClicks, totalCoins + clickPerPoint, username, clickPerPoint);

            setTimeout(() => {
                setAnimate(false);
                setAnimateCoins(false);
                setAnimateClicks(false);
            }, 1000);
        }
    };

    // Function to update user data in Supabase
    const updateUserData = async (userId, totalClicks, totalCoins, username, clickPerPoint) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .upsert({
                    id: userId,
                    total_clicks: totalClicks,
                    total_coins: totalCoins,
                    username: username.trim() === '' ? null : username,
                    click_per_point: clickPerPoint,
                });

            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Error updating user data:', error.message);
        }
    };

    return (
        <div
            className="container border-lg bg-dark rounded"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
        >
            <div className="row text-center pt-2">
                <div className="col-12 my-3">
                    <h3 className="text-warning">TapMe</h3>
                </div>

                <div className="col-12 my-2" style={{ cursor: 'pointer' }}>
                    <div className="card bg-dark">
                        <div className="card-body">
                            <h5 className="card-title text-white">
                                <img src="assets/coin.png" style={{ width: '30px', height: '30px' }} alt="" /> &nbsp;
                                <CountUp
                                    start={totalCoins - clickPerPoint}
                                    end={totalCoins}
                                    duration={1}
                                    className={animateCoins ? 'animate-value' : ''}
                                />
                            </h5>
                        </div>
                    </div>
                </div>

                <div className="col-12 mt-3" style={{ position: 'relative', cursor: "pointer" }}>
                    <img
                        ref={imageRef}
                        src="assets/coin.png"
                        alt="Tap Coin"
                        className={`img-fluid ${animate ? 'animate-image' : ''}`}
                        style={{ maxWidth: '280px', width: '100%' }}
                        onClick={handleImageClick}
                    />
                </div>
                <div className="col-12 my-2" style={{ cursor: 'pointer' }}>
                    <div className="card bg-dark">
                        <div className="card-body">
                            <h5 className="card-title text-white">
                                <CountUp
                                    start={currentClicks}
                                    end={currentClicks}
                                    duration={1}
                                    className={animateClicks ? 'animate-value' : ''}
                                />
                                /{totalClicks}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
