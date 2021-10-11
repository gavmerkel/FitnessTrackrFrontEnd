import React, {useState} from 'react'
import { Redirect, Link } from 'react-router-dom'
import { logUserIn } from '../api/Api'

const Login = () => {

    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
 
    async function handleRegister(event) {
        event.preventDefault()
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

                    localStorage.setItem("CurrentUserToken", data.token)
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
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Log In</button>
            <p>Don't have an account? <Link to="/register" >Register here</Link></p>
            <Link to="/"><button>Home Page</button></Link>
        </form>
        </>
    )
}

export default Login;