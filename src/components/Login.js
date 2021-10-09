import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import { BASE_URL } from '../api/Api'

const Login = (props) => {
    const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {loggedInUser, setLoggedinUser} = props
    const [error, setError] = useState(null)

    async function authenticate(event) {
        event.preventDefault();

        setFormSubmittedSuccessfully(false)
        setError(null)
        
        if(username !== '') {
            checkPassword()
        } else {
            setError('Please enter a valid username!')
        }

        async function checkPassword() {
            if(password !== '') {
                logIn()
            } else {
                setError('Please enter a valid password or click "SIGN UP" to create an account!')
            }
        }

        async function logIn() {
            try {
                const result = await fetch(`${BASE_URL}/users/login`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: {
                            username: username,
                            password: password
                        }
                    })
                })

            const loginResponse = await result.json()

            if(loginResponse.success === false) {
                setError(loginResponse.error.message)
                setUsername('')
                setPassword('')
                return;
            } else if(loginResponse.success === true) {
                localStorage.setItem('currentUserToken', loginResponse.data.token)
                localStorage.setItem('currentUserUsername', username)
                setLoggedinUser(loginResponse.data.token)
                setFormSubmittedSuccessfully(true)
            }

            } catch(error) {
                console.log(error)
            }
        }
    }

    if(formSubmittedSucessfully) {
        return <Redirect to="/home" />
    }

    return (
        <>
        {EmptyHeader}

        {error ? <Alert variant='danger'>{error}</Alert> : null}

        <section className="login">
            <form onSubmit={authenticate}>
                <label>
                    Username:
                    <input type="text" username="username" onChange={(event) => setUsername(event.target.value)} value={username}/>
                </label>
                <label>
                    <input type="password" password="password" onChange={(event) => setPassword(event.target.value)} value={password}/>
                </label>

                <button type="submit">LOGIN</button>

                <link className="lnkBtn" to="/sign-up">SIGN UP</link>
            </form>
        </section>
        </>
    )
}

export default Login;