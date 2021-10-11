import React, { useState, useEffect } from 'react'
import { getAllRoutines, createNewRoutine } from '../api/Api'

export default function MyRoutines() {

    const token = localStorage.getItem("CurrentUserToken")
    const [routineList, setRoutineList] = useState([])
    const reverseRoutineList = routineList.reverse()

    async function fetchRoutines() {

        try {

            const routines = await getAllRoutines()

            console.log("ROUTINES", routines)
            setRoutineList(routines)

        } catch (error) {
            throw error
        }
        
    }

    useEffect(() => {
        fetchRoutines()
    }, [])

    function renderRoutines(routine) {

        //console.log(routine)
        return <div style={{border: "solid darkGreen", padding: "15px", margin: "0.5em"}} key={routine.id}>
            <p style={{marginTop: "0.25em", marginBottom: "0.25em"}}>Routine Name: { routine.name } </p>
            <p style={{marginTop: "0.25em", marginBottom: "0.25em"}}>Goal: { routine.goal } </p>
        </div>

    }

    return (
        <>

        <div>
            MyRoutines
        </div>

        {token ? reverseRoutineList.map(routine => renderRoutines(routine)) : null}



        </>
    )
}
