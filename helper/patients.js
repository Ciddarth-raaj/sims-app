import API from '../Util/api';

const patients = {
  getDetails: () =>
    new Promise(function (resolve, reject) {
      API.get('patients/details', {
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
};

export default patients;
