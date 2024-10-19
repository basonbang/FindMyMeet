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
    <div className="flex flex-col items-center p-6 mx-auto">
      <div className="p-6 w-full rounded-lg shadow-2xl">
        <div className="flex justify-around items-center">
          <h2 className="text-2xl">{customMeet.name}</h2>
        </div>
        <div className="m-4 space-y-6">
          <p className="text-lg font-semibold text-red-300">Plates: {customMeet.plates}</p>
          <p className="text-lg font-semibold text-red-300">Bar: {customMeet.bar}</p>  
          <p className="text-lg font-semibold text-red-300">Rack: {customMeet.rack}</p>
          <p className="text-lg font-semibold text-blue-300">Lifter Count: {customMeet.lifter_count}</p>
          <p className="text-lg font-semibold text-green-400">💰 ${customMeet.price}</p>
          <p>Tested 💉: {customMeet.is_tested ? <b>Confirmed</b>: <b>Unconfirmed/Untested</b>}</p>
          <div className="flex justify-center gap-4">
            <Link to={`/custom-meets/edit/${id}`}>
              <button className="w-auto h-12 px-5 bg-sky-500 rounded-lg hover:scale-110 transition duration-300">Edit</button>
            </Link>
            <button className="w-auto h-12 px-4 py-2 bg-red-500 rounded-lg hover:scale-110 transition duration-300" onClick={deleteCustomMeet}>Delete</button>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default CustomMeetDetails;