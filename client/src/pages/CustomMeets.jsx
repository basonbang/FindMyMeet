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

  const deleteCustomMeet = async (id, meet) => {
    try {
      const result = await CustomMeetsAPI.deleteCustomMeet(id, meet)
      window.location = '/custom-meets'
    } catch (error) {
      throw error
    }
  }
  
  console.log(customMeets);
  return ( 
    <div className="flex flex-col">
      <div className="my-4">
        <Link to='/custom-meets/create'><button className="w-auto h-16">Create A Meet</button></Link>
      </div>

      <div className="flex gap-4">
        {customMeets && customMeets.length > 0 ? (
          customMeets.map((customMeet, i) => (
            <div className="border w-72 p-4">
              <div className="flex justify-between items-center">
                <h3>{customMeet.name}</h3>
                <Link to={`/custom-meets/edit/${customMeet.id}`}>
                  <i className="fas fa-edit"></i>
                </Link>
                <i onClick={() => deleteCustomMeet(customMeet.id, customMeet)} className="fa-solid fa-trash"></i>
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