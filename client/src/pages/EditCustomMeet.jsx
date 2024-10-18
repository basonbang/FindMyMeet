import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { bars, plates, racks, lifter_count } from '../utilities/choicesData';
import ButtonModal from "../components/ButtonModal";
import CustomMeetsAPI from "../services/CustomMeetsAPI";

const EditCustomMeet = () => {

  const { id } = useParams()
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

  // fetch custom meet data by it's id from the server
  useEffect(() => { 
    const fetchCustomMeet = async () => {
      try {
        const data = await CustomMeetsAPI.getCustomMeetByID(id)
        setMeet(data)
      } catch (error) {
        throw error
      }
    }
    fetchCustomMeet()
  }, [])

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

  }
  console.log('after updating tested: ', meet.isTested);

  const updateName = (e) => {
    setMeet((prev) => {
      return {
        ...prev,
        name: e.target.value
      }
    })
  }

  const submitToDatabase = async () => {    
    await CustomMeetsAPI.createCustomMeet(meet)
  }

  return ( 
    <div>
      <h1>Edit Custom Meet</h1>
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
          <input type="text" placeholder={meet.name} onChange={updateName}/>
          <button onClick={(submitToDatabase)}>CREATE</button>
        </div>
      </div>
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
      <div className="border-2 p-4">
        <div className="flex justify-around items-center">
          <h2 className="m-2">{meet.name}</h2>
        </div>
        <div className="m-4">
          <p>Plates: {meet.plates}</p>
          <p>Bar: {meet.bar}</p>  
          <p>Rack: {meet.rack}</p>
          <p>Lifter Count: {meet.lifter_count}</p>
          <p>💰 ${meet.price}</p>
          <p>Tested: {meet.isTested ? 'Confirmed': 'Unconfirmed/Untested'}</p>
    
        </div>
      </div>
      <div className="flex justify-center gap-4">
            <button className="w-auto h-12 bg-red-500" onClick={() => CustomMeetsAPI.deleteCustomMeet(meet.id, meet)}>Delete</button>
          </div>
    </div>

    
   );
}
 
export default EditCustomMeet;