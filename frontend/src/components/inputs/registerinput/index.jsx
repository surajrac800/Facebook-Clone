import { useField } from "formik"
import "./style.css"
export default function RegisterInput({placeholder, ...props}) {
    const [field] = useField(props)
    return (
    <div className="input_wrap">
        
        <input 
        type={field.type} 
        name={field.name}
        placeholder={placeholder} 
        {...field} 
        {...props} />
    </div>

)
}
