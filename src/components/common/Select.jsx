//
const Select = ({ name, label, options, error, ...rest }) => {
   return (
      <div className='form-group'>
         {label && <label htmlFor={name}>{label}</label>}
         <select className='form-control mb-3' id={name} name={name} {...rest}>
            <option defaultValue value=''>
               Select a/an {label || "Option"}
            </option>
            {options.map(option => (
               <option key={option._id} value={option._id}>
                  {option.name}
               </option>
            ))}
         </select>
         {error && <div className='alert alert-danger mt-1'>{error}</div>}
      </div>
   );
};

export default Select;
