// fetch all meets from the server
const getAllEvents = async () => {
  try {
    console.log('Attempting to fetch from the server...');
    const response = await fetch(`http://localhost:3000/api/meets`)
    const meets = await response.json()
    console.log(`Successfully fetched events from the server! ${meets}`);
    return meets
  } catch (error) {
    console.log(`❌ Error fetching all events on front end => ${error.message}`);
  }
}

// fetch all meets for a state
const getEventsByState = async (state) => {
  try {
    console.log('Attempting to fetch from the server...');
    const response = await fetch(`http://localhost:3000/api/states/${state}`)
    const meets = await response.json()
    console.log(`Successfully fetched all events by state from the server! ${meets}`);
    return meets
  } catch (error) {
    console.log(`❌ Error fetching events by state on front end => ${error.message}`);
  }
}

// fetch a meet by ID
const getEventByID = async (id) => {
  try {
    console.log('Attempting to fetch from the server...');
    const response = await fetch(`http://localhost:3000/api/meets/${id}`)
    const meets = await response.json()
    console.log(`Successfully fetched event by ID from the server! ${meets}`);
    return meets
  } catch (error) {
    console.log(`❌ Error fetching events by ID => ${error.message}`);
  }
}

// fetch all states
const getAllStates = async () => {
  try {
    console.log('Attempting to fetch from the server...');
    const response = await fetch(`http://localhost:3000/api/states`)

    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const meets = await response.json()
    console.log(`Successfully fetched all states from the server! ${meets}`);
    return meets
  } catch (error) {
    console.log(`❌ Error fetching states on front end => ${error.stack}`);
  }
}

export default {
  getAllEvents,
  getEventsByState,
  getAllStates,
  getEventByID
}