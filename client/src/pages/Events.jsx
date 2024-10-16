import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import MeetsAPI from "../services/MeetsAPI";

const Events = (  ) => {

  const [meets, setMeets] = useState([])
  const [selectedState, setSelectedState] = useState('')    // keep track of selected value from dropdown

  // fetch all events from the server
  useEffect(() => {
    ( async () => {
      try {
        const response = await MeetsAPI.getAllEvents()
        setMeets(response)
      } catch (error) {
        throw error
      }
    })()
    
  }, [])

  // handle dropdown change, filter meets by state
  const handleDropdownChange = async (event) => {
    setSelectedState(event.target.value)
    if (event.target.value !== '') {
      try {
        const response = await MeetsAPI.getEventsByState(event.target.value)
        setMeets(response.meets)     
      } catch (error) {
        throw error
      }
    }
  }

  // on button click, reset the filter to show all meets
  const showAllMeets = async () => {
    setSelectedState('')
    try {
      const response = await MeetsAPI.getAllEvents()
      setMeets(response)
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="location-events p-6">
      <header className="flex items-center space-x-4 justify-start mb-4">
        
          <label htmlFor="states" className="sr-only"></label>
          <select name="state" id="states" onChange={handleDropdownChange}>
            <option value="">Select a state to filter by...</option>
            <option value="AZ">Arizona</option>
            <option value="CA">California</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
          </select>
          <button onClick={showAllMeets} className="p-2 w-40">Show all Meets</button>
        
      </header>
      <main>
        {meets && meets.length > 0 ? (
          meets.map((meet, index) => (
            <Event
              key={meet.id}
              id={meet.id}
              name={meet.name}
              date={meet.date}
              state={meet.state}
              location={meet.location}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
            {"No meets loaded yet!"}
          </h2>
        )}
      </main>
    </div>
  );
}
 
export default Events;