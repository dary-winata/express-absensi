const checkSameDay = (lastCheck) => {
    const lastCheckDate = new Date(lastCheck)
    const lastCheckValue = separateDate(lastCheckDate)
    const today = new Date();
    const todayValue = separateDate(today)
    
    if(lastCheckValue.day != todayValue.day && 
        lastCheckValue.month != todayValue.month &&
        lastCheckValue.year != todayValue.year)
        return true
    
    return false
}

const separateDate = (date) => {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    return { day: dd, month: mm, year: yyyy }
}

module.exports = {
    checkSameDay,
    separateDate
}