import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MeetsAPI from '../../services/MeetsAPI'
import '../css/Event.css'

const Event = ({id, name, date, state, location}) => {

    const [meet, setMeet] = useState([])
    const [time, setTime] = useState([])
    const [daysOut, setDaysOut] = useState([])
    

    // fetch individual meet data from the API on component mount
    useEffect(() => {
        (async () => {
            try {
                const meetData = await MeetsAPI.getEventByID(id)
                
                setMeet(meetData[0])
                setTime(meetData.date)                
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])


    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const timeRemaining = await dates.formatRemainingTime(meet.remaining)
    //             setDaysOut(timeRemaining)
    //             dates.formatNegativeTimeRemaining(remaining, meet.id)
    //         }
    //         catch (error) {
    //             throw error
    //         }
    //     }) ()
    // }, [meet])

    return (
        <article className='event-information'>
            <img src={meet.image} alt="Powerlifting fed logo" />
            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{name}</h3>
                    <p>{location}</p>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {date} <br /> {time}</p>
                    <Link to={meet.link}>More Information</Link>
                </div>
            </div>
        </article>
    )
}

export default Event