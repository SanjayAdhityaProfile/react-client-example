import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import constant from '../constants.json'
import './MemberCretePopup.css'
import Cookies from 'js-cookie';

const MemberCreatePopup = ({ show, onClose }) => {
    const [name, setName] = useState('');
    const [points, setPoints] = useState('');
    const [role, setRole] = useState('');
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
                    "name": name,
                    "points": points,
                    "role":role,
                    "board_id":id
                }
            ),
        };
        try {
            const response = await fetch(constant['api_base_url'] + '/user/',requestOptions); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert("Done!")
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div style={{ overflow: "auto" }}>
            <Modal className='MemberContainer' show={show} onHide={onClose}>
                <Modal.Header className='Member' closeButton>
                    <Modal.Title className='Member'>Create Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='Member'>
                        <Form.Group controlId="formBody">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                onChange={(e) => setName(e.target.value)}
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
                            <Form.Label>Role:</Form.Label>
                            <Form.Control
                                type="text"
                                name="Role"
                                onChange={(e) => setRole(e.target.value)}
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

export default MemberCreatePopup;
