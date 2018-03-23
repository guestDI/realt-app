import moment from "moment";

export default (formatDate = initDate => {
  let a = moment(initDate);
  moment.locale("ru");
  // console.log(a.format('dddd, MMMM DD YYYY, h:mm:ss'));
  return a.fromNow();
  // return a.format("DD-MM-YYYY HH:mm");
});

export const formatLocation = loc => {
    let obj = {}
    if(loc) {
         obj = Object.assign({}, loc)
        let coordinates = obj.coordinates.slice();
        if (coordinates && coordinates.length > 0) {
            coordinates.push(coordinates[0])
            obj.coordinates = coordinates;
        }
        return obj.coordinates.map(point => point.longitude + ' ' + point.latitude).join(',');
    }
}

export const formatRooms = rooms => {
    // let obj = Object.assign({}, loc)
    // let coordinates = obj.coordinates.slice();
    // if (coordinates && coordinates.length > 0) {
    //     coordinates.push(coordinates[0])
    //     obj.coordinates = coordinates;
    // }
    // return encodeURIComponent(obj.coordinates.map(point => point.longitude + ' ' + point.latitude).join(','));
}