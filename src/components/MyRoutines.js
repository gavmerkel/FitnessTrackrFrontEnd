import React, { useState, useEffect } from 'react'
import { getAllRoutines, createNewRoutine } from '../api/Api'

export default function MyRoutines() {

    const token = localStorage.getItem("CurrentUserToken")

    const [routineList, setRoutineList] = useState([])
    //const reverseRoutineList = routineList.reverse()

    const [routineName, setRoutineName] = useState("")
    const [routineGoal, setRoutineGoal] = useState("")
    const [routineIsPublic, setRoutineIsPublic] = useState(true)
    const [error, setError] = useState("")

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

    async function handleCreateRoutine(e) {
        e.preventDefault()
        try {

            if (routineName === "" || routineGoal === "") {
                setError("Your routine must have both a name and goal!")
                return
            }

            const routineData = {routineName, routineGoal, routineIsPublic}

            const response = await createNewRoutine(routineData)

            setError("Your routine has been created!")
            console.log(routineData)
            console.log(response)

        } catch (error) {
            throw error
        }

    }

    return (
        <>

        <div style={{textAlign: "center", borderBottom: "solid darkGreen", marginBottom: "1em", padding: "0.5em"}}>
            My Routines Page
        </div>

        {token ? 
            <form style={{border: "solid"}} onSubmit={handleCreateRoutine}>
                {error}
                <h3>Create your own activity!</h3>
                <input type="text" placeholder="Routine Name" value={routineName} onChange={(e) => setRoutineName(e.target.value)}/>
                <input type="text" placeholder="Routine Goal" value={routineGoal} onChange={(e) => setRoutineGoal(e.target.value)} />
                <label>Make this routine private? 
                    <input type="checkbox" onChange={e => setRoutineIsPublic(!routineIsPublic)}/>
                </label>
                <button type="submit" >Create</button>
            </form>
            :
            ""
        }

        {token ? routineList.map(routine => renderRoutines(routine)) : null}



        </>
    )
}
