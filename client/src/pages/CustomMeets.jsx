import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomMeetsAPI from "../services/CustomMeetsAPI";

const CustomMeets = () => {

  const [customMeets, setCustomMeets] = useState([])
  
  useEffect(() => {
    const fetchCustomMeets = async () => {
      try {
        const response = await CustomMeetsAPI.getAllCustomMeets()
        setCustomMeets(response)
      } catch (error) {
        throw error
      }
    }
    fetchCustomMeets()
    
  }, [])
  
  console.log(customMeets);
  return ( 
    <div className="flex flex-col">
      <div className="my-4">
        <Link to='/custom-meets/create'><button>Create A Meet</button></Link>
      </div>

      <div>
        {customMeets && customMeets.length > 0 ? (
          customMeets.map((customMeet) => (
            <div className="border w-72 p-4">
              <div className="flex justify-between items-center">
                <h3>{customMeet.name}</h3>
                <i class="fas fa-edit"></i>
                <i class="fa-solid fa-trash"></i>
              </div>
              <p>Plates: {customMeet.plates}</p>
              <p>Bar: {customMeet.bar}</p>
              <p>Rack: {customMeet.rack}</p>
              <p>Lifter Count: {customMeet.lifter_count}</p>
              <p>💰 ${customMeet.price}</p>
              <Link to={`/custom-meets/${customMeet.id}`}><button>More Details</button></Link>
            </div>
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
            {"No meets loaded yet!"}
          </h2>
        )}
      </div>
    </div>
   );
}
 
export default CustomMeets;