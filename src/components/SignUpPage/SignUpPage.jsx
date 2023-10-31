import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import constant from '../constants.json'
import Cookies from 'js-cookie';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const nav = useNavigate()

    const postData = async () => {
        const apiUrl = constant['api_base_url'] + '/team/signup';
        // POST request configuration
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other necessary headers here
            },
            body: JSON.stringify(
                {
                    "name": name,
                    "password": password,
                    "about": about,
                    "email": email
                }
            ),
        };
        console.log(requestOptions)
        // Make the POST request to the API
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data if needed
                console.log(data)
                if (data !== undefined){
                    Cookies.set('auth_token',data['auth_token'])
                    nav('/')
                }
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error posting data:', error);
            });
    };
    return (
        <div className="container">
            <form className="form" >
                <h2>Sign Up</h2>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Username" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="text" onChange={(e) => setAbout(e.target.value)} placeholder="About" />
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <button type="button" onClick={postData}>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpPage