import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {


    const loggedIn = localStorage.getItem("CurrentUserToken")

    function handleLogOut() {
        localStorage.removeItem("CurrentUserToken")
        location.reload()
    }

    return (
        <>
        <div>
            HomePage
        </div>
        {!loggedIn ? <Link to='login'><button>Log in</button></Link> : <button onClick={handleLogOut}>Log Out</button> }
        

        {loggedIn ? "you are logged in" : "you are not logged in"}
        </>
    )
}
