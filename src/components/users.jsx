import React from "react"
import api from "../api"
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.css'

export default function Users() {
	const [users, setUsers] = useState(api.users.fetchAll())

	const handleDelete = userId => {
		setUsers(prevState => prevState.filter(user => user._id !== userId))
	}

	const renderPhrase = number => {
		return number % 10 > 1 && number % 10 < 5 && (Math.floor(number % 100) < 10 || Math.floor(number % 100) > 20) 
			? 'человека тусанут' 
			: 'человек тусанет'
	}
	
	return (
		<>
			{users.length !== 0 && (
				<>
					<span className="badge bg-primary m-1 p-2">
						{users.length} {renderPhrase(users.length)} с тобой сегодня
					</span>
					<table className="table">
						<thead>
							<tr>
								<th className="user-names" scope="col">Имя</th>
								<th className="user-qualities" scope="col">Качества</th>
								<th className="user-professions" scope="col">Профессия</th>
								<th className="user-meetings" scope="col">Встретился, раз</th>
								<th className="user-rates" colSpan="2" scope="col">Оценка</th>
							</tr>
						</thead>
						<tbody>
							{users.map(user => (
									<tr key={user._id}>
										<td>{user.name}</td>
										<td>{user.qualities.map(quality => (
												<span className={"badge bg-" + quality.color + " m-1"} key={quality._id}>{quality.name}</span>
											))
										}</td>
										<td>{user.profession.name}</td>
										<td>{user.completedMeetings}</td>
										<td>{user.rate}/5</td>
										<td>
											<button 
												className="btn btn-danger btn-sm" 
												onClick={() => handleDelete(user._id)}
											>delete</button>
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</>
			)}
			{users.length !== 0 || (
				<span className="badge bg-danger m-1 p-2">Никто с тобой не тусанет</span>
			)}
		</>
	)
}
