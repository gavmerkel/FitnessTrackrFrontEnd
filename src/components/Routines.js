import React, {useState, useEffect } from 'react'
import { BASE_URL } from './Api'
import RenderRoutines from './renderRoutines'

export default function Routines(props) {

    const {AuthenticatedHeader, UnauthenticatedHeader, loggedInUser, setLoggedinUser} = props
    const [routineList, setRoutineList] = useState([])

    function checkIfLoggedIn() {
        if(localStorage.getItem('currentUserToken')) {
            const currentToken = localStorage.getItem('currentUserToken')
            useEffect(() => {
                setLoggedinUser(currentToken)
            }, [])
        }
    }

    checkIfLoggedIn()

    async function fetchRoutines() {
        try {
            const result = await fetch(`${BASE_URL}/routines`)

            setRoutineList(response.data.routines)
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
