import React, {useState} from 'react';

function FormTextArea(props: any) {
    const [focused, setFocused] = useState(false);
    const { label, requiredLabel, errorMessage, onChange,column, id,rows, ...inputProps } = props;
    const handleFocus = (e:any) => {
        setFocused(true);
    };
    return (
        <div className={"col-md-"+column+" mb-1"}>
            <div style={{display: "flex",justifyContent: "flex-start"}}>
                <label htmlFor={id}>{label}{inputProps.required?<span style={{color: "red",marginLeft: "5px"}}>*</span>:''} </label>
            </div>
            <textarea {...inputProps} rows={rows}
                   onChange={onChange}
                   onBlur={handleFocus}
                   onFocus={handleFocus}
                   focused={focused.toString()}>{inputProps.initValue}</textarea>
            <div className="invalid-feedback">{errorMessage}</div>
        </div>
    );
}

export default FormTextArea;
