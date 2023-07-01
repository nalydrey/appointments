
export const validator = (id, timeDuration, fullName, born) => {
    
    let firstName = ''
    let lastName = ''
    let next = ''
    let date = []
    if(fullName){
        [firstName, lastName, next] = fullName.split(' ')
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
    const isTrueName = !next 
    const isTrueDate = born ? date.length === 3 && !date.some(time => isNaN(time)) && +date[0]<=31 && +date[0] > 0 && +date[1] <=12 && +date[1] > 0 +date[2] <= 2023 && +date[2]>= 1900 : true 
    
    

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