import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import constant from '../constants.json'
import './TicketCretePopup.css'
import Cookies from 'js-cookie';

const TicketCretePopup = ({ show, onClose }) => {
    const [body, setBody] = useState('');
    const [points, setPoints] = useState('');
    const [status, setStatus] = useState('');
    const [id, setId] = useState();
    const jwtToken = Cookies.get('auth_token');

    const postData = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': jwtToken
            },
            body: JSON.stringify(
                {
                    "body": body,
                    "points": points,
                    "status":status,
                    "board_id":id
                }
            ),
        };
        try {
            const response = await fetch(constant['api_base_url'] + '/ticket',requestOptions); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert(`Done!`)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div style={{ overflow: "auto" }}>
            <Modal className='MemberContainer' show={show} onHide={onClose}>
                <Modal.Header className='Member' closeButton>
                    <Modal.Title className='Member'>Create Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='Member'>
                        <Form.Group controlId="formBody">
                            <Form.Label>Body:</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBody">
                            <Form.Label>Board id:</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                onChange={(e) => setId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPoint">
                            <Form.Label>Points:</Form.Label>
                            <Form.Control
                                type="text"
                                name="Points"
                                onChange={(e) => setPoints(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBody">
                            <Form.Label>Status:</Form.Label>
                            <Form.Control
                                type="text"
                                name="Role"
                                onChange={(e) => setStatus(e.target.value)}
                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer className='Member'>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={postData}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TicketCretePopup;
