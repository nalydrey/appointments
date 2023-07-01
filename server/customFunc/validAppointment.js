export const validAppointment = (idOne, idTwo, time) => {
    const obj = {
        isError: false,
        errorText: ''
    }
    if(!idOne && !idTwo && !time){
       console.log('data is abcent'); 
       return {...obj, isError: true}
    }

    if(!(idOne && idTwo)){
       console.log('must be two users'); 
       return {...obj, isError: true, errorText: 'must be two id'}
    }

    if(time && !(time && Number.isInteger(+time) && +time >=0 && +time <= 24)){
        console.log('time is not valid');
        return {...obj,
            errorText: `${idOne}, ${idTwo}, ${time}`,
            isError: true
        }
    }

    return obj
}