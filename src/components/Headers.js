import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './Headers.css'

export function EmptyHeader() {
    return (
        <header>
            <div className="square border-bottom border-dark border-3 mb-3">
                {/* <div className="ms-5 fs-3 text-start fw-bold"> FitnessTrackr empty</div> */}
                <Link to='/home' className="ms-5 fs-3 text-start fw-bold text-decoration-none text-reset">FitnessTrackr empty</Link>

            </div>
        </header>
    )
}


export function UnauthenticatedHeader() {


    return (
        <header>
            <div className="square border-bottom border-dark border-3 d-flex justify-content-evenly mb-3">
                {/* <div className="ms-5 fs-3 text-start fw-bold"> FitnessTrackr UNAUTH</div> */}
                <Link to='/home' className="ms-5 fs-3 fw-bold text-decoration-none text-reset">FitnessTrackr UNAUTH</Link>

                <div className="divUnauthHeader">
                <Link to="/sign-up" className="SignUpBtnUnauthHeader" ><Button>Sign Up</Button></Link>
                <Link to="/log-in"><Button>Log In</Button></Link>

                </div>
            </div>
        </header>
    ) 
}


export function AuthenticatedHeader() {
    return (
        <header>
            <div className="square border-bottom border-dark border-3 d-flex justify-content-evenly mb-3">
                {/* <div className="ms-5 fs-3 text-start fw-bold"> FitnessTrackr AUTH</div> */}
                <Link to='/home' className="ms-5 fs-3 text-start fw-bold text-decoration-none text-reset">FitnessTrackr AUTH</Link>

                <div className="divUnauthHeader">
                <Link to="/home" className="authNavBtns"><Button>Home</Button></Link>
                <Link to="/routines"  className="authNavBtns"><Button>Routines</Button></Link>
                <Link to="/myroutines"  className="authNavBtns"><Button>My Routines</Button></Link>
                <Link to="/activites"  className="authNavBtns"><Button>Activities</Button></Link>

                </div>
            </div>
        </header>
    )
}