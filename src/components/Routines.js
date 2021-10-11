import React, {useState, useEffect } from 'react'
import { BASE_URL } from '../api/Api'
import RenderRoutines from './renderRoutines'

export default function Routines(props) {

    const {AuthenticatedHeader, UnauthenticatedHeader} = props
    const [routineList, setRoutineList] = useState([])
    const loggedInUser = localStorage.getItem("CurrentUserToken")


    async function fetchRoutines() {
        try {
            const response = await fetch(`${BASE_URL}/routines`)

            const data = await response.json()

            setRoutineList(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchRoutines()
    }, [])


    return (
        <>
        {loggedInUser ? AuthenticatedHeader : null}
        {!loggedInUser ? UnauthenticatedHeader : null}

        {console.log(routineList)}

        {routineList.map((routine) => {
            return <RenderRoutines
                name={routine.name}
                goal={routine.goal}
                creatorName={routine.creatorName}
                />
        })}
        </>
    )
}
