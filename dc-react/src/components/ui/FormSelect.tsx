import React, {useEffect, useState} from 'react';
import http from "../../config/httpConfig";

function FormSelect(props: any) {
    let [focused, setFocused] = useState(false);
    let [isLoaded, setIsLoaded] = useState(false);
    let { label, errorMessage, onChange,column, id,ajax,mapping,values,disableFirstOption, ...inputProps } = props;
    let [options, setOptions] = useState([]);
    const handleFocus = (e:any) => {
        setFocused(true);
    };

    const initOptions =()=>{
        if (ajax){
            http.get(mapping.path).then(response => {
                let data:any = [];
                if (!disableFirstOption){
                    data.push({value:'',text:`Select ${label}` });
                }
                response.data.forEach((record:any)=> {
                    data.push({value:record[mapping.value],text:record[mapping.text]})
                });
                setOptions(data);
            }).catch(reason => {
                console.log(reason);
            })
        }else {
            setOptions(values);
        }
        setIsLoaded(true);
    }

    useEffect(() => {
        if (isLoaded == false){
            initOptions();
        }
    },[])

    return (
        <div className={"mb-1 col-md-"+column}>
            <div style={{display: "flex",justifyContent: "flex-start"}}>
                <label htmlFor={id}>{label}{inputProps.required?<span style={{color: "red",marginLeft: "5px"}}>*</span>:''} </label>
            </div>
            <select {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused}>
                {options?.map((option:{text:any,value:any}) => (
                    <option value={option.value} selected={inputProps.defaultValue?(inputProps.defaultValue == option.value?true:false):false}>{option.text}</option>
                ))}
            </select>
            <div className="invalid-feedback">{inputProps.errorMessage}</div>
        </div>
    );
}

export default FormSelect;
