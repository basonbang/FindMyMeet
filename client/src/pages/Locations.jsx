import React, { useState, useEffect, useRe } from 'react'
import { Link } from 'react-router-dom';
import MeetsAPI from '../../services/MeetsAPI' 
import '../css/Locations.css'

const Locations = () => {

    const [states, setStates] = useState([])
    const [stateNames, setStateNames] = useState({state1: '', state2: '', state3: '', state4: ''})

    // fetch all the states from the server
    useEffect(() => {
        (async () => {
            try {
                const statesData = await MeetsAPI.getAllStates()
                setStates(statesData)
                setStateNames({state1: statesData[0].state, state2: statesData[1].state, state3: statesData[2].state, state4: statesData[3].state})
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])


    return (
        <div className='available-locations'>
            <div id='venue1button' className='venue1-button-overlay'>
                <Link to={`/states/${stateNames.state1}`}>
                    <img src="../../arizona-removebg-preview.png" alt="" />
                </Link>
                <p>{stateNames.state1}</p>
            </div>

            <div id='venue2button' className='venue2-button-overlay'>
                <Link to={`/states/${stateNames.state2}`}>
                    <img src="../../california-removebg-preview.png" alt="" />
                </Link>
                <p>{stateNames.state2}</p>
            </div>

            <div id='venue3button' className='venue3-button-overlay'>
                
                <Link to={`/states/${stateNames.state3}`}>
                    <img src="../../florida-map-isolated-on-transparent-260nw-654437647-removebg-preview.png" alt="" />
                </Link>
                <p>{stateNames.state3}</p>
            </div>

            <div id='venue4button' className='venue4-button-overlay'>
                <Link to={`/states/${stateNames.venue4}`}>
                    <img src="../../texas-removebg-preview.png" alt="" />
                </Link>
                <p>{stateNames.state4}</p>
            </div>
        </div>
    )
}

export default Locations