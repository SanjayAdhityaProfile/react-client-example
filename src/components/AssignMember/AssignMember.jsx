import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import constant from '../constants.json'
import './cb.css'

const AssignMember = ({ team_id, fetchData, toggleModal }) => {

    const jwtToken = Cookies.get('auth_token');
    const [memberData, setMemberData] = useState([]);
    const [boardData, setBoardData] = useState([]);

    const [selectedMember, setSelectedMember] = useState('');
    const [selectedBoard, setSelectedBoard] = useState('');


    const handleChangeMember = (event) => {
        setSelectedMember(event.target.value);
    };
    const handleChangeBoard = (event) => {
        setSelectedBoard(event.target.value);
    };

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': jwtToken
            },
        };
        const fetchBoardData = async () => {
            try {
                const response = await fetch(constant['api_base_url'] + '/board_for_a_team/' + team_id, requestOptions); // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBoardData(data['data'])

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchMemberData = async () => {
            try {
                const response = await fetch(constant['api_base_url'] + '/user_for_a_team/' + team_id, requestOptions); // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMemberData(data['data'])

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchMemberData()
        fetchBoardData()
    };

    const follow = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': jwtToken
            },
        };
        const followedBoard = async () => {
            try {
                const response = await fetch(constant['api_base_url']+"/user/follow/"+String(selectedMember)+"/board/"+String(selectedBoard), requestOptions); // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        followedBoard()
    }
    
    const un_follow = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': jwtToken
            },
        };
        const followedBoard = async () => {
            try {
                const response = await fetch(constant['api_base_url']+"/user/un_follow/"+String(selectedMember)+"/board/"+String(selectedBoard), requestOptions); // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        followedBoard()
    }


    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Assign Member to boards</h2>
                <form>
                    <br />
                    <div style={{ display: "flex", padding: "20px" }}>
                        <div style={{ margin: "10px" }}>
                            <label htmlFor="dropdown" style={{ fontSize: '18px', marginRight: '10px' }}>
                                Select an Member:</label>
                            <select id="dropdown" value={selectedMember} onChange={handleChangeMember}
                                style={{ fontSize: '20px', padding: '5px', minWidth: '200px' }}
                            >
                                <option value="">Select an option...</option>
                                {memberData && (
                                    memberData.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div style={{ margin: "10px" }}>
                            <label htmlFor="dropdown" style={{ fontSize: '18px', marginRight: '10px' }}>
                                Select an Board:</label>
                            <select id="dropdown" value={selectedBoard} onChange={handleChangeBoard}
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
                        <button type="button" onClick={follow}>Assign</button>
                        {/* <button type="button" onClick={un_follow}>UnAssign</button> */}
                    </div>
                    {selectedMember && <p>You selected Member {selectedMember} and {selectedBoard}.</p>}
                    <br />
                </form>
                <button className="close-button" onClick={toggleModal}>Close</button>
            </div>

        </div>
    );
};

export default AssignMember;
