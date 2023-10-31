import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import constant from '../constants.json'
import Search from '../Search/Search'
import './MemberPopup.css'
import Cookies from 'js-cookie';

const MemberPopup = ({ show, onClose, id, all_board_ticket }) => {
    const [formData, setFormData] = useState({});
    const [name, setName] = useState('');
    const [points, setPoints] = useState('');
    const [role, setRole] = useState('');
    const [_id, setId] = useState('');
    // const [members, setMembers] = useState('');
    const jwtToken = Cookies.get('auth_token');
    const handleSubmit = (e) => {
        console.log("after submit")
        console.log(formData)

        e.preventDefault();
        // Handle form submission logic here, if required
        // Close the popup after submitting the form
        // Your API endpoint URL
        const apiUrl = constant['api_base_url'] + '/user/' + id;


        // POST request configuration
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': jwtToken
            },
            body: JSON.stringify(
                {
                    "name": name,
                    "points": points,
                    "role": role
                }
            ),
        };
        // Make the POST request to the API
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data if needed
                console.log('Response from the API:', data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error posting data:', error);
            });
        onClose();
    };

    const fetchData = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': jwtToken
                }
            };
            const response = await fetch(constant['api_base_url']+'/user/'+ id, requestOptions); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFormData(data['data'][0])
            setName(data['data'][0]['name'])
            setPoints(data['data'][0]['points'])
            setRole(data['data'][0]['role'])
            setId(data['data'][0]['id'])
            console.log(formData)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log(all_board_ticket)
        fetchData()
        // Call the load function after 1 second (you can adjust the time as needed)
        const loadingTimer = setTimeout(fetchData, 1);

        // Clean up the timer to avoid potential memory leaks
        return () => clearTimeout(loadingTimer);
    }, []);

    return (
        <div style={{ overflow: "auto" }}>
            <Modal className='MemberContainer' show={show} onHide={onClose}>
                <Modal.Header className='Member' closeButton>
                    <Modal.Title className='Member'>Edit Member</Modal.Title>
                    <Button className='Member' variant="secondary" onClick={fetchData}>
                        refresh
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form className='Member' onSubmit={handleSubmit}>
                        <Form.Group controlId="formBody">
                            <Form.Label>Ticket Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="Ticket Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Form className='Member' onSubmit={handleSubmit}>
                        <Form.Group controlId="formBody">
                            <Form.Label>Ticket id:</Form.Label>
                            <Form.Control
                                type="text"
                                name="Ticket Name"
                                value={_id}
                                disabled={true}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Form onSubmit={handleSubmit} className='Member'>
                        <Form.Group controlId="formPoint">
                            <Form.Label>Points:</Form.Label>
                            <Form.Control
                                type="text"
                                name="Points"
                                value={points}
                                onChange={(e) => setPoints(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Form onSubmit={handleSubmit} className='Member'>
                        <Form.Group controlId="formBody">
                            <Form.Label>Role:</Form.Label>
                            <Form.Control
                                type="text"
                                name="Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <div className='Member search-box'>
                        <Search user_assign_id={_id} details={all_board_ticket} />
                    </div>
                </Modal.Body>
                <Modal.Footer className='Member'>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MemberPopup;
