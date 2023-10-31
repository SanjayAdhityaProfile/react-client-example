import React, { useEffect, useState } from 'react'
import './Board.css'
import { useParams } from 'react-router-dom';
import TicketPopup from '../ticketPopup/ticketPopup';
import MemberPopup from '../MemberPopup/MemberPopup';
import constant from '../constants.json'
import Cookies from 'js-cookie';

const Board = () => {

    const [all_ticket, set_all_ticket] = useState([]);
    const [all_members, set_all_members] = useState([]);
    const [all_board_data, set_all_board_data] = useState([]);
    const [showPopupTicket, setShowPopupTicket] = useState(false);
    const [selectedIdTicket, setSelectedIdTicket] = useState(null);
    const [showPopupMember, setShowPopupMember] = useState(false);
    const [selectedIdMember, setSelectedIdMember] = useState(null);

    const handleButtonClickTicket = (id) => {
        setShowPopupTicket(true);
        setSelectedIdTicket(id);

    };

    const closePopupTicket = () => {
        setShowPopupTicket(false);
        setSelectedIdTicket(null);
        fetchData()
        fetchData()
    };

    const handleButtonClickMember = (id) => {
        setShowPopupMember(true);
        setSelectedIdMember(id);

    };

    const closePopupMember = () => {
        setShowPopupMember(false);
        setSelectedIdMember(null);
        fetchData()
        fetchData()
    };

    const { boardId } = useParams();
    console.log(boardId)
    const loadData = (data) => {
        console.log(data)
        if (data !== null) {
            console.log('inside')
            set_all_ticket(data['data']['ticket_data']);
            set_all_members(data['data']['member_data']);
            set_all_board_data(data['data']['board_data']);
            console.log(all_ticket)
        }
    };
    const fetchData = async () => {
        const jwtToken = Cookies.get('auth_token');

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': jwtToken
                // Add any other necessary headers here
            }
        };
        try {
            console.log(boardId)
            const response = await fetch(constant['api_base_url'] + '/board/' + boardId, requestOptions); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            loadData(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData()
        // Call the load function after 1 second (you can adjust the time as needed)
        const loadingTimer = setTimeout(fetchData, 10);

        // Clean up the timer to avoid potential memory leaks
        return () => clearTimeout(loadingTimer);
    }, []);


    return (
        <>
            <div className="details_bar">
                <a className="mainTitle" href="/">
                    <h3>
                        Pro-Man
                    </h3>
                </a>

                <h3 >
                    {
                        all_board_data[0] && (
                            String(all_board_data[0].name).toLowerCase()
                        )
                    }
                </h3>
                <div className='all_mem_name'>
                    {
                        all_members && (
                            all_members.map((item, index) => (
                                <button className='all_mem_name_p' onClick={() => handleButtonClickMember(item.id)} key={index}>{item.name}</button>
                            ))
                        )
                    }
                </div>
            </div>

            <div className='container'>
                {/* <button onClick={fetchData}>refresh</button> */}
                <div className="item item-1">
                    TODO
                    {
                        all_ticket && (
                            all_ticket.map((item, index) => (
                                String(item.status) === '1' && (
                                    <li className='tkt-item' key={index}>
                                        {item.body}
                                        <button className='bun-view' onClick={() => handleButtonClickTicket(item.id)}>
                                            view
                                        </button>
                                        <div className="member-grp">
                                            {item.member_ && item.member_.map(
                                                (item, index) => (
                                                    <p className='bun-member-icon' key={index}>{String(item.name)[0]}</p>
                                                )
                                            )}
                                        </div>
                                    </li>
                                )
                            ))
                        )
                    }
                </div>
                <div className="item item-2">
                    Inprogress
                    {all_ticket && (all_ticket.map((item, index) => (
                        String(item.status) === '2' && (
                            <li className='tkt-item' key={index}>
                                {item.body}
                                <button className='bun-view' onClick={() => handleButtonClickTicket(item.id)}>
                                    view
                                </button>
                                <div className="member-grp">
                                    {item.member_ && item.member_.map(
                                        (item, index) => (
                                            <p className='bun-member-icon' key={index}>{String(item.name)[0]}</p>
                                        )
                                    )}
                                </div>
                            </li>
                        )
                    )))}</div>
                <div className="item item-3">
                    Review
                    {all_ticket && (all_ticket.map((item, index) => (
                        String(item.status) === '3' && (
                            <li className='tkt-item' key={index}>
                                {item.body}
                                <button className='bun-view' onClick={() => handleButtonClickTicket(item.id)}>
                                    view
                                </button>
                                <div className="member-grp">
                                    {item.member_ && item.member_.map(
                                        (item, index) => (
                                            <p className='bun-member-icon' key={index}>{String(item.name)[0]}</p>
                                        )
                                    )}
                                </div>
                            </li>
                        )
                    )))}</div>
                <div className="item item-4">
                    Completed
                    {all_ticket && (all_ticket.map((item, index) => (
                        String(item.status) === '4' && (
                            <li className='tkt-item' key={index}>
                                {item.body}
                                <button className='bun-view' onClick={() => handleButtonClickTicket(item.id)}>
                                    view
                                </button>
                                <div className="member-grp">
                                    {item.member_ && item.member_.map(
                                        (item, index) => (
                                            <p className='bun-member-icon' key={index}>{String(item.name)[0]}</p>
                                        )
                                    )}
                                </div>
                            </li>
                        )
                    )))}</div>

            </div>
            {/* Conditionally render the popup */}
            {showPopupTicket && (
                <TicketPopup show={showPopupTicket} onClose={closePopupTicket} id={selectedIdTicket} />
            )}
            {showPopupMember && (
                <MemberPopup all_board_ticket={all_ticket} show={showPopupMember} onClose={closePopupMember} id={selectedIdMember} />
            )}
        </>
    )
}

export default Board;