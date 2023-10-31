import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './DashBoard.css';
import constant from '../constants.json'
import Cookies from 'js-cookie';
import BoardForm from '../CreateBoard/CreateBoard';
import MemberForm from '../CreateMember/CreateMember';
import AssignMember from '../AssignMember/AssignMember';
import TicketForm from '../CreateTicket/CreateTicket';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
    const current_team_id = Cookies.get('auth_token');
    const nav = useNavigate()

    var id_ = null
    if (current_team_id !== 'undefined') {
        console.log(typeof current_team_id)
        id_ = parseJwt(current_team_id)['id_id'];
    }
    function parseJwt(token) {
        if (token) {
            var base64Url = token.split('.')[1];
            if (base64Url !== undefined) {
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload);
            }

        }
    }

    const [Boards_data, setBoards_data] = useState([])
    const [showModalBoard, setShowModalBoard] = useState(false);
    const [showModalMember, setShowModalMember] = useState(false);
    const [showModalMemberAssign, setShowModalMemberAssign] = useState(false);
    const [showModalTicket, setShowTicket] = useState(false);

    const toggleModalBoard = () => {
        setShowModalBoard((prev) => !prev);
    };

    const toggleModalMember = () => {
        setShowModalMember((prev) => !prev);
    };

    const toggleModalMemberAssign = () => {
        setShowModalMemberAssign((prev) => !prev);
    };

    const toggleModalTicket = () => {
        setShowTicket((prev) => !prev);
    };

    const jwtToken = Cookies.get('auth_token');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth_token': jwtToken
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(constant['api_base_url'] + '/board_for_a_team/' + id_, requestOptions); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBoards_data(data['data'])
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    const logout = async () => {
        const requestOptions = {
            method: 'POSt',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': jwtToken
            }
        };
        try {
            const response = await fetch(constant['api_base_url'] + '/team/logout', requestOptions); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else{
                const data = response.json()
                Cookies.set('auth_token',data["auth_token"])
                console.log('nav')
                nav('/login')
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className='containerDashBoard'>
            <div>
                <div className='title'>
                    <div>
                        <h2>Pro Man</h2>
                        <p>process management system</p>
                    </div>
                    <div>
                        <button onClick={logout}>logout</button>
                    </div>
                </div>

            </div>
            <br /><br />

            <div className='dataBoard'>
                {
                    Boards_data && (Boards_data.map(
                        (item, index) => (
                            <Link className='Board_Link' key={index} to={`/board/${item.id}`}>
                                Board {item.id} {item.name}
                            </Link>
                        )
                    ))
                }
            </div>


            <div>
                <button onClick={toggleModalBoard}>Create New Board</button>
                {showModalBoard && <BoardForm fetchData={fetchData} toggleModal={toggleModalBoard} />}
            </div>
            <div>
                <button onClick={toggleModalMember}>Create New Member</button>
                {showModalMember && <MemberForm fetchData={fetchData} toggleModal={toggleModalMember} />}
            </div>
            <div>
                <button onClick={toggleModalMemberAssign}>Assign Member</button>
                {showModalMemberAssign && <AssignMember team_id={id_} fetchData={fetchData} toggleModal={toggleModalMemberAssign} />}
            </div>
            <div>
                <button onClick={toggleModalTicket}>Create New Ticket</button>
                {showModalTicket && <TicketForm team_id={id_} fetchData={fetchData} toggleModal={toggleModalTicket} />}
            </div>
        </div>
    )
}

export default DashBoard