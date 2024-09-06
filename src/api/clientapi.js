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
// export default axios.create({
//   baseURL:
//     // 'bsjabj'
//     // 'https://sp.hamdard.edu.pk/api',
//     'http://sp.hamdard.edu.pk/api',
//   // 'http://172.23.12.98:8000/api',
//   // 'http://192.168.137.193:8085/api/v1/',

//   headers: {
//     'Content-type': 'application/json',
//     Accept: 'application/json',
//   },
// });

const clientapi = axios.create({
  baseURL:
    // remote local
    // 'http://172.23.12.71:80/api',
    // 'http://192.168.137.16:8000/api',
    // 'http://127.0.0.1:8000/api',
    // 'http://sp.hamdard.edu.pk/api',
    'http://192.168.137.16:8000/api',
  // 'https://snologies.com/sp_backend_lara/public/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default clientapi;
