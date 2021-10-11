export const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api'

export async function registerUser({username, password}) {

    const registrationData = { username: username, password: password }

    try {

        const postReq = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        })

        const data = await postReq.json()

        return data

    } catch (error) {
        throw error
    }

}

export async function logUserIn({username, password}) {
    const logInData = { username: username, password: password}

    try {

        const postReq = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logInData)
        })

        const data = await postReq.json()

        return data

    } catch (error) {
        throw error
    }
}

export async function getAllActivities() {

    try {

        const getReq = await fetch(`${BASE_URL}/activities`)

        const data = await getReq.json()

        return data

    } catch (error) {
        throw error
    }

}

export async function createAnActivity({activityName, activityDesc}) {

    try {

        const token = localStorage.getItem("CurrentUserToken")

        const postReq = await fetch(`${BASE_URL}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: activityName,
                description: activityDesc
            }),
        })

        const data = postReq.json()

        return data

    } catch (error) {
        throw error
    }

}

export async function getAllRoutines() {

    try {

        const response = await fetch(`${BASE_URL}/routines`)

        const data = await response.json()

        return data

    } catch (error) {
        throw error
    }

}

export async function createNewRoutine({routineName, routineGoal, routineIsPublic}) {

    try {

        const token = localStorage.getItem("CurrentUserToken")
        
        const response = await fetch(`${BASE_URL}/routines`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: routineName,
                goal: routineGoal,
                isPublic: routineIsPublic
            })
        })

        const data = await response.json()

        return data
        
    } catch (error) {
        throw error
    }

}