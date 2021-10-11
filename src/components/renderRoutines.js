import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import { BASE_URL } from './api'

export default function RenderRoutines(routine) {

    const { name, goal, creatorName} = routine
    const { activityName, description, duration } = activity
    const [currentlyEditing, setCurrentlyEditing] = useState(false)

    async function handleDelete(routineId) {
        try {
            const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('currentUserToken')}`
                }
            })

        const result = await response.json()

        window.location.reload()
        } catch(error) {
            console.error(error)
        }
    }
}

return (<Card className="routineCard">
    <Card.Body className="square border border-4 border-dark">

        <Card.Title>{name}</Card.Title>
        <Card.Text>{goal}</Card.Text>
        <Card.Text>{creatorName}</Card.Text>

        <Card.Footer>
            <p></p>
        </Card.Footer>
    </Card.Body>
</Card>)