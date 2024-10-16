import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MeetsAPI from '../services/MeetsAPI'
import '../css/Event.css'

const Event = ({id, name, date, state, location}) => {

    const [meet, setMeet] = useState([])
    const [daysOut, setDaysOut] = useState([])
    

    // fetch individual meet data from the API on component mount
    useEffect(() => {
        (async () => {
            try {
                const meetData = await MeetsAPI.getEventByID(id)
                setMeet(meetData[0])
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    // calculate the # of days out from the meet
    useEffect(() => {
        const formatDaysOut = () => {
            // grab current date and date of the meet        
            const currentDate = new Date()
            let meetDate
            if (meet.date?.includes('-')){
                const firstDayOfMeet = meet.date.split('-')[0]
                meetDate = new Date(firstDayOfMeet)
            } else {
                meetDate = new Date(meet.date)
            }
            
            // calculate the difference in time between the two dates
            const difference = meetDate - currentDate

            // if the meet has already passed, set the days out to a message
            if (difference < 0){
                setDaysOut('Meet has already passed')
                return
            }
            
            // convert milliseconds to days
            const days = Math.floor(difference / (1000 * 60 * 60 * 24))
            setDaysOut(days)
        }
        formatDaysOut()
    }, [meet])

    return (
        <article className='bg-[--primary] border-2 shadow-lg rounded-lg overflow-hidden w-80 h-96 m-4 relative group hover:'>
            <img src={meet.image} alt="Powerlifting fed logo" className='bg-cover bg-center absolute left-10 bottom-36'/>
            
            <div className='text px-16 py-12 backdrop-blur-lg transition ease-in-out duration-300 '>
                <h3 className=''>{name}</h3>
                <p className='text-gray-700 mb-2'><i class="fa-solid fa-location-dot"></i>{location}</p>
                <p className='text-gray-700 mb-2'><i className="fa-regular fa-calendar fa-bounce"></i> {date} </p>
                <p className='text-gray-700 mb-4'>Days Out: {daysOut}</p>
                <a href={meet.link} target="_blank" className='font-bold text-red-600'>More Information</a>
            </div>
           
        </article>
    )
}

export default Event