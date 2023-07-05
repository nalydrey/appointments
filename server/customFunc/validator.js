
export const validator = (id, timeDuration, fullName, born) => {
    console.log(fullName);
    let firstName = ''
    let lastName = ''
    let next = ''
    let date = []
    if(fullName){
        const enteredName = fullName.split(' ')
        firstName = enteredName[0] 
        lastName = enteredName[1] || ''
        next = enteredName[2]
    }
    if(born){
        date =  born.split('.')
    }

    console.log('date', date);
    
    const times = timeDuration.split('-').map(number => +number)

    const obj = {
        isError: false,
        times,
        errorText: '',
        firstName,
        lastName
    }


    const isTrueTime = times.length === 2 && !times.some(time => isNaN(time)) && times[0] < times[1] && times[0] >= 0 && times[1] <=24
    const isTrueName = !next && fullName.split('').every(symbol => {
        const unicode = symbol.charCodeAt(0)
        return unicode === 32 || (unicode >= 65 && unicode <=90) || (unicode >= 97 && unicode <= 122) 
    })
    const isTrueDate = !!born ? date.length === 3 && !date.some(time => isNaN(time)) && +date[0]<=31 && +date[0] > 0 && +date[1] <=12 && +date[1] > 0 +date[2] <= 2023 && +date[2]>= 1000 : true 
    console.log("isTrueDate", isTrueDate);
    

    if(!id && !timeDuration && !fullName && !born){
        console.log('!!');
        return {...obj, isError: true}
    }
    if(id && !isNaN(id) && isTrueTime && isTrueName && isTrueDate ){
        console.log('!!!');
        return {...obj}
    }
    else {
      return {...obj, isError: true, errorText: `${id}, ${timeDuration}, ${fullName}, ${born}`}  
    }
}