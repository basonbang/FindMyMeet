import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CustomMeetsAPI from "../services/CustomMeetsAPI";

const CustomMeetDetails = () => {

  const { id } = useParams()
  const [customMeet, setCustomMeet] = useState({})

  useEffect(() => {
    const fetchCustomMeet = async () => {
      try {
        const response = await CustomMeetsAPI.getCustomMeetByID(id)
        setCustomMeet(response)
      } catch (error) {
        throw error
      }
    }
    fetchCustomMeet()
  }, [])

  console.log(customMeet);
  
  const deleteCustomMeet = async () => {
    try {
      await CustomMeetsAPI.deleteCustomMeet(id)
      window.location = '/custom-meets'
    } catch (error) {
      throw error
    }
  }

  return ( 
    <div>
      <h1>Custom Meet Details</h1>
      <div className="border-2 p-4">
        <div className="flex justify-around items-center">
          <h2 className="m-2">{customMeet.name}</h2>
        </div>
        <div className="m-4">
          <p>Plates: {customMeet.plates}</p>
          <p>Bar: {customMeet.bar}</p>  
          <p>Rack: {customMeet.rack}</p>
          <p>Lifter Count: {customMeet.lifter_count}</p>
          <p>💰 ${customMeet.price}</p>
          <p>Tested: {customMeet.is_tested ? 'Confirmed': 'Unconfirmed/Untested'}</p>
          <div className="flex justify-center gap-4">
            <Link to={`/custom-meets/edit/${id}`}>
              <button className="w-auto h-12">Edit</button>
            </Link>
            <button className="w-auto h-12 bg-red-500" onClick={deleteCustomMeet}>Delete</button>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default CustomMeetDetails;