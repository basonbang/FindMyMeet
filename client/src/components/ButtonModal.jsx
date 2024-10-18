const ButtonModal = ({data, selectedOptions, handleChange}) => {  
  
  return ( 
    <div className="flex justify-evenly">
      {data.map((option, i) => (
        <div key={i} >
          <button onClick={() => handleChange(option)} className={selectedOptions.includes(option) ? 'bg-green-500': ''}>
            
            <p>{option.name || option.count}</p>
            {
              option.image && (
                <img className='h-24 w-auto' src={option.image} alt="" />
              )
            }
            {
              option.people && (
                <p>{option.people}</p>
              )
            }
            <p>${option.price}</p>

          </button>
        </div>
      ))}
    </div>
   );
}
 
export default ButtonModal;