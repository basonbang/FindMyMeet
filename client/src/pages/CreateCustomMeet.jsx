import { useState } from "react"
import { bars, plates, racks, lifter_count } from '../utilities/choicesData';
import ButtonModal from "../components/ButtonModal";
import CustomMeetsAPI from "../services/CustomMeetsAPI";

const CreateCustomMeet = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [category, setCategory] = useState()
  const [modalProps, setModalProps] = useState()
  const [meet, setMeet] = useState({
    plates: '',
    bar: '',
    rack: '',
    lifter_count: 0,
    name: '',
    isTested: false,
    price: 0
  })
  const [showPopUp, setShowPopUp] = useState(false)

  const handleChange = (option) => {
    // need to define updatedOptions since selectedOptions state isn't updated immediately
    setSelectedOptions((prevSelectedOptions) => {
      // if there is another option of the same category, filter out the older option from the prev state
      let updatedOptions = prevSelectedOptions.filter((item) => item.category !== option.category);
      
      // if option was already selected, remove it from the list
      if (prevSelectedOptions.includes(option)) {
        updatedOptions = prevSelectedOptions.filter((item) => item !== option);
      } else {
        // Add the option to the updated list
        updatedOptions = [...updatedOptions, option];
      }

      if ((option.name === 'Kabuki Deadlift Bar' || option.name === 'Texas Deadlift Bar' || option.name ==='Monolift') && meet.isTested){
        setShowPopUp(true)
      }

      // Calculate the current price with the updated options
      const currentPrice = updatedOptions.reduce((accumulator, currentValue) => {
        return accumulator + parseInt(currentValue.price);
      }, 0);

      setMeet((prev) => {
        return {
          ...prev,
          [category]: option.name || option.count,
          price: currentPrice
        };
      });

      return updatedOptions;
    });
  }  

  const openModal = (category) => {
    setIsModalOpen(true)

    switch (category) {
      case 'plates':
        setCategory('plates')
        setModalProps(plates)
        break
      case 'bars':
        setCategory('bar')
        setModalProps(bars)
        break
      case 'racks':
        setCategory('rack')
        setModalProps(racks)
        break
      case 'lifter_count':
        setCategory('lifter_count')
        setModalProps(lifter_count)
        break
      default:
        break
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalProps(null)
  }

  const updateTested = () => {
    setMeet( (prev) => {
      return {
        ...prev,
        isTested: !prev.isTested
      }
    })
  }

  const updateName = (e) => {
    setMeet((prev) => {
      return {
        ...prev,
        name: e.target.value
      }
    })
  }

  const submitToDatabase = async () => {
    console.log('submit button worked');
    
    await CustomMeetsAPI.createCustomMeet(meet)
    window.location = '/custom-meets'
  }

  return ( 
    <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
      <h1 className="mb-6">Create A Custom Meet</h1>
      <div className="flex items-center justify-between mb-6 px-6 border-2 rounded-lg">
        <label htmlFor="isTested" className="p-2 text-lg bg-gray-200 rounded-lg flex gap-2 items-center">
        <input type="checkbox" id="isTested" onClick={updateTested} />
          Tested
        </label>
        <div className="mx-12 my-10 flex items-center gap-4 w-auto h-20">
          <button onClick={() => openModal('plates')} className="p-2 h-12 bg-sky-500 font-bold rounded-lg  hover:scale-110 transition duration-300">Plates</button>
          <button onClick={() => openModal('bars')} className="p-2 h-12 bg-sky-500 font-bold rounded-lg  hover:scale-110 transition duration-300">Bars</button>
          <button onClick={() => openModal('racks')} className="p-2 h-12 bg-sky-500 font-bold rounded-lg  hover:scale-110 transition duration-300">Racks</button>
          <button onClick={() => openModal('lifter_count')} className="w-28 h-12 bg-sky-500 font-bold rounded-lg hover:scale-110 transition duration-300">Lifter Count</button>
        </div>
        <div className="flex gap-4 ">
          <input type="text" placeholder="Enter meet name" onChange={updateName} className="px-4 py-2 bg-gray-200 rounded-lg "/>
          <button onClick={submitToDatabase} className="py-2 bg-sky-500 px-2 font-bold rounded-lg hover:scale-110 transition duration-300">CREATE</button>
        </div>
      </div>
      {
        showPopUp && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-opacity-50 backdrop-blur-md bg-gray-300 z-50" >
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center border-2 border-red-500 w-10/12">
              <h1 className="mb-4">⚠️ NOPE!</h1>
              <h2 className="mb-4"> Sorry, you can't select this type of equipment in a tested meet.</h2>
              <p className="mb-4"> Please choose another option <i>or</i> uncheck <b>tested</b></p>
              <button onClick={() => setShowPopUp(false)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">X</button>
            </div>
          </div>
        )
      }
      {
        isModalOpen && (
          <div className="border-2 relative">
            <button onClick={closeModal} className="absolute -top-4 -right-4 w-12 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 ">X</button>
            <ButtonModal 
              data={modalProps}
              selectedOptions={selectedOptions}
              handleChange={handleChange}
            />
          </div>
        )
      }
      <div className="my-4 p-3 border">
        <p className="font-bold text-green-500">💰 ${meet.price}</p>
      </div>
    </div>

    
   );
}
 
export default CreateCustomMeet;