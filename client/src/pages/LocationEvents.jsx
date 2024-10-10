import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import MeetsAPI from '../../services/MeetsAPI'
import '../css/LocationEvents.css'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState([])
    const [numberOfMeets, setNumberOfMeets] = useState()
    const [meets, setMeets] = useState([])
    
    useEffect(()  => {
        (async () => {
            try {
                const response = await MeetsAPI.getEventsByState(index)
                setLocation(index)
                setNumberOfMeets(response.numberOfMeets)
                setMeets(response.meets)
            } catch (error) {
                throw error
            }
        })()
    }, [])

    return (
        <div className='location-events'>
            <header>
                <div className='location-info'>
                    <h2>{location}</h2>
                    <p>Number of Meets: {numberOfMeets}</p>
                </div>
            </header>

            <main>
                {
                    meets && meets.length > 0 ? meets.map((meet, index) =>
                        <Event
                            key={meet.id}
                            id={meet.id}
                            name={meet.name}
                            date={meet.date}
                            state={meet.state}
                            location={meet.location}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No meets scheduled at this state yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents