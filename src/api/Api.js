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