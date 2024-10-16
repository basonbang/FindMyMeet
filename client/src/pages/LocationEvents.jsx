import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import MeetsAPI from '../services/MeetsAPI'
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
            <header className='px-8 '>
                <div className='location-info'>
                    <h2 className='text-2xl font-bold mb-2'>{location}</h2>
                    <p className='text-lg'>Number of Meets: {numberOfMeets}</p>
                </div>
            </header>

            <main className='p-4'>
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
                    ) : <h2 className='text-center'><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No meets scheduled at this state yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents