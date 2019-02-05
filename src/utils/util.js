export function getFormattedDate(pubData) {
    const dateObj = new Date(pubData);
    var month = new Array(12); month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var datePublished = dateObj.getUTCDate() + ' ' + month[dateObj.getUTCMonth()] + ', ' + dateObj.getUTCFullYear();
    return datePublished;
}
