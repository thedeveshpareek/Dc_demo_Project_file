import React, {useState} from 'react';
import moment from "moment";

function FormInput(props: any) {
    const [focused, setFocused] = useState(false);
    const { label, requiredLabel, errorMessage, onChange,column, id,defaultValue, ...inputProps } = props;
    const handleFocus = (e:any) => {
        setFocused(true);
    };
    return (
        <div className={"mb-1 col-md-"+column}>
            <div style={{display: "flex",justifyContent: "flex-start"}}>
                <label htmlFor={id}>{label}{inputProps.required?<span style={{color: "red",marginLeft: "5px"}}>*</span>:''} </label>
            </div>
            <input {...inputProps}
                   onChange={onChange}
                   onBlur={handleFocus}
                   onFocus={() => setFocused(true)}
                   focused={focused.toString()} defaultValue={inputProps.type=='date'?moment(new Date(defaultValue)).format('YYYY-MM-DD'):defaultValue}/>
            <div className="invalid-feedback">{errorMessage}</div>
        </div>
    );
}

export default FormInput;
