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
    lifter_count: '',
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

      if (option.name === 'Kabuki Deadlift Bar' || option.name === 'Texas Deadlift Bar' || option.name ==='Monolift' && meet.isTested){
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
    console.log('before updating tested: ', meet.isTested);
    
    setMeet( (prev) => {
      return {
        ...prev,
        isTested: !prev.isTested
      }
    })

    console.log('after updating tested: ', meet.isTested);
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
    <div>
      <h1>Create Custom Meet</h1>
      <div className="flex items-center justify-between">
        <input type="checkbox" id="isTested" onClick={updateTested}/>
        <label htmlFor="isTested" className="p-2">Is Tested</label>
        <div className="mx-12 flex gap-2 w-auto h-20">
          <button onClick={() => openModal('plates')}>Plates</button>
          <button onClick={() => openModal('bars')}>Bars</button>
          <button onClick={() => openModal('racks')}>Racks</button>
          <button onClick={() => openModal('lifter_count')}>Lifter Count</button>
        </div>
        <div className="flex gap-4">
          <input type="text" placeholder="Enter meet name" onChange={updateName}/>
          <button onClick={submitToDatabase}>CREATE</button>
        </div>
      </div>
      {
        showPopUp && (
          <div className="border-2 border-red-700 bg-black" >
            <h1>⚠️ NOPE!</h1>
            <h2> Sorry, you can't select this type of equipment in a tested meet.</h2>
            <p> Please choose another option <i>or</i> uncheck <b>Is tested</b></p>
            <button onClick={() => setShowPopUp(false)}>X</button>
          </div>
        )
      }
      {
        isModalOpen && (
          <div className="border-2 relative">
            <button onClick={closeModal} className="w-12 bg-red-600 absolute top-0 right-0 ">X</button>
            <ButtonModal 
              data={modalProps}
              selectedOptions={selectedOptions}
              handleChange={handleChange}
            />
          </div>
        )
      }
      <div className="my-4">
        <p>💰 ${meet.price}</p>
      </div>
    </div>

    
   );
}
 
export default CreateCustomMeet;