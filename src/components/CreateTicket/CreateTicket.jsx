import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import constant from '../constants.json'
import './cb.css'

const TicketForm = ({ fetchData, toggleModal }) => {
    const [boardData, setBoardData] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState('');

    const [boardId, setBoardId] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('');
    const [teamId, setTeamId] = useState('');
    const [points, setPoints] = useState('');

    const jwtToken = Cookies.get('auth_token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'board_id':
                setBoardId(value);
                break;
            case 'body':
                setBody(value);
                break;
            case 'status':
                setStatus(value);
                break;
            case 'team_id':
                setTeamId(value);
                break;
            case 'points':
                setPoints(value);
                break;
            default:
                break;
        }
    };
    const fetchBoardData = async (team_id) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': jwtToken
            },
        };
        try {
            const response = await fetch(constant['api_base_url'] + '/board_for_a_team/' + team_id, requestOptions); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBoardData(data['data'])
            console.log('data')
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        // Get the team_id from the cookie and set it as the default value
        const team_idFromCookie = parseJwt(jwtToken)['id_id']; // Replace 'team_id' with the actual cookie key
        
        fetchBoardData(team_idFromCookie)

        if (team_idFromCookie) {
            setTeamId(team_idFromCookie);
            setBoardId(selectedBoard);
        }

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postData({
                board_id: boardId,
                body: body,
                status: status,
                team_id: teamId,
                points: points
            });
            console.log('Member Data posted successfully:', { boardId, body, status, teamId, points });
            // Close the modal after successful form submission
            toggleModal();
        } catch (error) {
            console.error('Error posting Member data:', error);
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
            const response = await fetch(constant['api_base_url'] + '/ticket', requestOptions); // Replace with your API URL for creating Members
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchData()
            alert('Done!');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // const handleChangeBoard = (event) => {
    //     setSelectedBoard(event.target.value);
    // };
    return (
        <div className="modal">
            <div className="modal-content">            <h2>Create a New Ticket</h2>
                <form onSubmit={handleSubmit}>
                    <br />
                    <div style={{ margin: "10px" }}>
                            <label htmlFor="dropdown" style={{ fontSize: '18px', marginRight: '10px' }}>
                                Select an Board:</label>
                            <select id="dropdown" value={selectedBoard} name={'board_id'} onChange={handleChange}
                                style={{ fontSize: '20px', padding: '5px', minWidth: '200px' }}
                            >
                                <option value="">Select an option...</option>
                                {boardData && (boardData.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                )))}
                            </select>
                        </div>
                    <label>
                        Body:
                        <input type="text" name="body" value={body} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Status:
                        <input
                            type="text"
                            name="status"
                            value={status}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Points:
                        <input
                            type="text"
                            name="points"
                            value={points}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <button type="submit" onClick={handleSubmit}>Create Ticket</button>
                </form>
                <button className="close-button" onClick={toggleModal}>Close</button>
            </div>

        </div>
    );
};

export default TicketForm;
