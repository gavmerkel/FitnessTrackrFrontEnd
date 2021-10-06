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
                </Routine>

                <Route path='/login'>
                    <Login />
                </Routine>

                <Route path='/my-routines'>
                    <MyRoutines />
                </Routine>

                <Route path='/register'>
                    <Register />
                </Routine>

                <Route path='/routines'>
                    <Routines />
                </Routine>


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