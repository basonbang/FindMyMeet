// fetch all meets from the server
const getAllEvents = async () => {
  const response = await fetch('/api/meets')
  const meets = await response.json()
  return meets
}

// fetch all meets for a state
const getEventsByState = async (state) => {
  const response = await fetch(`api/states/${state}`)
  const meets = await response.json()
  return meets
}

// fetch all states
const getAllStates = async () => {
  const response = await fetch('/api/states')
  const states = await response.json()
  return states
}

export default {
  getAllEvents,
  getEventsByState,
  getAllStates
}