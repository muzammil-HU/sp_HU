// import axios from 'axios';
// const apiInstance = axios.create({
//   baseURL: 'https://sp.hamdard.edu.pk/api',
// });

// // Set default headers
// // apiInstance.defaults.headers.common[
// //   'Authorization'
// // ] = `Bearer ${localStorage.getItem('token')}`;
// apiInstance.defaults.headers.post['Content-Type'] = 'application/json';

// export default apiInstance;

import axios from 'axios';
export default axios.create({
  baseURL:
    // 'http://sp.hamdard.edu.pk/api',
    'http://172.23.12.98:8000/api',
  // 'http://192.168.137.193:8085/api/v1/',

  headers: {
    'Content-type': 'application/json',
  },
});
