import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import MeetsAPI from '../services/MeetsAPI' 

const Locations = () => {

    const [states, setStates] = useState([])
    const [stateNames, setStateNames] = useState({state1: '', state2: '', state3: '', state4: ''})

    // fetch all the states from the server
    useEffect(() => {
        (async () => {
            try {
                const statesData = await MeetsAPI.getAllStates()                
                setStates(statesData)
                setStateNames({
                  state1: statesData[0].state,
                  state2: statesData[1].state,
                  state3: statesData[2].state,
                  state4: statesData[3].state,
                });
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])


    return (
        <div className='flex justify-center flex-wrap p-6'>
            <div id='venue1button' className='flex flex-col justify-between w-52 uppercase font-bold m-4 p-4 border-2 rounded-lg shadow-lg bg-[--primary]'>
                <Link to={`/states/${stateNames.state1}`}>
                    <img src="../../arizona-removebg-preview.png" className='w-full h-44 mb-2 transform transition-transform duration-300 hover:scale-110'/>
                </Link>
                <p className='text-center text-white font-bold text-lg'>{stateNames.state1}</p>
            </div>

            <div id='venue2button' className='flex flex-col justify-between w-52 uppercase font-bold m-4 p-4 border-2 rounded-lg shadow-lg bg-[--primary]'>
                <Link to={`/states/${stateNames.state2}`}>
                    <img src="../../california-removebg-preview.png" className='w-full h-44 mb-2 transform transition-transform duration-300 hover:scale-110' />
                </Link>
                <p className='text-center text-white font-bold text-lg'>{stateNames.state2}</p>
            </div>

            <div id='venue3button' className='flex flex-col justify-between w-52 uppercase font-bold m-4 p-4 border-2 rounded-lg shadow-lg bg-[--primary]'>
                
                <Link to={`/states/${stateNames.state3}`}>
                    <img src="../../florida-map-isolated-on-transparent-260nw-654437647-removebg-preview.png" className='w-full h-44 mb-2 transform transition-transform duration-300 hover:scale-110' />
                </Link>
                <p className='text-center text-white font-bold text-lg'>{stateNames.state3}</p>
            </div>

            <div id='venue4button' className='flex flex-col justify-between w-52 uppercase font-bold m-4 p-4 border-2 rounded-lg shadow-lg bg-[--primary]'>
                <Link to={`/states/${stateNames.state4}`}>
                    <img src="../../texas-removebg-preview.png" className='w-full h-44 mb-2 transform transition-transform duration-300 hover:scale-110' />
                </Link>
                <p className='text-center text-white font-bold text-lg'>{stateNames.state4}</p>
            </div>
        </div>
    )
}

export default Locations