import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import Activities from './Activities'
import Headers from './Headers'
import Home from './Home'
import Login from './Login'
import MyRoutines from './MyRoutines'
import Register from './Register'
import Routines from './Routines'



function App() {


    return (
        <div>
            <Router>
                <Switch>

                    <Route path='/home'>
                        <Home />
                    </Route>

                    <Route path='/activities'>
                        <Activities />
                    </Route>

                    <Route path='/login'>
                        <Login />
                    </Route>

                    <Route path='/my-routines'>
                        <MyRoutines />
                    </Route>

                    <Route path='/register'>
                        <Register />
                    </Route>

                    <Route path='/routines'>
                        <Routines />
                    </Route>

                    <Route exact path='/'>
                        <Redirect to='/home' />
                    </Route>

                    {/* <Route path="*">
                        <UnknownPath EmptyHeader={<EmptyHeader/>}
                        />  
                    </Route> */}

                </Switch>
            </Router>
        </div>
    )
}

export default App;
