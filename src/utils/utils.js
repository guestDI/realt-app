import moment from 'moment';

export default formatDate = (initDate) => {
    let a = moment(initDate);
    moment.locale('ru');
    // console.log(a.format('dddd, MMMM DD YYYY, h:mm:ss'));
    return a.format('DD-MM-YYYY, HH:mm:ss');
}
