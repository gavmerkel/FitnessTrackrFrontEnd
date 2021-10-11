import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../api/Api'

export default function Register() {

    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
 
    async function handleRegister(event) {
        setError("")

        if(username !== "") {
            checkPassword()
        } else {
            setError('Please enter a username!!!')
        }

        async function checkPassword() {
            if(password !== "") {
                checkPasswordLength()
            } else {
                setError('Please enter a password!!!')
            }
        }

        async function checkPasswordLength() {
            if(password.length >= 8) {
                checkConfirmPassword()
            } else {
                setError('Password must be atleast 8 characters!!!')
            }
        }

        async function checkConfirmPassword() {
            if(confirmPassword === password) {
                const userData = { username, password}

                await sendUserData(userData)
            } else {
                setError('Passwords do not match! Try again')
            }
        }

        async function sendUserData(userData) {
            try{
                const data = await registerUser(userData)

                console.log(data)
                if (data.message === "A user by that username already exists") {
                    setError(data.message)
                } else if (data.message === "you're signed up!") {
                    setError("Thank you for Signing up!")
                }

            } catch (error) {
                setError('Something went wrong! Try again.')
            }
        }

    }
    

    return (
        <>
        <div style={ error === "Thank you for Signing up!" ? {backgroundColor: 'darkgreen', color: 'lightblue'} : {backgroundColor: 'red', color: 'black'}}>
            {error}
        </div>
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Please create a username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Please create a password" value={password} onChange={e => setPassword(e.target.value)}/>
            <input type="password" placeholder="Please confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            <button type="submit">Register Account</button>
            <p>Already have an account? <Link to="/login" >Log in here</Link></p>
        </form>
        </>
    )
}
