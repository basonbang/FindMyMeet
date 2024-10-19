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
    <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
      <div className="my-4">
        <Link to='/custom-meets/create'>
          <button className="w-auto h-16 px-4 border-2 shadow-xl text-white bg-sky-600 rounded-lg  transition-transform duration-300 hover:scale-110">
            Create A Meet
          </button>
        </Link>
      </div>

      <div className="flex gap-4 justify-center ">
        {customMeets && customMeets.length > 0 ? (
          customMeets.map((customMeet, i) => (
            <div className="shadow-2xl h-72 w-72 p-4 rounded-lg hover:scale-105 transition duration-300 flex flex-col justify-around">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl text-pretty break-words overflow-hidden mr-1">{customMeet.name}</h3>
                <div className="flex gap-2 items-center">
                  <Link to={`/custom-meets/edit/${customMeet.id}`}>
                    <i className="fas fa-edit hover:scale-125"></i>
                  </Link>
                  <i onClick={() => deleteCustomMeet(customMeet.id, customMeet)} className="fa-solid fa-trash text-red-500 hover:scale-125"></i>
                </div>
              </div>
              <p className="text-md text-gray-400">Plates: {customMeet.plates}</p>
              <p className="text-md text-gray-400">Bar: {customMeet.bar}</p>
              <p className="text-md text-gray-400">Rack: {customMeet.rack}</p>
              <p className="text-md text-gray-400">Lifter Count: {customMeet.lifter_count}</p>
              <p className="text-md text-green-400">💰 ${customMeet.price}</p>
              <Link to={`/custom-meets/${customMeet.id}`}>
                <button className="text-white p-2 bg-sky-600 rounded-lg  transition-transform duration-300 hover:scale-105">More Details</button>
              </Link>
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