import "../../index.css"

const FormInput = ({ id, placeholder, type = "text", ariaLabel }) => (
	<input
	  id={id}
	  type={type}
	  className="border-black border-2 p-1 rounded-0 shadow-brutalism-sm"
	  placeholder={placeholder}
	  aria-label={ariaLabel}
	/>
  );

  export default FormInput;