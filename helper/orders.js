import API from '../Util/api';

const orders = {
  createRazorpay: data =>
    new Promise(function (resolve, reject) {
      API.post('orders/razorpay', data)
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
  create: data =>
    new Promise(function (resolve, reject) {
      API.post('orders', data)
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

export default orders;
