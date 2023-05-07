import React from 'react';
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";
import FormCheckbox from "./FormCheckbox";

function FormField(props: any) {
    if(props.type.toLowerCase() =='select'){
        return (<FormSelect {...props}/>);
    }else if(props.type.toLowerCase() =='textarea'){
        return (<FormTextArea {...props} />);
    }else if(props.type.toLowerCase() =='checkbox'){
        return (<FormCheckbox {...props} />);
    }else{
        return (<FormInput {...props}/>);
    }
}
export default FormField;
