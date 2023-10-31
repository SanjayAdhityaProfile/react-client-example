import React, { useState } from 'react';
import './LoginPage.css'
import constant from '../constants.json'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate()
    const fetchData = async () => {
        const apiUrl = constant['api_base_url'] + '/team/signin';
        // POST request configuration
        const requestOptions = {
            method: 'POSt',
            headers: {
                'Content-Type': 'application/json',
                // Add any other necessary headers here
            },
            body: JSON.stringify(
                {
                    "name": name,
                    "password": password
                }
            ),
        };
        console.log(requestOptions)
        // Make the POST request to the API
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data if needed
                Cookies.set('auth_token',data['auth_token'])
                nav('/')
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error posting data:', error);
            });
    };

    return (
        <div className="container">
            <form className="form">
                <h2>Login</h2>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Username" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="button" onClick={fetchData}>Login</button>
                <a href='/signup'>Sign up</a>
            </form>
        </div>)
}

export default LoginPage