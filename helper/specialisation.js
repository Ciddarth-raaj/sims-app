import API from '../Util/api';

const specialisation = {
  get: () =>
    new Promise(function (resolve, reject) {
      API.get('specialisation')
        .then(async res => {
          if (res.status === 200) {
            resolve(specialisation.format(res.data.data));
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
        specialisation_id: d.specialisation_id,
        label: d.label,
        subtext: d.subtext,
        image: d.image || require('../assets/medical-doctor-specialist.png'),
        is_active: d.is_active,
      });
    }

    return formatted;
  },
};

export default specialisation;
