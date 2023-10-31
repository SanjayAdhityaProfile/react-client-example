import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import constant from '../constants.json'
import './ticketPopup.css'
import Cookies from 'js-cookie';
const TicketPopup = ({ show, onClose, id }) => {
    const [formData, setFormData] = useState({});
    const [body, setBody] = useState('');
    const [points, setPoints] = useState('');
    const [status, setStatus] = useState('');
    // const [members, setMembers] = useState('');

    const handleSubmit = (e) => {
        console.log("after submit")
        console.log(formData)
        e.preventDefault();
        // Handle form submission logic here, if required
        // Close the popup after submitting the form
         // Your API endpoint URL
        const apiUrl = constant['api_base_url']+'/ticket/'+ id;
        const jwtToken = Cookies.get('auth_token');

        // POST request configuration
        const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth_token': jwtToken
        },
        body: JSON.stringify(
            {
                "body": body,
                "points": points,
                "status":  status
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
            const response = await fetch(constant['api_base_url']+'/ticket/' + id, requestOptions); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFormData(data['data'][0])
            setBody(data['data'][0]['body'])
            setPoints(data['data'][0]['points'])
            setStatus(data['data'][0]['status'])
            // setMembers(data['data'][0][''])
            console.log(formData)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData()
        // Call the load function after 1 second (you can adjust the time as needed)
        const loadingTimer = setTimeout(fetchData, 1);

        // Clean up the timer to avoid potential memory leaks
        return () => clearTimeout(loadingTimer);
    }, []);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Ticket</Modal.Title>
                <Button variant="secondary" onClick={fetchData}>
                    refresh
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBody">
                        <Form.Label>Ticket Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Ticket Name"
                            value={body}
                            onChange={(e) => setBody(e.target.value) }
                        />
                    </Form.Group>
                </Form>
                <Form onSubmit={handleSubmit}>
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
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBody">
                        <Form.Label>Status:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TicketPopup;
