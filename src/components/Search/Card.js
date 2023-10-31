import React from 'react';
import constant from '../constants.json'
import Cookies from 'js-cookie';

function Card({ person, user_assign_id }) {
	const follow_url = constant['api_base_url'] + '/user/follow/' + user_assign_id + '/ticket/'
	const un_follow_url = constant['api_base_url'] + '/user/un_follow/' + user_assign_id + '/ticket/'
    const jwtToken = Cookies.get('auth_token');

	const fetchData = async (url) => {

		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
                'auth_token': jwtToken
			}			
		};

		fetch(url, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log('Response from the API:', data);
			})
			.catch((error) => {
				console.error('Error posting data:', error);
			});
	};
	const assign_ticket = (id) => {
		console.log(follow_url + id)
		fetchData(follow_url + id)
	}
	const un_assign_ticket = (id) => {
		console.log(un_follow_url + id)
		fetchData(un_follow_url + id)
	}
	return (
		<div style={{ display: "flex" }}>
			<h4>{person.body}</h4>
			<button style={{
				height: "25px",
				margin: "10px",
				backgroundColor: "green",
				borderRadius: "10px"
			}} onClick={() => {
				assign_ticket(person.id)
			}}>+</button>
			<button style={{
				height: "25px",
				margin: "10px",
				backgroundColor: "red",
				borderRadius: "10px"
			}} onClick={() => {
				un_assign_ticket(person.id)
			}}>-</button>
		</div>
	);
}

export default Card;