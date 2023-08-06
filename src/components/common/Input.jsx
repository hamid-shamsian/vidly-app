//
const Input = ({ name, label, error, ...rest }) => {
   return (
      <div className='form-group'>
         {label && <label htmlFor={name}>{label}</label>}
         <input className='form-control' id={name} name={name} {...rest} />
         {error && <div className='alert alert-danger mt-1'>{error}</div>}
      </div>
   );
};

export default Input;
