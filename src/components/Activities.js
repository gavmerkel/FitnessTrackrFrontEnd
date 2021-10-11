import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllActivities, createAnActivity } from '../api/Api'

export default function Activities() {

    const [activitiesArray, setActivitiesArray] = useState([])
    const [newestToOldest, setNewestToOldest] = useState(false)
    const [activityName, setActivityName] = useState("")
    const [activityDesc, setActivityDesc] = useState("")
    const [error, setError] = useState("")

    const loggedIn = localStorage.getItem("CurrentUserToken")
    const reverseActivitiesArray = activitiesArray.reverse()
    
    async function fetchActivities() {

        try {

            const result = await getAllActivities()
            console.log("RESULT", result)
            setActivitiesArray(result)

        } catch (error) {
            console.log("ERROR", error)
        }

    }


    useEffect(() => {
        fetchActivities()
    }, [])

    function renderActivities(activity) {

        //console.log(activity)
        return <div style={{border: "solid darkGreen", padding: "15px", margin: "0.5em"}} key={activity.id}>
            <p style={{marginTop: "0.25em", marginBottom: "0.25em"}}>Activity Name: { activity.name } </p>
            <p style={{marginTop: "0.25em", marginBottom: "0.25em"}}>Description: { activity.description } </p>
        </div>

    }

    async function handleCreateActivity(e) {
        e.preventDefault()

        try {

            if (activityName === "" || activityDesc === "") {
                setError("Your activity must have both a name and description!")
                return
            }

            const activityData = {activityName, activityDesc}

            const response = await createAnActivity(activityData)

            setError("Your activity has been created!")
            console.log(activityData)
            console.log(response)

        } catch (error) {
            console.log("something went wrong posting data")
        }

    }


    
    return (
        <>

        <div style={{textAlign: "center", borderBottom: "solid darkGreen", marginBottom: "1em", padding: "0.5em"}}>
            Activities Page
        </div> 

        {loggedIn ? 
            <form style={{border: "solid"}} onSubmit={handleCreateActivity}>
                {error}
                <h3>Create your own activity!</h3>
                <input type="text" placeholder="Activity Name" value={activityName} onChange={(e) => setActivityName(e.target.value)}/>
                <input type="text" placeholder="Activity Description" value={activityDesc} onChange={(e) => setActivityDesc(e.target.value)} />
                <button type="submit" >Create</button>
            </form>
            :
            ""
        }

        <div style={{marginBottom: "1em", padding: "0.5em"}}>
            Sorted By:
            <select style={{marginLeft: "1em", marginRight: "1em"}} onClick={e => {
                if (e.target.value === "Old First") {
                    setNewestToOldest(false)
                } else if (e.target.value === "New First") {
                    setNewestToOldest(true)
                }
            }}>
                <option value="Old First" >Oldest to Newest</option>
                <option value="New First" >Newest to Oldest</option>
                
            </select>
            
            <Link to="/"><button>Back to home</button></Link>
        </div>
        {newestToOldest ? reverseActivitiesArray.map(activity => renderActivities(activity)) : activitiesArray.map(activity => renderActivities(activity))}


        </>
    )
}
