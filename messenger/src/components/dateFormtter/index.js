
const dateFormatter = (Date) => {
    const days = {
        [0]:'Friday',
        [1]:'Saturday',
        [2]:'Sunday',
        [3]:'Monday',
        [4]:'Tuesday',
        [5]:'Wednesday',
        [6]:'Thursday',
    }

    const fStartDate = days[Date.getDay()] +" "+ Date.getDate() + "/" + Date.getMonth() + "/" + Date.getFullYear()     

    return fStartDate;
}

export default dateFormatter
