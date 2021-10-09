import React, {useState} from 'react'
import { Redirect, Link } from 'react-router-dom'
import { logUserIn } from '../api/Api'

const Login = (props) => {

    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
 
    async function handleRegister(event) {
        setError("")

        if(username !== "") {
            checkPassword()
        } else {
            setError('Please enter a username!!!')
        }

        async function checkPassword() {
            if(password !== "") {
                const userData = { username, password }

                sendUserData(userData)
            } else {
                setError('Please enter a password!!!')
            }
        }

        async function sendUserData(userData) {
            try{
                const data = await logUserIn(userData)

                console.log(data)
                //data.message
                if (data.message === "Username or password is incorrect") {
                    setError(data.message)
                } else if (data.message === "you're logged in!") {
                    setError(data.message)
                }

            } catch (error) {
                setError('Something went wrong! Try again.')
            }
        }

    }
    

    return (
        <>
        <div style={ error === "you're logged in!" ? {backgroundColor: 'darkgreen', color: 'lightblue'} : {backgroundColor: 'red', color: 'black'}}>
            {error}
        </div>
        <div>
            <input type="text" placeholder="Please create a username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Please create a password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleRegister}>Log In</button>
            <p>Don't have an account? <Link to="/register" >Register here</Link></p>
        </div>
        </>
    )
}

export default Login;