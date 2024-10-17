const getAllCustomMeets = async () => {
  try {
    console.log('Attempting to fetch from the server...');
    const response = await fetch(`http://localhost:3000/api/custom-meets`)
    const data = response.json()
    console.log(`Successfully fetched all custom meets from the server! ${data}`);
    return data
  } catch (error) {
    console.log(`❌ Error fetching all custom meets on front end => ${error.message}`); 
  }
}

const getCustomMeetByID = async (id) => {
  try {
    log.info('Attempting to fetch from the server...');
    const response = await fetch(`http://localhost:3000/api/custom-meets/${id}`)
    const data = response.json()
    console.log(`Successfully fetched custom meet by ID from the server! ${data}`);
    return data
  } catch (error) {
    console.log(`❌ Error fetching custom meet by ID => ${error.message}`);
  }
}

const createCustomMeet = async (meet) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(meet)
    }
    const response = await fetch('http://localhost:3000/api/custom-meets', options)
    const data = response.json()
    console.log(`Successfully created custom meet! ${data}`);
  } catch (error) {
    console.log(`❌ Error creating custom meet => ${error.message}`);
  }
}

const updateCustomMeet = async (id, meet) => {
  try {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(meet)
    }
    const response = await fetch(`http://localhost:3000/api/custom-meets/${id}`, options)
    const data = response.json()
    console.log(`Successfully updated custom meet! ${data}`);
  } catch (error) {
    console.log(`❌ Error updating custom meet => ${error.message}`);
  }
}

const deleteCustomMeet = async (id, meet) => {
  try {
    const options = {
      method: 'DELETE'
    }
    const response = await fetch(`http://localhost:3000/api/custom-meets/${id}`, options)
    const data = response.json()
    console.log(`Successfully deleted custom meet! ${data}`);
  } catch (error) {
    console.log(`❌ Error deleting custom meet => ${error.message}`);
  }
}