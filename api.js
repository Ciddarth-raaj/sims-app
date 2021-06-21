import constants from './constants/api';
import axios from 'axios';

export default axios.create({
  baseURL: constants.BASE_URL,
  transformResponse: [
    (res) => {
      try {
        const response = JSON.parse(res);

        return response;
      } catch (err) {
        console.log(err);
        throw Error(__DEV__ ? res : 'An Error Occurred !');
      }
    },
  ],
});
