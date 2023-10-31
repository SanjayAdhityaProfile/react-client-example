import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import constant from '../constants.json'
import './cb.css'

const BoardForm = ({ fetchData, toggleModal }) => {
    const [boardData, setBoardData] = useState({
        id: '',
        name: '',
        description: '',
        team_id: '',
    });
    const jwtToken = Cookies.get('auth_token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardData({
            ...boardData,
            [name]: value,
        });
    };

    useEffect(() => {
        // Get the team_id from the cookie and set it as the default value
        const team_idFromCookie = parseJwt(jwtToken)['id_id']; // Replace 'team_id' with the actual cookie key
        if (team_idFromCookie) {
            setBoardData((prevData) => ({
                ...prevData,
                team_id: team_idFromCookie,
            }));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the postData function here passing the required data
            await postData(boardData);
            console.log('Board Data posted successfully:', boardData);
            // Close the modal after successful form submission
            toggleModal();
        } catch (error) {
            console.error('Error posting board data:', error);
        }
    };

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    const postData = async (data) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': jwtToken, // Replace jwtToken with your actual authentication token
            },
            body: JSON.stringify(data),
        };
        console.log(requestOptions)
        try {
            const response = await fetch(constant['api_base_url'] + '/board', requestOptions); // Replace with your API URL for creating boards
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchData()
            alert('Done!');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">            <h2>Create a New Board</h2>
                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'none' }}>
                        ID:
                        <input type="text" name="id" value={''} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Name:
                        <input type="text" name="name" value={boardData.name} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={boardData.description}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Team ID:
                        <input type="text" name="team_id"
                            readOnly // Add the readOnly attribute here
                            value={parseJwt(jwtToken)['id_id']} onChange={handleChange} />
                    </label>
                    <br />
                    <button type="submit">Create Board</button>
                </form>
                <button className="close-button" onClick={toggleModal}>Close</button>
            </div>
        </div>
    );
};

export default BoardForm;
