export const CompareDates = (date1, date2) =>{
    const d = date1.getDate() === date2.getDate();
    const m = date1.getMonth() === date2.getMonth();
    const y = date1.getFullYear() === date2.getFullYear();
    return (d && m && y)
}