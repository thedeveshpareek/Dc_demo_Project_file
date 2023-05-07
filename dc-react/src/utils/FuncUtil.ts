import moment from "moment";

const validate = (e: any) => {
    if (e.target.pattern) {
        if (e.target.value === '' || e.target.value === undefined) {
            e.target.classList.remove("is-invalid");
            e.target.classList.remove("is-valid");
        } else {
            let isMatched = e.target.value.match(e.target.pattern);
            if (isMatched) {
                e.target.classList.remove("is-invalid");
                e.target.classList.add("is-valid");
            } else {
                e.target.classList.remove("is-valid");
                e.target.classList.add("is-invalid");
                e.target.focus();
            }
        }
    }else{
        if (e.target.required){
            if (e.target.value === '' || e.target.value === undefined) {
                e.target.classList.remove("is-valid");
                e.target.classList.add("is-invalid");
                e.target.focus();
            }
        }
    }
}
const toCurrency = (value: number,currency:string) => {
    let amount = value;
    if (value == null){
        amount = 0
    }
   return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: currency,
    });
}
const getValue = (e:any) => {
    let name = e.target.nodeName;
    let value;
    if (name === 'INPUT'){
        let type = e.target.type.toUpperCase();
        if (type==='CHECKBOX'){
            value = e.target.checked;
        }else if (type==='RADIO'){
            value = e.target.checked;
        }else {
            value = e.target.value;
        }
    }else if(name === 'SELECT'){
        value = e.target.value;
    }
   return value;
}

const base64 = (file:any) => {
    // Make new FileReader
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let fileInfo = {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1024) + ' kB',
                base64: reader.result,
                file: file,
            };
            resolve(fileInfo)
        };
        reader.onerror = error => reject(error);
    });
}

const toDate = (date:any) => {
    return moment(new Date(date)).format('YYYY-MM-DD');
}
const toDateTime = (date:any) => {
    return moment(new Date(date)).format('YYYY-MM-DD hh:mm a');
}
const age = (birthDay:any) => {
    let date = birthDay;
    let diff = moment(moment()).diff(date, 'milliseconds');
    let duration = moment.duration(diff);
    return duration.get("years");
};

const FuncUtil = {
    validate,
    toCurrency,
    getValue,
    base64,
    toDate,
    toDateTime,
    age,
}
export default FuncUtil;
