import moment from 'moment';
import API from '../Util/api';

const appointment = {
  create: data =>
    new Promise(function (resolve, reject) {
      API.post('appointment', data, {
        headers: {
          'x-access-token': global.config.accessToken,
        },
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
  update: data =>
    new Promise(function (resolve, reject) {
      API.patch('appointment', data, {
        headers: {
          'x-access-token': global.config.accessToken,
        },
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
  get: () =>
    new Promise(function (resolve, reject) {
      API.get('appointment', {
        headers: {
          'x-access-token': global.config.accessToken,
        },
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(appointment.format(res.data));
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    }),
  format: data => {
    const formatted = [];

    for (const d of data) {
      formatted.push({
        appointment_id: d.appointment_id,
        doctor_id: d.doctor_id,
        doctor_name: d.doctor_name,
        image: d.image,
        status: d.status,
        status_id: d.status_id,
        timeslot: moment(d.timeslot).format('hh:mm A - ddd - DD,MMM'),
        // created_at: moment(),
      });
    }

    return formatted;
  },
  // getFilterUrl: filter => {
  //   if (filter == undefined) {
  //     return '';
  //   }

  //   let filterUrl = '';

  //   if (
  //     filter.specialisations !== undefined &&
  //     filter.specialisations.length > 0
  //   ) {
  //     filter.specialisations.forEach(
  //       (b, i) => (filterUrl += '&specialisations[' + i + ']=' + b),
  //     );
  //   }

  //   return filterUrl;
  // },
};

export default appointment;
