import React, {useState} from 'react';

function FormInput(props: any) {
    const [focused, setFocused] = useState(false);
    const {label, requiredLabel, errorMessage, onChange, column, id, ...inputProps} = props;
    const handleFocus = (e: any) => {
        setFocused(true);
    };
    return (
        <div className={"col-md-" + column + " mb-1"}>
            <fieldset>
                <div style={{display: "flex",justifyContent: "flex-start"}}>
                    <label htmlFor={id}>{label}{inputProps.required?<span style={{color: "red",marginLeft: "5px"}}>*</span>:''} </label>
                </div>
                <input className="checkBox   checked" type="checkbox" onChange={onChange} onFocus={handleFocus}/>
            </fieldset>
        </div>
    );
}

export default FormInput;
