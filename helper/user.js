import API from '../Util/api';

const user = {
  //   register: data =>
  //     new Promise(function (resolve, reject) {
  //       API.post('/user/register', data)
  //         .then(async res => {
  //           if (res.status === 200) {
  //             resolve(res.data);
  //           } else {
  //             reject(res);
  //           }
  //         })
  //         .catch(err => {
  //           reject(err);
  //         });
  //     }),
  login: (username, password) =>
    new Promise(function (resolve, reject) {
      API.post('user/login', {
        username: username,
        password: password,
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

export default user;
