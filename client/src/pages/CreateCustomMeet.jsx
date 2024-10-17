import { useState } from "react"

const CreateCustomMeet = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState()
  const [meet, setMeet] = useState({
    name: '',
    plates: '',
    bar: '',
    rack: '',
    lifter_count: '',
  })

  const handleChange = (event) => {
    const {name, value} = event.target
    setMeet( (prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent(null)
  }

  const openPlatesModal = () => {
    setIsModalOpen(true)
    setModalContent(
      <div>
        <h1>Plates</h1>
        <div>
          <button className="w-64 h-36">
            <img src="https://garagegymlab.com/wp-content/uploads/2021/03/IP0002-10-600x600.jpg" className="w-64 h-36"/>
          </button>
        </div>
      </div>
    )
  }
  const openBarModal = () => {
    setIsModalOpen(true)
    setModalContent(
      <div>
        <h1>Bars</h1>
      </div>
    )
  }
  const openRackModal = () => {
    setIsModalOpen(true)
    setModalContent(
      <div>
        <h1>Racks</h1>
      </div>
    )
  }
  const openLifterCountModal = () => {
    setIsModalOpen(true)
    setModalContent(
      <div>
        <h1>Lifter Count</h1>
      </div>
    )
  }

  return ( 
    <div>
      <h1>Create Custom Meet</h1>
      <div className="flex items-center justify-between">
        <input type="checkbox" id="isTested" name="isTested"/>
        <label htmlFor="isTested" className="p-2">Is Tested</label>
        <div className="mx-12 flex gap-2 w-auto h-20">
          <button onClick={openPlatesModal}>Plates</button>
          <button onClick={openBarModal}>Bars</button>
          <button onClick={openRackModal}>Racks</button>
          <button onClick={openLifterCountModal}>Lifter Count</button>
        </div>
        <div className="flex gap-4">
          <input type="text" placeholder="Enter meet name"/>
          <button>CREATE</button>
        </div>
      </div>
      {
        isModalOpen && (
          <div className="relative border-2 rounded-lg">
            {modalContent}
            <button onClick={closeModal} className="w-12 bg-red-600 absolute top-0 right-0">X</button>
          </div>
        )
      }
    </div>

    
   );
}
 
export default CreateCustomMeet;